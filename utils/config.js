const throwError = require('./error');

const connectionString = process.env.CONNECTION_STRING ?? throwError("Connection String not defined");
const port = process.env.PORT ?? throwError("Port not defined");
const jwtSecret = process.env.JWTSECRET ?? throwError("Secret not defined");
module.exports = { connectionString, port, jwtSecret };