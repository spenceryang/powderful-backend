const { auth } = require("express-oauth2-jwt-bearer");

const jwtCheck = auth({
  audience: "https://api.powderful.xyz",
  issuerBaseURL: "https://dev-2jf01eugzd36x5ye.us.auth0.com/",
  tokenSigningAlg: "RS256",
});

module.exports = jwtCheck;
