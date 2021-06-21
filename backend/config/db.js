const mysql = require('mysql2/promise');

let pool = null;

exports.createPool = async function () {
    pool = mysql.createPool({
        multipleStatements: true,
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
        port: process.env.DB_PORT
    });
};

exports.getPool = function () {
    return pool;
};

exports.transaction = async function (pool, callback) {
    
    const connection = await pool.getConnection();
    await connection.beginTransaction();

    try {
        
        await callback(connection);
        await connection.commit();

    } catch (err) {

        await connection.rollback();

        throw err;
    } finally {

        connection.release();

    }

};