import { getConnection, mssql } from "./database/connectionSQLServer.js"

const getReciclaje = async () => {
    try {
        const pool = await getConnection();
        const result = await pool
            .request()
            .input("usuario", mssql.VarChar, "Alex")
            .input("material", mssql.VarChar, "Carton")
            .input("cantidad", mssql.Float, "3.5")
            .query("INSERT INTO reciclaje (usuario, material, Cantidad)"
                + "VALUES (@usuario, @Material, @cantidad)");
    } catch (error) {
        console.error("error al conectarse a la base de datos", error);
    }
}

getReciclaje();
addProduct();