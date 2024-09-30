import React, { useState } from 'react';

function LogoSection({ formData, handleFileChange, nextStep, prevStep }) {
  const [preview, setPreview] = useState(null);

  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    handleFileChange(e); // Enregistre le fichier dans formData
    setPreview(URL.createObjectURL(file)); // Crée un lien pour prévisualiser l'image
  };

  return (
    <div>
      <h2>Logo</h2>
      <input 
        type="file" 
        name="logo" 
        accept="image/*" 
        onChange={handleLogoUpload} 
      />
      {preview && (
        <div>
          <h3>Aperçu du logo :</h3>
          <img src={preview} alt="Logo Preview" style={{ width: '150px', height: '150px' }} />
        </div>
      )}
      <br />
      <button onClick={prevStep}>Précédent</button>
      <button onClick={nextStep}>Suivant</button>
    </div>
  );
}

export default LogoSection;
