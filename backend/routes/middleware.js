require('dotenv').config();
const jwt = require("jsonwebtoken");


const authMiddleware = (req, res, next) => {  // Make sure to pass 'next' here
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer")) {
    return res.status(403).json({
      message: "Authorization header missing or invalid"
    });
  }

  const token = authHeader.split(" ")[1];

  try {
    const verify = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = verify.userId;

    // Log when authentication is successful
    console.log("Authentication successful, userId: ", req.userId);

    next(); // Proceed to the next middleware/route handler
  } catch (err) {
    console.log("Token verification failed: ", err.message);
    return res.status(403).json({
      message: "Invalid or expired token"
    });
  }
};

module.exports = { authMiddleware };
