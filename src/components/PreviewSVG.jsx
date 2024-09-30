import React, { useEffect, useState, forwardRef } from 'react';
import JsBarcode from 'jsbarcode';

const PreviewSVG = forwardRef(({ formData }, ref) => {
  const [logoDataUrl, setLogoDataUrl] = useState('');
  const [barcodeDataUrl, setBarcodeDataUrl] = useState('');
  const [barcodeError, setBarcodeError] = useState('');

  // Fonction pour calculer le chiffre de contrôle EAN13
  const calculateEAN13CheckDigit = code => {
    const digits = code.split('').map(Number);
    const sum = digits.reduce((acc, digit, idx) => {
      return acc + digit * (idx % 2 === 0 ? 1 : 3);
    }, 0);
    const checkDigit = (10 - (sum % 10)) % 10;
    return checkDigit;
  };

  // Fonction pour vérifier la validité du code EAN13
  const isValidEAN13 = code => {
    if (!/^\d{13}$/.test(code)) return false; // Vérifie que le code a exactement 13 chiffres
    const digits = code.split('').map(Number);
    const checkDigit = digits.pop(); // Dernier chiffre (chiffre de contrôle)
    const sum = digits.reduce((acc, digit, idx) => {
      return acc + digit * (idx % 2 === 0 ? 1 : 3);
    }, 0);
    const calculatedCheckDigit = (10 - (sum % 10)) % 10;
    return checkDigit === calculatedCheckDigit;
  };

  // Génération du code-barres en Data URL
  useEffect(() => {
    if (
      formData.codeBarre &&
      formData.codeBarre.length >= 12 &&
      formData.codeBarre.length <= 13
    ) {
      let codeBarre = formData.codeBarre;

      if (codeBarre.length === 12) {
        const checkDigit = calculateEAN13CheckDigit(codeBarre);
        codeBarre += checkDigit;
      }

      if (codeBarre.length === 13) {
        // Vérifier que le code-barres est valide
        if (isValidEAN13(codeBarre)) {
          try {
            const canvas = document.createElement('canvas');
            JsBarcode(canvas, codeBarre, {
              format: 'EAN13',
              displayValue: true,
              fontOptions: 'bold',
              fontSize: 20,
              textMargin: 0,
              font: 'Arial',
              textAlign: 'center',
              lineColor: '#000000',
              background: 'transparent',
              width: 2,
              height: 60,
            });
            const dataUrl = canvas.toDataURL('image/png');
            setBarcodeDataUrl(dataUrl);
            setBarcodeError(''); // Réinitialiser l'erreur
          } catch (error) {
            console.error('Erreur lors de la génération du code-barres:', error);
            setBarcodeDataUrl('');
            setBarcodeError('Erreur lors de la génération du code-barres.');
          }
        } else {
          setBarcodeDataUrl('');
          setBarcodeError('Le code-barres saisi est invalide.');
        }
      } else {
        setBarcodeDataUrl('');
        setBarcodeError('Le code-barres doit avoir 13 chiffres.');
      }
    } else {
      setBarcodeDataUrl('');
      setBarcodeError('');
    }
  }, [formData.codeBarre]);

  // Lecture du logo en Data URL
  useEffect(() => {
    if (formData.logo) {
      const reader = new FileReader();
      reader.onload = event => {
        setLogoDataUrl(event.target.result);
      };
      reader.readAsDataURL(formData.logo);
    } else {
      setLogoDataUrl('');
    }
  }, [formData.logo]);

  // Dimensions du SVG en millimètres pour un format A4
  const svgWidth = 210; // Largeur en mm
  const svgHeight = 297; // Hauteur en mm

  // Marges
  const margin = 20;

  // Taille réduite pour le texte dans le SVG
  const defaultFontFamily = formData.police || 'Arial';
  const defaultFontSize = 6; // Réduction de la taille pour un meilleur ajustement
  const lineHeight = defaultFontSize + 3;

  // Positionnement des éléments
  const logoSize = 40; // Taille du logo
  const logoX = svgWidth - logoSize - margin;
  const logoY = margin;

  const infoX = margin;
  const infoY = margin + 10;

  const barcodeWidth = 50;
  const barcodeHeight = 40;
  const barcodeX = svgWidth - barcodeWidth - margin;
  const barcodeY = svgHeight - barcodeHeight - margin;

  const couleurPrimaire = formData.couleurPrimaire || '#000000';
  const couleurSecondaire = formData.couleurSecondaire || '#000000';

  // Calcul du nombre de lignes pour le positionnement
  const lines = [
    `Nom du Produit : ${formData.nomProduit}`,
    `Référence : ${formData.reference}`,
    `Slogan : ${formData.slogan}`,
    `Description : ${formData.description}`,
    `Site Web : ${formData.siteWeb}`,
    `Email : ${formData.email}`,
    `Téléphone : ${formData.telephone}`,
    `Police : ${defaultFontFamily}`,
    `Taille de la police (info) : ${formData.taillePolice || 'N/A'}`,
    `Couleur Primaire : ${couleurPrimaire}`,
    `Couleur Secondaire : ${couleurSecondaire}`
  ];

  const nombreDeLignes = lines.length;

  // Positions des carrés de couleur
  const couleurPrimaireY = infoY + lineHeight * (nombreDeLignes - 2);
  const couleurSecondaireY = couleurPrimaireY + lineHeight;

  return (
    <div className="svg-preview">
      <svg
        ref={ref}
        width={`${svgWidth}mm`}
        height={`${svgHeight}mm`}
        viewBox={`0 0 ${svgWidth} ${svgHeight}`}
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Fond blanc */}
        <rect width="100%" height="100%" fill="#FFFFFF" />

        {/* Logo */}
        {logoDataUrl && (
          <image href={logoDataUrl} x={logoX} y={logoY} width={logoSize} height={logoSize} />
        )}

        {/* Informations du formulaire */}
        <text
          x={infoX}
          y={infoY}
          fontSize={defaultFontSize}
          fontFamily={defaultFontFamily}
          fill="#000000"
        >
          {lines.map((line, index) => (
            <tspan x={infoX} dy={index === 0 ? 0 : lineHeight} key={index}>
              {line}
            </tspan>
          ))}
        </text>

        {/* Carrés de couleur */}
        <rect
          x={infoX + 150}
          y={couleurPrimaireY - defaultFontSize}
          width="10"
          height="10"
          fill={couleurPrimaire}
          stroke="#000"
        />
        <rect
          x={infoX + 150}
          y={couleurSecondaireY - defaultFontSize}
          width="10"
          height="10"
          fill={couleurSecondaire}
          stroke="#000"
        />

        {/* Code-barres */}
        {barcodeDataUrl ? (
          <image
            href={barcodeDataUrl}
            x={barcodeX}
            y={barcodeY}
            width={barcodeWidth}
            height={barcodeHeight}
          />
        ) : barcodeError ? (
          <text
            x={barcodeX}
            y={barcodeY + 20}
            fontSize="10"
            fontFamily="Arial"
            fill="#FF0000"
          >
            {barcodeError}
          </text>
        ) : null}
      </svg>
    </div>
  );
});

export default PreviewSVG;
