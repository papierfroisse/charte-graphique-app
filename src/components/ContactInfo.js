import React from 'react';
import FormField from './FormField';

const ContactInfo = ({ formik }) => (
  <div>
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
  </div>
);

export default ContactInfo;
