const multer = require('multer');
const path = require('path');

// Configuración de almacenamiento
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    // Directorio donde se guardarán las imágenes
    cb(null, path.join(__dirname, '../uploads'));
  },
  filename: function(req, file, cb) {
    // Generar un nombre único para la imagen
    cb(null, `${Date.now()}-profile-pic${path.extname(file.originalname)}`);
  }
});

// Filtro para validar el tipo de archivo
const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    // Aceptar el archivo
    cb(null, true);
  } else {
    // Rechazar el archivo
    cb(new Error('Only .png, .jpg and .jpeg format allowed!'), false);
  }
};

// Middleware de Multer configurado para cargar imágenes de perfil
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5 // 5MB
  },
  fileFilter: fileFilter
});

module.exports = upload;
