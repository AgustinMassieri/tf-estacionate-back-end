const { sendEmail } = require("../utils/handleEmail");
const { usersModel } = require("../models");
const { updateUser } = require("../controllers/auth");
const { handleHttpError } = require("../utils/handleErrors");

const sendResetPasswordEmail = async (req, res) => {
  const email = req.body.email;
  const token = req.body.token;
  const userName = req.body.userName;
  const userId = req.body.userId;
  const url = req.body.url;

  try {
    const reqUpdateUser = {
      params: {
        id: userId,
      },
      body: {
        secretToken: token,
      },
    };

    const resUpdateUser = {
      send: (data) => {},
      status: (statusCode) => {
        console.log(`Status Code: ${statusCode}`);
      },
    };

    const updateUserSecretToken = await updateUser(
      reqUpdateUser,
      resUpdateUser
    );

    if (updateUserSecretToken === 200) {
      const send_to = email;
      const sent_from = process.env.EMAIL_USER;
      const reply_to = email;
      const subject = "Estacionate - Reset Password";

      const message = `
      <html>
      <head>
        <style>
          body {
            font-family: 'Arial', sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f4f4f4;
          }
          .container {
            width: 100%;
            max-width: 600px;
            margin: auto;
            background-color: #ffffff;
            padding: 20px;
            box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
          }
          .header {
            text-align: center;
            background-color: #E8E8E8;
            padding: 10px 0;
          }
          .footer {
            font-size: 12px;
            color: #888888;
            text-align: center;
            padding: 20px 0;
          }
          .content {
            text-align: center;
          }
          .button {
            display: block;
            width: 200px;
            margin: 20px auto;
            padding: 10px;
            background-color: #373D20;
            color: white;
            text-decoration: none;
            text-align: center;
            border-radius: 5px;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <p><strong>ESTACIONATE</strong></p>
          </div>
          <div class="content">
            <p>¡Hola <strong>${userName}</strong>!</p>
            <p>Recibes este correo porque has solicitado restablecer tu contraseña en Estacionate.</p>
            <p>Para completar este proceso, sigue los siguientes pasos:</p>
            <ol>
              <li>Haz clic en el siguiente enlace: <a href="${url}/resetPassword">Restablecer Contraseña</a></li>
              <li>Ingresa el siguiente token cuando se te solicite: <strong>${token}</strong></li>
            </ol>
            <p>Si no has solicitado restablecer tu contraseña, puedes ignorar este correo.</p>
          </div>
          <div class="footer">
            Estacionate Support Team<br>
            <!-- Tus detalles de contacto aquí -->
          </div>
        </div>
      </body>
      </html>
      `;

      await sendEmail(subject, message, send_to, sent_from, reply_to);

      res.status(200).json({ success: true, message: "Email Sent" });
    } else {
      res.status(500);
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const validateToken = async (req, res) => {
  try {
    const data = await usersModel.findOne({ secretToken: req.params.token });
    res.send({ data });
  } catch (e) {
    handleHttpError(res, "ERROR_VALIDATE_TOKEN", 500);
  }
};

module.exports = {
  sendResetPasswordEmail,
  validateToken,
};
