import multer from "multer";
import path from "path";


const mediaStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(process.cwd(), "uploads"));
  },
  filename: function (req, file, cb) {
    const fileName = Date.now() + "-" + file.originalname;
    cb(null, fileName);
  },
});

const uploadMedia = multer({ storage: mediaStorage });

export { uploadMedia };


// // Configuration de multer pour la gestion des téléchargements de médias
// const uploadMedia = multer({
//   storage: mediaStorage,
//   fileFilter: function (req, file, cb) {
//     // Vérifier le type de fichier pour les images
//     if (
//       (file.fieldname === "imageMedia" && (file.mimetype === "image/jpeg" || file.mimetype === "image/png")) ||
//       (file.fieldname === "pdfMedia" && file.mimetype === "application/pdf")
//     ) {
//       cb(null, true);
//     } else {
//       // Rejeter les autres types de fichiers
//       cb(
//         new Error("Seuls les fichiers JPEG, PNG et PDF sont autorisés!"),
//         false
//       );
//     }
//   },
// });
