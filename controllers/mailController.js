const Mail = require("../models/Mail");

exports.register = async (req, res) => {
  const { mail } = req.body;

  try {
    const newMail = new Mail({
      mail: mail,
    });

    await newMail.save();
    res.status(201).json({ message: "Email enregistré avec succès" });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Erreur lors de l'enregistrement de l'email" });
  }
};
