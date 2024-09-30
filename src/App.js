import React, { useState } from 'react';
import GeneralInfo from './components/GeneralInfo';
import LogoSection from './components/LogoSection';
import ColorSection from './components/ColorSection';
import TypographySection from './components/TypographySection';
import Summary from './components/Summary';

function App() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    brandName: '',
    brandDescription: '',
    logo: null,
    primaryColor: '',
    secondaryColor: '',
    headingFont: '',
    bodyFont: '',
  });

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.files[0],
    });
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return <GeneralInfo formData={formData} handleInputChange={handleInputChange} nextStep={nextStep} />;
      case 2:
        return <LogoSection formData={formData} handleFileChange={handleFileChange} nextStep={nextStep} prevStep={prevStep} />;
      case 3:
        return <ColorSection formData={formData} handleInputChange={handleInputChange} nextStep={nextStep} prevStep={prevStep} />;
      case 4:
        return <TypographySection formData={formData} handleInputChange={handleInputChange} nextStep={nextStep} prevStep={prevStep} />;
      case 5:
        return <Summary formData={formData} prevStep={prevStep} />;
      default:
        return <GeneralInfo formData={formData} handleInputChange={handleInputChange} nextStep={nextStep} />;
    }
  };

  return (
    <div className="App">
      <h1>Création de Charte Graphique</h1>
      {renderStep()}
    </div>
  );
}

export default App;
