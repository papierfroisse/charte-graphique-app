import React, { useState, useRef } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import Select from 'react-select';
import GeneralInfo from './GeneralInfo';
import Appearance from './Appearance';
import ContactInfo from './ContactInfo';
import Navigation from './Navigation';
import PreviewSVG from './PreviewSVG';

const Formulaire = ({ formData, setFormData }) => {
  const [step, setStep] = useState(1);

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
      slogan: formData.slogan || 'Slogan',
      description: formData.description || '',
      siteWeb: formData.siteWeb || '',
      email: formData.email || '',
      telephone: formData.telephone || '',
      couleurPrimaire: formData.couleurPrimaire || '#000000',
      couleurSecondaire: formData.couleurSecondaire || '#000000',
      police: formData.police || '',
      taillePolice: formData.taillePolice || '',
    },
    validationSchema: Yup.object({
      nomProduit: Yup.string().required('Requis'),
      reference: Yup.string().required('Requis'),
      email: Yup.string().email('Email invalide'),
      siteWeb: Yup.string().url('URL invalide'),
    }),
    onSubmit: values => {
      // Action de soumission
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

  return (
    <div className="app-container">
      {/* Formulaire */}
      <div className="formulaire-module">
        <form onSubmit={formik.handleSubmit}>
          {step === 1 && <GeneralInfo formik={formik} />}
          {step === 2 && <Appearance formik={formik} polices={polices} />}
          {step === 3 && <ContactInfo formik={formik} />}
          <Navigation step={step} setStep={setStep} />
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
