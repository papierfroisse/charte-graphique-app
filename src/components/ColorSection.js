import React from 'react';

function ColorSection({ formData, handleInputChange, nextStep, prevStep }) {
  return (
    <div>
      <h2>Palette de Couleurs</h2>
      <label>
        Couleur Principale:
        <input type="color" name="primaryColor" value={formData.primaryColor} onChange={handleInputChange} />
      </label>
      <br />
      <label>
        Couleur Secondaire:
        <input type="color" name="secondaryColor" value={formData.secondaryColor} onChange={handleInputChange} />
      </label>
      <br />
      <button onClick={prevStep}>Précédent</button>
      <button onClick={nextStep}>Suivant</button>
    </div>
  );
}

export default ColorSection;
