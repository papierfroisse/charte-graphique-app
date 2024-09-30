// src/components/File3DSection.js
import React, { useState } from 'react';

function File3DSection({ formData, handleFileChange, nextStep, prevStep }) {
  const [preview, setPreview] = useState(null);

  const handle3DFileUpload = (e) => {
    const file = e.target.files[0];
    handleFileChange(e);
    setPreview(file ? file.name : null); 
  };

  return (
    <div>
      <h2>Fichier 3D (.obj, .fbx)</h2>
      <input 
        type="file" 
        name="file3D" 
        accept=".obj,.fbx" 
        onChange={handle3DFileUpload} 
      />
      {preview && <h3>Fichier chargé : {preview}</h3>}
      <br />
      <button onClick={prevStep}>Précédent</button>
      <button onClick={nextStep}>Suivant</button>
    </div>
  );
}

export default File3DSection;
