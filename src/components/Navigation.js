import React from 'react';

const Navigation = ({ step, setStep }) => (
  <div className="form-navigation">
    {step > 1 && <button onClick={() => setStep(step - 1)}>Précédent</button>}
    <button onClick={() => setStep(step + 1)}>Suivant</button>
  </div>
);

export default Navigation;
