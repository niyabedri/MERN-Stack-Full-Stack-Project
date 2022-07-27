const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const passport = require("passport");

//Load profile model
const Profile = require("../../models/Profile");

// Load user
const User = require("../../models/User");

// @router  GET api/users/test
// @desc    Tests profile route
// @access  Public
router.get("/test", (req, res) => res.json({ msg: "Profiles works" }));

// @router  GET api/profile
// @desc    Get current users profile
// @access  Private
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    console.log("REQ",req.user)
    const errors = {};
    Profile.findOne({ user: req.user.id })
      .then((profile) => {
        if (!profile) {
          errors.noprofile = "There is no profile for this user";
          return res.status(404).json(errors);
        }

        res.json(profile);
      })
      .catch((err) => res.status(404).json(err));
  }
);

// @router  POST api/profile
// @desc    Create users profile
// @access  Private
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
   //Get fields
   const profileFields = {};
   profileFields.user = req.user
  }
);

module.exports = router;
