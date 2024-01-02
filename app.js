require('dotenv').config();
const express = require('express');
const cors = require('cors');
const dbConnect = require('./config/mongo');
const app = express();
const { reservationModel} = require('./models');
const cron = require('node-cron');

app.use(cors());
app.use(express.json());

const port = process.env.PORT || 3000;

app.use("/api", require("./routes"));

app.use('/uploads', express.static('uploads'));

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

dbConnect();

cron.schedule('* * * * *', async () => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    console.log(today)

    const reservationsToUpdate = await reservationModel.find({
      createdAt: { $lt: today },
      status: 'Registrada',
    });

    console.log(JSON.stringify(reservationsToUpdate));

    for (const reservation of reservationsToUpdate) {
      reservation.status = 'Completada';
      await reservation.save();
    }
  } catch (error) {
    console.error('Error running cron job:', error);
  }
});