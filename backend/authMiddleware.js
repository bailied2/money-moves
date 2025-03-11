const jwt = require("jsonwebtoken");

const JWT_SECRET =
  process.env.JWT_SECRET || // Should be kept to just environment variable in production
  "b165f503224f0b78f682934b5ea8d20c6520b14474c616b3c4392ea6318f91ddf45f019605906819c8484c2f14624fe532db88afd331d1840ca25a52c7f1303c";

// Middleware to verify token and extract user ID
const authenticateToken = (req, res, next) => {
  console.log("authenticateToken");
  console.log("Received Cookies:", req.cookies); // Add this log
  const token = req.cookies?.token;

  if (!token) {
    return res.status(401).json({ error: "Unauthorized: No token provided" });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded; // Attach user info to request object
    next(); // Continue to the next route
  } catch (error) {
    res.status(403).json({ error: "Token is invalid or expired" });
  }
};

module.exports = authenticateToken;
