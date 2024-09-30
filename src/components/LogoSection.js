import React from 'react';

function LogoSection({ formData, handleFileChange, nextStep, prevStep }) {
  return (
    <div>
      <h2>Logo</h2>
      <input type="file" name="logo" onChange={handleFileChange} />
      <br />
      <button onClick={prevStep}>Précédent</button>
      <button onClick={nextStep}>Suivant</button>
    </div>
  );
}

export default LogoSection;
