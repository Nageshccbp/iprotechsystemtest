const seqal = require("./seqal")
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt"); 

export default authenticateToken = (request, response, next) => {
    let jwtToken;
    const authHeader = request.headers["authorization"];
    if (authHeader !== undefined) {
      jwtToken = authHeader.split(" ")[1];
    }
    if (jwtToken === undefined) {
      response.status(401);
      response.send("Invalid JWT Token");
    } else {
      jwt.verify(jwtToken, "my_secret", async (error, payload) => {
        if (error) {
          response.send("Invalid JWT Token");
          response.status(401);
        } else {
          next();
        }
      });
    }
  };
  
  //api 1 validating user credentials and logging in using token
  app.post("/login/", async (request, response) => {
    const { username, password } = request.body;
    const selectUserQuery = `SELECT * FROM user WHERE username='${username}';`;
    const seqal = await db.get(selectUserQuery);
    if (dbUser === undefined) {
      response.status(400);
      response.send("Invalid user");
    } else {
      const isPasswordMatched = await bcrypt.compare(password, dbUser.password);
      if (isPasswordMatched === true) {
        const payload = { username: username };
        const jwtToken = jwt.sign(payload, "my_secret");
        response.send({ jwtToken });
      } else {
        response.status(400);
        response.send("Invalid password");
      }
    }
  });