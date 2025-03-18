const oracledb = require("oracledb");
require("dotenv").config();

const dbConfig = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  connectString: process.env.DB_CONNECTION_STRING, // Example: "localhost/XEPDB1"
};

async function executeQuery(query, binds = [], autoCommit = true) {
  let connection;
  try {
    connection = await oracledb.getConnection(dbConfig);
    const result = await connection.execute(query, binds, { autoCommit });
    return result;
  } catch (err) {
    console.error("Database Error: ", err);
    throw err;
  } finally {
    if (connection) {
      await connection.close();
    }
  }
}

module.exports = { executeQuery };
