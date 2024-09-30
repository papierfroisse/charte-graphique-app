// App.js
import React, { useState } from 'react';
import Formulaire from './components/Formulaire';
import './styles/main.scss'; // Importez le fichier SCSS ici

function App() {
  const [formData, setFormData] = useState({});

  return (
    <div className="app-container">
      <Formulaire formData={formData} setFormData={setFormData} />
    </div>
  );
}

export default App;
