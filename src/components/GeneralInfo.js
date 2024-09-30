import React from 'react';
import FormField from './FormField';

const GeneralInfo = ({ formik }) => (
  <div>
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
    <FormField
      label="Description :"
      type="textarea"
      name="description"
      value={formik.values.description}
      onChange={formik.handleChange}
      error={formik.errors.description}
    />
  </div>
);

export default GeneralInfo;
