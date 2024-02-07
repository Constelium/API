const express = require("express");
const router = express.Router();
const mailController = require("../controllers/mailController");

// CREATE: Ajouter un nouvel utilisateur
router.post("/register", async (req, res) => {
  const newMail = new Mail(req.body);
  try {
    await newMail.save();
    res.status(201).send(newMail);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.post("/register", mailController.register);

module.exports = router;
