import mssql from 'mssql'

const connectionSettings = {
    server: "Oscar\SQLEXPRESS",
    database: "Examen1",
    //si no me sirve quito usuario y contra porque la base de datos esta utenticada por windows
    options: {
        trustedConnection: true,
        encrypt: false,
        trustServerCertificate: true,
        enableArithAbort: true
    }
};

export async function getConnection() {
    try {
        return await mssql.connect(connectionSettings);
    }
    catch (error) {
        console.error("error al conectarse a la base de datos", error);
    }
}

export { mssql };