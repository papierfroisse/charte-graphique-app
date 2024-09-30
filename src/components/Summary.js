// src/components/Summary.js
import React from 'react';

function Summary({ formData, prevStep }) {
  return (
    <div>
      <h2>Résumé de la charte graphique</h2>
      <p><strong>Nom de la marque :</strong> {formData.brandName}</p>
      <p><strong>Description :</strong> {formData.brandDescription}</p>
      <p><strong>Slogan :</strong> {formData.slogan || "Non spécifié"}</p>
      <p><strong>Couleur Principale :</strong> {formData.primaryColor}</p>
      <p><strong>Couleur Secondaire :</strong> {formData.secondaryColor}</p>
      <p><strong>Police des titres :</strong> {formData.headingFont}</p>
      <p><strong>Police du corps du texte :</strong> {formData.bodyFont}</p>
      <p><strong>Fichier Diecut :</strong> {formData.diecutFile ? formData.diecutFile.name : "Aucun fichier"}</p>
      <p><strong>Fichier 3D :</strong> {formData.file3D ? formData.file3D.name : "Aucun fichier"}</p>
      <p><strong>Code-barres/QR Code :</strong> {formData.barcodeData || "Non spécifié"}</p>

      <br />
      <button onClick={prevStep}>Précédent</button>
      <button type="submit">Soumettre</button>
    </div>
  );
}

export default Summary;
