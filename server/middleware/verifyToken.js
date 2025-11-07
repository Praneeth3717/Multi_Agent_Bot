import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token)
      return res
        .status(201)
        .json({ error: "Access denied. No token provided." });

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decodedToken;
    next();
  } catch (error) {
    console.error("Token verification error:", err);
    res.status(403).json({ error: "Invalid or expired token." });
  }
};
