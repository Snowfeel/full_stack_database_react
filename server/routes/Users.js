const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const { Users } = require("../models");
const { validateToken } = require("../middlewares/AuthMiddleware");

const { sign } = require("jsonwebtoken");

router.post("/", async (req, res) => {
  const { username, password } = req.body;
  bcrypt.hash(password, 10).then((hash) => {
    Users.create({
      username: username,
      password: hash,
    });
    res.json("Success!");
  });
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await Users.findOne({ where: { username: username } });
  console.log(user);
  if (!user) {
    return res.json({ error: "Invalid username or password" });
  }
  bcrypt.compare(password, user.password).then((match) => {
    if (!match) {
      return res.json({ error: "Invalid username or password" });
    }

    const accessToken = sign(
      { username: user.username, id: user.id },
      "importantsecret"
    );
    return res.json(accessToken);
  });
});

router.get("/auth", validateToken, async (req, res) => {
  res.json(req.user);
});

module.exports = router;
