// src/components/ImageIconSection.js
import React, { useState } from 'react';

function ImageIconSection({ formData, handleFileChange, nextStep, prevStep }) {
  const [preview, setPreview] = useState([]);

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    handleFileChange(e);
    setPreview(files.map(file => URL.createObjectURL(file)));
  };

  return (
    <div>
      <h2>Images et Iconographie</h2>
      <input 
        type="file" 
        name="images" 
        multiple 
        accept="image/*" 
        onChange={handleImageUpload} 
      />
      <div>
        {preview.map((src, index) => (
          <img key={index} src={src} alt="Preview" style={{ width: '100px', margin: '10px' }} />
        ))}
      </div>
      <br />
      <button onClick={prevStep}>Précédent</button>
      <button onClick={nextStep}>Suivant</button>
    </div>
  );
}

export default ImageIconSection;
