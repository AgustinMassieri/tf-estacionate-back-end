import { MercadoPagoConfig, Preference } from "mercadopago";
import paymentModel from "../models/payment.js";

export const createOrder = async (reservationId, price) => {
  try {
    const client = new MercadoPagoConfig({
      accessToken: process.env.MERCADO_PAGO_ACCESS_TOKEN,
      options: { timeout: 5000 },
    });

    const preference = new Preference(client);

    const response = await preference.create({
      body: {
        items: [
          {
            currency_id: "ARS",
            title: "Estacionamiento - Estacionate",
            quantity: 1,
            unit_price: price,
            description: reservationId,
          },
        ],
        back_urls: {
          success: "http://localhost:3000/reservations/success?reservationId=" + reservationId,
          failure: "http://localhost:3000/reservations/failure?reservationId=" + reservationId,
          pending: "http://localhost:3000/reservations",
        },
        notification_url: "https://a154-2800-810-43d-f3-750e-fea8-423d-9b1f.ngrok-free.app/api/payments/webhook",
      },
    });

    const payment = {
      reservationId: reservationId,
      preferenceId: response.id,
      url: response.init_point,
    };

    const order = await paymentModel.create(payment);

    return order;
  } catch (error) {
    console.error(error);
    return "Error creating order";
  }
};

export const recieveWebhook = async (req, res) => {
    console.log(req);

    try {
        const payment = req.query;
        console.log(payment);
        if (payment.type === "payment") {
          //const data = await paymentModel.findOneAndUpdate(

        }
    
        res.sendStatus(204);
      } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Something goes wrong" });
      }
    
};