const functions = require("firebase-functions");
const cors = require("cors")({ origin: true });
const brevo = require("@getbrevo/brevo");

exports.sendEmail = functions.https.onRequest((req, res) => {
  cors(req, res, async () => {
    try {
      const { name, email, message } = req.body;

      // Configuration de Brevo
      const client = brevo.ApiClient.instance;
      const apiKey = client.authentications["api-key"];
      apiKey.apiKey = "xkeysib-060e3ceaa3af8ceace1cfc8c877c56f7cbf960cf7e2e4f972300f0b9239c3829-5vNdZkAZlvYt9wG"; // 🔒 ta clé Brevo

      const emailApi = new brevo.TransactionalEmailsApi();

      const sendSmtpEmail = {
        sender: { name: "AEBC Website", email: "noreply@aebc-web.app" },
        to: [{ email: "aebcofficiel@gmail.com" }],
        subject: `Nouveau message de ${name}`,
        htmlContent: `
          <h3>Message depuis le site AEBC</h3>
          <p><strong>Nom :</strong> ${name}</p>
          <p><strong>Email :</strong> ${email}</p>
          <p><strong>Message :</strong><br>${message}</p>
        `,
      };

      await emailApi.sendTransacEmail(sendSmtpEmail);
      res.status(200).send({ success: true, message: "Email envoyé avec succès !" });
    } catch (error) {
      console.error("Erreur d’envoi :", error);
      res.status(500).send({ success: false, message: "Erreur d’envoi d’email." });
    }
  });
});
