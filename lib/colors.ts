"use strict";

type Colors = { [name: string]: string };

export function removeHash(colors: Colors) {
  const newColors: Colors = {};

  for (const c in colors) {
    newColors[c] = colors[c].split("#").pop();
  }

  return newColors;
}

export function isLightOrDark(hexColor: string) {
  // Check if hexColor starts with '#'
  if (hexColor.indexOf("#") === 0) {
    hexColor = hexColor.slice(1);
  }

  // Convert hexColor to RGB
  const r = parseInt(hexColor.substr(0, 2), 16); // Red
  const g = parseInt(hexColor.substr(2, 2), 16); // Green
  const b = parseInt(hexColor.substr(4, 2), 16); // Blue

  // Calculate brightness
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;

  // returnValue
  return brightness > 155 ? "light" : "dark";
}
