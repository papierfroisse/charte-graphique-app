import React, { useState } from 'react';
import GeneralInfo from './components/GeneralInfo';
import ColorSection from './components/ColorSection';
import TypographySection from './components/TypographySection';
import LogoSection from './components/LogoSection';
import SVGPreview from './components/SVGPreview';
import { saveAs } from 'file-saver';
import JSZip from 'jszip';

function App() {
  const [formData, setFormData] = useState({
    brandName: '',
    brandDescription: '',
    logo: null,
    primaryColor: '#000000',
    secondaryColor: '#000000',
    headingFont: 'Arial',
    bodyFont: 'Arial',
    barcode: '',  // Champ pour le code-barres
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.files[0] });
  };

  const saveSVG = () => {
    const svg = document.querySelector('.preview svg');
    const blob = new Blob([svg.outerHTML], { type: 'image/svg+xml' });
    const productFolder = `${formData.brandName}_dossier`; 
    const zip = new JSZip();
    zip.file(`${productFolder}/${formData.brandName}_charte_graphique.svg`, blob);

    zip.generateAsync({ type: 'blob' }).then((content) => {
      saveAs(content, `${formData.brandName}_charte_graphique.zip`);
    });
  };

  return (
    <div className="container">
      <div className="sidebar">
        <GeneralInfo formData={formData} handleInputChange={handleInputChange} />
        <LogoSection formData={formData} handleFileChange={handleFileChange} />
        <ColorSection formData={formData} handleInputChange={handleInputChange} />
        <TypographySection formData={formData} handleInputChange={handleInputChange} />
        <button onClick={saveSVG}>Télécharger le SVG</button>
      </div>
      <div className="preview">
        <SVGPreview formData={formData} />
      </div>
    </div>
  );
}

export default App;
