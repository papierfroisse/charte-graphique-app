import React, { useRef } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import JsBarcode from 'jsbarcode';
import FormField from './FormField';
import PreviewSVG from './PreviewSVG';

const Formulaire = ({ formData, setFormData }) => {
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
    }),
    onSubmit: values => {
      // Action à effectuer lors de la soumission du formulaire
    },
  });

  // Mettre à jour formData à chaque changement
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

  const generateBarcode = () => {
    const canvas = document.createElement('canvas');
    try {
      JsBarcode(canvas, formik.values.codeBarre, {
        format: 'EAN13',
        displayValue: true,
      });
      return canvas.toDataURL('image/png');
    } catch (error) {
      console.error('Erreur lors de la génération du code-barres', error);
      return '';
    }
  };

  return (
    <div className="app-container">
      {/* Formulaire */}
      <div className="formulaire-module">
        <form onSubmit={formik.handleSubmit}>
          {/* Section : Informations Générales */}
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
          </div>

          {/* Section : Apparence */}
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
          </div>

          {/* Section : Code-Barres */}
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
            <img src={generateBarcode()} alt="Code-Barres" />
          </div>

          {/* Boutons */}
          <div className="form-actions">
            <button type="submit">Soumettre</button>
            <button type="button" onClick={handleDownload}>
              Télécharger le SVG
            </button>
          </div>
        </form>
      </div>

      {/* Prévisualisation du SVG à droite */}
      <div className="preview">
        <PreviewSVG ref={svgRef} formData={formik.values} />
      </div>
    </div>
  );
};

export default Formulaire;
