const express = require('express');
const { handleHttpError } = require('../utils/handleErrors');
const { paymentModel } = require('../models');
const router = express.Router();

router.post("/createOrder", async (req, res) => {
  try {
    const reservationId = req.body.reservationId;
    const price = req.body.price;

    const { createOrder } = await import('../utils/mercadoPagoUtils.mjs');
    const data = await createOrder(reservationId, price);
    res.send({ data });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'Error creating order' });
  }
});

router.post("/webhook", async (req, res) => {
  try {
    const { recieveWebhook } = await import('../utils/mercadoPagoUtils.mjs');
    const data = await recieveWebhook(req, res);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'Error creating order' });
  }
})

router.put("/updatePaymentByPreferenceId/:id", async (req, res) => {
  try {
    const data = await paymentModel.findOneAndUpdate(
      { preferenceId: req.params.id },
      req.body
    );
    res.send({ data });
  } catch (e) {
    handleHttpError(res, "ERROR_UPDATE_PAYMENT", 500);
  }
});

module.exports = router;