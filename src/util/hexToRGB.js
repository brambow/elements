export default function hexToRGB(hex, alpha) {
  // takes #HEX6 and converts to RGB/RGBA
  const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);

  if (alpha) {
    return `rgba(${  r  }, ${  g  }, ${  b  }, ${  alpha  })`;
  } 
    return `rgb(${  r  }, ${  g  }, ${  b  })`;
  
}
