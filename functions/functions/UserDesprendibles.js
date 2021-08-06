//Libraries
const functions = require("firebase-functions");
const admin = require('firebase-admin');
const cors = require('cors')({origin: true});

if (!admin.apps.length)
    admin.initializeApp();

exports.UserDesprendibles = functions.https.onRequest(async (request, response) => {

    cors(request, response, async () => {
        const bodyJson = JSON.parse(request.body);
        if(bodyJson.userDocument){
            await admin.storage().bucket().getFiles({ directory: bodyJson.userDocument+'/payrolles/' }).then((data) => {
                const files = data[0];
                const resp = [];
                files.forEach(item => {
                    const fullName = (item.metadata.name).split('/').pop();
                    resp.push({
                        fullName: fullName,
                        year: fullName.split('_', 2).pop(),
                        month: fullName.split('_', 3).pop(),
                        name: fullName.split('.').shift(),
                        extension: fullName.split('.').pop(),
                        path: item.metadata.name
                    });
                });

                response.status(200).send({resp: JSON.stringify(resp), error: null});
            }).catch((e) => {
                console.log(e);
                alert(e);
            });

        }else{
            response.send({resp: false, error: "Need user document"});
        }
    });
});