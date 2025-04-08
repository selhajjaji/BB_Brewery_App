const oracledb = require("oracledb");
require("dotenv").config();

const dbConfig = {
  user: 'COMP214_W25_ERS_1',
  password: 'password',
  connectString: '199.212.26.208/orcl', // Example: "localhost/XEPDB1"
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
