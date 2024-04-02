const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const { Users, Posts } = require("../models");
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
    return res.json({
      token: accessToken,
      username: user.username,
      id: user.id,
    });
  });
});

router.get("/auth", validateToken, async (req, res) => {
  res.json(req.user);
});

router.get("/basicinfo/:id", async (req, res) => {
  const id = req.params.id;
  const userInfo = await Users.findByPk(id, {
    attributes: { exclude: ["password"] },
  });
  res.json(userInfo);
});

module.exports = router;
