import React, { useState, useRef } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import Select from 'react-select';
import FormField from './FormField';
import PreviewSVG from './PreviewSVG';

const Formulaire = ({ formData, setFormData }) => {
  const [currentSection, setCurrentSection] = useState(0);

  const polices = [
    { value: 'Arial', label: 'Arial' },
    { value: 'Times New Roman', label: 'Times New Roman' },
    { value: 'Helvetica', label: 'Helvetica' },
    { value: 'Courier New', label: 'Courier New' },
  ];

  const svgRef = useRef(null);

  const formik = useFormik({
    initialValues: {
      nomProduit: formData.nomProduit || 'Nom du Produit',
      reference: formData.reference || 'Référence',
      codeBarre: formData.codeBarre || '',
      slogan: formData.slogan || 'Slogan',
      logo: formData.logo || null,
      couleurPrimaire: formData.couleurPrimaire || '#000000',
      couleurSecondaire: formData.couleurSecondaire || '#000000',
      police: formData.police || '',
      taillePolice: formData.taillePolice || '',
      description: formData.description || '',
      siteWeb: formData.siteWeb || '',
      email: formData.email || '',
      telephone: formData.telephone || '',
    },
    validationSchema: Yup.object({
      nomProduit: Yup.string().required('Requis'),
      reference: Yup.string().required('Requis'),
      codeBarre: Yup.string()
        .required('Requis')
        .matches(/^\d{12,13}$/, 'Le code-barres doit être un nombre de 12 ou 13 chiffres'),
      taillePolice: Yup.number()
        .min(8, 'Taille minimale 8')
        .max(72, 'Taille maximale 72'),
      email: Yup.string().email('Email invalide'),
      siteWeb: Yup.string().url('URL invalide'),
      telephone: Yup.string(),
    }),
    onSubmit: values => {
      // Action à effectuer lors de la soumission du formulaire
    },
  });

  React.useEffect(() => {
    setFormData(formik.values);
  }, [formik.values, setFormData]);

  const handleLogoUpload = event => {
    const file = event.currentTarget.files[0];
    formik.setFieldValue('logo', file);
  };

  const handleDownload = () => {
    const svgElement = svgRef.current;
    if (!svgElement) {
      console.error('SVG introuvable');
      return;
    }
    const svgData = new XMLSerializer().serializeToString(svgElement);

    const zip = new JSZip();
    zip.file(`${formik.values.reference || 'document'}.svg`, svgData);

    zip.generateAsync({ type: 'blob' }).then(content => {
      saveAs(content, `${formik.values.reference || 'document'}.zip`);
    });
  };

  const handleNext = () => {
    setCurrentSection((prevSection) => prevSection + 1);
  };

  const handlePrevious = () => {
    setCurrentSection((prevSection) => prevSection - 1);
  };

  const sectionComponents = [
    <div className="form-section">
      <h2>Informations Générales</h2>
      <FormField
        label="Nom du Produit :"
        type="text"
        name="nomProduit"
        value={formik.values.nomProduit}
        onChange={formik.handleChange}
        error={formik.errors.nomProduit}
      />
      <FormField
        label="Référence :"
        type="text"
        name="reference"
        value={formik.values.reference}
        onChange={formik.handleChange}
        error={formik.errors.reference}
      />
      <FormField
        label="Slogan :"
        type="text"
        name="slogan"
        value={formik.values.slogan}
        onChange={formik.handleChange}
        error={formik.errors.slogan}
      />
      <div className="form-group">
        <label>Logo :</label>
        <input type="file" name="logo" onChange={handleLogoUpload} />
      </div>
    </div>,
    <div className="form-section">
      <h2>Coordonnées</h2>
      <FormField
        label="Site Web :"
        type="text"
        name="siteWeb"
        value={formik.values.siteWeb}
        onChange={formik.handleChange}
        error={formik.errors.siteWeb}
      />
      <FormField
        label="Email :"
        type="email"
        name="email"
        value={formik.values.email}
        onChange={formik.handleChange}
        error={formik.errors.email}
      />
      <FormField
        label="Téléphone :"
        type="text"
        name="telephone"
        value={formik.values.telephone}
        onChange={formik.handleChange}
        error={formik.errors.telephone}
      />
    </div>,
    <div className="form-section">
      <h2>Apparence</h2>
      <FormField
        label="Couleur Primaire :"
        type="color"
        name="couleurPrimaire"
        value={formik.values.couleurPrimaire}
        onChange={formik.handleChange}
      />
      <FormField
        label="Couleur Secondaire :"
        type="color"
        name="couleurSecondaire"
        value={formik.values.couleurSecondaire}
        onChange={formik.handleChange}
      />
      <div className="form-group">
        <label>Police de Caractère :</label>
        <Select
          options={polices}
          name="police"
          onChange={option => formik.setFieldValue('police', option.value)}
          value={polices.find(option => option.value === formik.values.police)}
          classNamePrefix="react-select"
        />
      </div>
      <FormField
        label="Taille de la Police (info) :"
        type="number"
        name="taillePolice"
        value={formik.values.taillePolice}
        onChange={formik.handleChange}
        error={formik.errors.taillePolice}
      />
    </div>,
    <div className="form-section">
      <h2>Code-Barres</h2>
      <FormField
        label="Code-Barres :"
        type="text"
        name="codeBarre"
        value={formik.values.codeBarre}
        onChange={formik.handleChange}
        error={formik.errors.codeBarre}
        maxLength={13}
      />
    </div>
  ];

  return (
    <div className="app-container">
      <div className="formulaire-module">
        <form onSubmit={formik.handleSubmit}>
          {sectionComponents[currentSection]}

          <div className="form-actions">
            {currentSection > 0 && <button type="button" onClick={handlePrevious}>Précédent</button>}
            {currentSection < sectionComponents.length - 1 ? (
              <button type="button" onClick={handleNext}>Suivant</button>
            ) : (
              <>
                <button type="submit">Soumettre</button>
                <button type="button" onClick={handleDownload}>Télécharger le SVG</button>
              </>
            )}
          </div>
        </form>
      </div>

      <div className="preview">
        <PreviewSVG ref={svgRef} formData={formik.values} />
      </div>
    </div>
  );
};

export default Formulaire;
