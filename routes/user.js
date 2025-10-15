const { Router } = require("express");
const User = require("../models/user");

const router = Router();

// Render Sign In Page
router.get("/signin", (req, res) => res.render("signin"));

// Render Sign Up Page
router.get("/signup", (req, res) => res.render("signup"));

// Handle Sign Up
router.post("/signup", async (req, res) => {
  try {
    const { fullName, email, password } = req.body;

    await User.create({ fullName, email, password });

    return res.redirect("/user/signin");
  } catch (error) {
    return res.status(400).send(error.message);
  }
});

// Handle Sign In - JWT
router.post("/signin", async (req, res) => {
  try {
    const { email, password } = req.body;

    // matchPassword now returns JWT
    const token = await User.matchPassword(email, password);

    // return token to client
    return res.json({ token });
  } catch (error) {
    return res.status(400).send(error.message);
  }
});

module.exports = router;
