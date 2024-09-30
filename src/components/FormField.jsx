// FormField.jsx
import React from 'react';

const FormField = ({
  label,
  type,
  name,
  value,
  onChange,
  error,
  maxLength,
  inputStyle,
}) => {
  return (
    <div className="form-group">
      <label>{label}</label>
      {type === 'textarea' ? (
        <textarea
          name={name}
          value={value}
          onChange={onChange}
          className={error ? 'input-error' : ''}
          style={inputStyle}
        />
      ) : (
        <input
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          className={error ? 'input-error' : ''}
          maxLength={maxLength}
          style={inputStyle}
        />
      )}
      {error && <div className="error-message">{error}</div>}
    </div>
  );
};

export default FormField;
