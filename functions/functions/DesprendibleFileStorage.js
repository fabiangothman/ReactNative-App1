//Libraries
const functions = require('firebase-functions');
const admin = require('firebase-admin');
const uuid = require('uuid');
const formidable = require('formidable-serverless');
//Initializations
const cors = require('cors')({origin: true});
const token = uuid.v4();

if (!admin.apps.length)
    admin.initializeApp();

exports.DesprendibleFileStorage = functions.https.onRequest(async (request, response) => {

    cors(request, response, async () => {
        if (request.method !== 'POST')
            return response.status(405).end();

        const form = new formidable.IncomingForm();
 
        form.parse(request, async (err, fields, files) => {
            if(Object.entries(files).length > 0){
                let fileUploaded = false;
                await admin.storage().bucket().upload(files.file.path, {
                    destination: fields.userDocument+'/payrolles/nomina_'+fields.year+"_"+fields.month+'_'+Date.now()+'.pdf',
                    metadata: {
                        metadata: {
                            firebaseStorageDownloadTokens: token,
                        }
                    },
                }).then((data) => {
                    //console.log(data[0].metadata);
                    fileUploaded = true;
                }).catch(error => {
                    console.log(error);
                });

                if(fileUploaded){
                    await admin.firestore().collection('users').doc(fields.userDocument).update({
                        filePayrollesAvailable: admin.firestore.FieldValue.increment(1)
                    }).then(() => {
                        response.status(200).send({resp: true, error: null});
                    }).catch((e) => {
                        console.log(e);
                        response.status(200).send({resp: false, error: "No se pudo actualizar los desprendibles disponibles en la base de datos de Planeo App. Posiblemente el empleado no tiene cuenta en PlaneoApp"});
                    });
                }else{
                    response.status(200).send({resp: false, error: "No se pudo cargar el archivo."});
                }
            }else{
                response.status(200).send({resp: false, error: "Se necesita al menos un archivo a ser cargado"});
            }
        });
        //response.status(200).send({resp: true, error: null});
    });
});