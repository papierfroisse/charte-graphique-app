const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const multer = require('multer');
const helmet = require('helmet');

const app = express();
app.use(cors());
app.use(helmet());
app.use(bodyParser.json());

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.post('/upload', upload.single('logo'), (req, res) => {
  if (!req.file) {
    return res.status(400).send('Aucun fichier reçu');
  }

  // Vérification du type de fichier
  if (!req.file.mimetype.startsWith('image/')) {
    return res.status(400).send('Le fichier doit être une image');
  }

  // Limiter la taille du fichier (par exemple, 5MB)
  if (req.file.size > 5 * 1024 * 1024) {
    return res.status(400).send('Le fichier est trop volumineux');
  }

  // Traitement du fichier...

  res.status(200).send('Fichier reçu avec succès');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Serveur backend démarré sur le port ${PORT}`);
});
