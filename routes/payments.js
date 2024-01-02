const express = require('express');
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

router.get("/success", (req, res) => res.send("Success"));
router.get("/failure", (req, res) => res.send("Failure"));
router.get("/pending", (req, res) => res.send("Pending"));

router.post("/webhook", async (req, res) => {
  try {
    const { recieveWebhook } = await import('../utils/mercadoPagoUtils.mjs');
    const data = await recieveWebhook(req, res);
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: 'Error creating order' });
  }
})

module.exports = router;