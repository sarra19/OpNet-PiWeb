const express = require("express");
const Router = express.Router();
const passport = require("passport");
Router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

Router.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    failureRedirect: "http://localhost:3000/authentication/sign-in",
  }),
  function (req, res) {
    // Successful authentication, redirect home.
    console.log(req);
    const userRole = req.user.userRole; // Supposons que le rôle de l'utilisateur est stocké dans req.user.userRole
    res.redirect(
      `http://localhost:3000/dashboard/${userRole}`
            // `http://localhost:3000?email=${req.user.email}&firstname=${req.user.firstname}&secret=${req.user.secret}`

    );
  }
);

module.exports = Router;