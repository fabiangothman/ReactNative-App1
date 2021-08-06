export const legalConfig = {
    auxTransp_value: 106454,
    minSalary_value: 908526,
    uvt: 36308,
};


//Production
export const endPointsConfig = {
    WF_nomina_endpoint: "https://us-central1-planeo-workforce.cloudfunctions.net/LastUserNomina",
    WF_certificatepdf_endpoint: "https://us-central1-planeo-workforce.cloudfunctions.net/CreateCertificatePDF",
};


//Develop
/*export const endPointsConfig = {
    WF_nomina_endpoint: "https://us-central1-planeo-workforce-dev.cloudfunctions.net/LastUserNomina",
    WF_certificatepdf_endpoint: "https://us-central1-planeo-workforce-dev.cloudfunctions.net/CreateCertificatePDF",
};*/


//Local
/*export const endPointsConfig = {
    WF_nomina_endpoint: "http://192.168.1.109:5001/planeo-workforce-dev/us-central1/LastUserNomina",
    WF_certificatepdf_endpoint: "http://192.168.1.109:5001/planeo-workforce-dev/us-central1/CreateCertificatePDF",
};*/