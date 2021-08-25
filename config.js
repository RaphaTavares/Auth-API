const throwError = require('./utils/error');

const connectionString = process.env.CONNECTION_STRING ?? throwError("Connection String not defined");
const port = process.env.PORT ?? throwError("Port not defined");
module.exports = { connectionString, port };