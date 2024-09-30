import React, { useRef, useEffect } from 'react';
import JsBarcode from 'jsbarcode';

function SVGPreview({ formData }) {
  const { brandName, brandDescription, logo, primaryColor, secondaryColor, headingFont, bodyFont, barcode } = formData;
  const barcodeRef = useRef();

  useEffect(() => {
    if (barcode) {
      JsBarcode(barcodeRef.current, barcode, {
        format: 'CODE128',
        lineColor: '#000',
        width: 2,
        height: 40,
        displayValue: true,
      });
    }
  }, [barcode]);

  return (
    <svg width="210mm" height="297mm" version="1.1" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="#ffffff" />
      <text x="10" y="50" fontSize="24" fontFamily={headingFont} fill={primaryColor}>
        {brandName}
      </text>
      <text x="10" y="100" fontSize="18" fontFamily={bodyFont} fill={secondaryColor}>
        {brandDescription}
      </text>
      {logo && (
        <image x="10" y="150" width="150" height="150" href={URL.createObjectURL(logo)} alt="Logo" />
      )}
      {barcode && (
        <svg ref={barcodeRef} x="10" y="320"></svg>
      )}
    </svg>
  );
}

export default SVGPreview;
