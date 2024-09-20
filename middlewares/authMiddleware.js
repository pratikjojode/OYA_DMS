const JWT = require("jsonwebtoken");

module.exports = async (req, res, next) => {
  try {
    // Check if the Authorization header exists
    const authHeader = req.headers["authorization"];
    if (!authHeader) {
      return res.status(401).send({
        message: "Authorization header missing",
        success: false,
      });
    }

    // Check if the token is present
    const token = authHeader.split(" ")[1];
    if (!token) {
      return res.status(401).send({
        message: "Token missing",
        success: false,
      });
    }

    // Verify the token
    JWT.verify(token, process.env.JWT_SECRET, (err, decode) => {
      if (err) {
        return res.status(401).send({
          message: "Authentication failed",
          success: false,
        });
      } else {
        req.body.userId = decode.id; // Assuming the token contains an 'id' field
        next();
      }
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Something went wrong",
      success: false,
    });
  }
};
