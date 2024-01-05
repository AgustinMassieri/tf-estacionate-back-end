const { handleHttpError } = require("../utils/handleErrors");
const {
  reservationModel,
  parkingModel,
  usersModel,
  paymentModel,
} = require("../models");

const months = [
  "enero",
  "febrero",
  "marzo",
  "abril",
  "mayo",
  "junio",
  "julio",
  "agosto",
  "septiembre",
  "octubre",
  "noviembre",
  "diciembre",
];

const monthlyCounts = months.map((month) => ({
  mes: month,
  count: 0,
}));

const getReservations = async (req, res) => {
  try {
    const user = req.user;
    const data = await reservationModel.find({});
    res.send({ data, user });
  } catch (e) {
    handleHttpError(res, "ERROR_GET_RESERVATIONS", 500);
  }
};

const getReservationsByUserId = async (req, res) => {
  try {
    const reservations = await reservationModel
      .find({ userId: req.params.id })
      .exec();

    if (!reservations) {
      throw new Error("No reservations found for the user");
    }

    const paymentInfo = await paymentModel
      .aggregate([
        {
          $match: {
            reservationId: { $in: reservations.map((r) => r._id.toString()) },
          },
        },
        { $sort: { createdAt: -1 } },
        {
          $group: {
            _id: "$reservationId",
            lastPayment: { $first: "$$ROOT" },
          },
        },
      ])
      .exec();

    const parkingIds = Array.from(
      new Set(reservations.map((reservation) => reservation.parkingId))
    );

    const [parkingResults, user] = await Promise.all([
      parkingModel.find({ _id: { $in: parkingIds } }).exec(),
      usersModel.findOne({ _id: req.params.id }).exec(),
    ]);

    if (!user) {
      throw new Error("User not found");
    }

    const data = reservations.map((reservation) => {
      const parkingResult = parkingResults.find((parking) =>
        parking._id.equals(reservation.parkingId)
      );
      const parkingName = parkingResult
        ? parkingResult.name
        : "Estacionamiento desconocido";
      const parkingLocation = parkingResult
        ? parkingResult.location
        : "Dirección desconocida";
      const paymentGroup = paymentInfo.find(
        (group) => group._id === reservation._id.toString()
      );
      const paymentData = paymentGroup ? paymentGroup.lastPayment : null;

      return {
        ...reservation.toObject(),
        parkingName,
        parkingId: parkingResult._id,
        location: parkingLocation,
        userName: user.firstName + " " + user.lastName,
        paymentStatus: paymentData ? paymentData.status : "No Payment Data",
        paymentUrl: paymentData ? paymentData.url : "",
      };
    });
    res.send({ data });
  } catch (e) {
    console.error(e);
    handleHttpError(res, "ERROR_GET_RESERVATIONS", 500);
  }
};

const createReservation = async (req, res) => {
  try {
    const data = await reservationModel.create(req.body);
    res.send({ data });
  } catch (e) {
    handleHttpError(res, "ERROR_CREATE_RESERVATION", 500);
  }
};

const updateReservation = async (req, res) => {
  try {
    const data = await reservationModel.findByIdAndUpdate(
      req.params.id,
      req.body
    );
    res.send({ data });
  } catch (e) {
    handleHttpError(res, "ERROR_UPDATE_RESERVATION", 500);
  }
};

const getReservationCountsByMonth = async (req, res) => {
  try {
    // Obtener el año actual
    const year = new Date().getFullYear();

    // Realizar la agregación en MongoDB
    const reservationCounts = await reservationModel.aggregate([
      {
        $addFields: {
          // Convertir 'date' de formato string a tipo Date
          convertedDate: {
            $dateFromString: {
              dateString: "$date",
              format: "%Y-%m-%d" // Asegúrate de que el formato coincida con el de tus datos
            }
          }
        }
      },
      {
        $match: {
          // Filtrar por año actual si es necesario
          convertedDate: {
            $gte: new Date(`${year}-01-01`),
            $lte: new Date(`${year}-12-31`)
          }
        }
      },
      {
        $group: {
          // Agrupar por mes extrayendo el mes del campo 'convertedDate'
          _id: { $month: "$convertedDate" },
          count: { $sum: 1 }
        }
      },
      {
        $sort: { _id: 1 } // Ordenar por mes
      }
    ]);

    // Crear un array para cada mes con un conteo inicial de 0
    const countsByMonth = new Array(12).fill(0);

    // Llenar el array con los datos de la consulta
    reservationCounts.forEach(result => {
      countsByMonth[result._id - 1] = result.count; // El índice del mes en el array es mes - 1 porque los meses en JS son 0-indexados
    });

    // Convertir el array en una respuesta que incluya el mes y el conteo
    const responseArray = countsByMonth.map((count, index) => {
      return { month: index + 1, count: count }; // Ajustar el índice para humanos (Enero = 1)
    });

    // Enviar respuesta
    res.status(200).json(responseArray);

  } catch (error) {
    console.error(error);
    res.status(500).send('Error al obtener el recuento de reservas por mes');
  }
};


const getReservationsStatusCount = async (req, res) => {
  try {
    const year = new Date().getFullYear();

    const reservationCounts = await reservationModel.aggregate([
      {
        $addFields: {
          convertedDate: {
            $dateFromString: {
              dateString: "$date",
              format: "%Y-%m-%d"
            }
          }
        }
      },
      {
        $match: {
          convertedDate: {
            $gte: new Date(`${year}-01-01`),
            $lte: new Date(`${year}-12-31`)
          }
        }
      },
      {
        $group: {
          _id: {
            month: { $month: "$convertedDate" },
            status: "$status"
          },
          count: { $sum: 1 }
        }
      },
      {
        $group: {
          _id: "$_id.month",
          statusCounts: {
            $push: {
              status: "$_id.status",
              count: "$count"
            }
          }
        }
      },
      {
        $sort: { _id: 1 }
      }
    ]);

    // Estructura de respuesta inicial con todos los estados incluidos
    const responseArray = Array.from({ length: 12 }, (_, i) => ({
      month: i + 1,
      statusCounts: {
        Completada: 0,
        Registrada: 0,
        Cancelada: 0, // Añadido estado "Cancelada"
        // Agrega aquí otros estados si los tienes
      }
    }));

    // Rellenar la estructura de respuesta con los datos de la consulta
    reservationCounts.forEach(({ _id, statusCounts }) => {
      statusCounts.forEach(({ status, count }) => {
        const monthIndex = _id - 1; // El índice del mes en el array es mes - 1
        if (responseArray[monthIndex].statusCounts.hasOwnProperty(status)) {
          responseArray[monthIndex].statusCounts[status] = count;
        }
      });
    });

    res.json(responseArray);

  } catch (error) {
    console.error(error);
    res.status(500).send('Error al obtener el conteo de reservas por estado y mes');
  }
};



module.exports = {
  getReservations,
  createReservation,
  getReservationsByUserId,
  updateReservation,
  getReservationCountsByMonth,
  getReservationsStatusCount,
};
