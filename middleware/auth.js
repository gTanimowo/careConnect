require("dotenv").config();
const User = require("../models/userModel");
const passport = require("passport");
const jwt = require("jsonwebtoken");

const JwtStrategy = require("passport-jwt").Strategy,
  ExtractJwt = require("passport-jwt").ExtractJwt;

const jwtExpire = "1d";
const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.JWT_JWTSECRET;

function passportConfig(passport) {
  passport.use(
    new JwtStrategy(opts, async (jwt_payload, done) => {
      try {
        const user = await User.getUsersbyId(jwt_payload.id);

        if (user) {
          return done(null, user);
        } else {
          return done(null, false);
        }
      } catch (err) {
        return done(err, false);
      }
    })
  );
}

function authenticateJWT() {
  return passport.authenticate("jwt", { session: false });
}

// Role-based middleware
function authorizeRoles(...roles) {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: "Forbidden: Admin rights only" });
    }
    next();
  };
}

module.exports = { passportConfig, authenticateJWT, authorizeRoles, jwtExpire };
