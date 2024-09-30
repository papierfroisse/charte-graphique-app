import React from 'react';
import FormField from './FormField';
import Select from 'react-select';

const Appearance = ({ formik, polices }) => (
  <div>
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
      />
    </div>
  </div>
);

export default Appearance;
