const createError = require("../utils/error");
const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  // usem header only during production (cookies exposes jwt hence vunurable to(XSS) attacks)
  // use of access token(short expiration & stored in HttpOnly cookie) && refresh token (longer exp & stored on more persistent storage such as local storage)
  // const token = req.cookies.access_token;
  const token = req.cookies.access_token || req.headers.access_token;

  if (!token) {
    throw next(createError(401, "You are not Authenticated!"));
  }
  // jwt key is one level protection for XSS attacks
  jwt.verify(token, process.env.JWT, (err, user) => {
    if (err) throw next(createError(403, "Invalid Token"));
    req.user = user;
    next();
  });
};

const verifyUser = (req, res, next) => {
  verifyToken(req, res, next, () => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
      next();
    } else {
      throw next(createError(403, "You are not authorized"));
    }
  });
};
const verifyAdmin = (req, res, next) => {
  verifyToken(req, res, next, () => {
    if (req.user.isAdmin) {
      next();
    } else {
      throw next(createError(403, "You are not authorized"));
    }
  });
};

module.exports = { verifyToken, verifyUser, verifyAdmin };
