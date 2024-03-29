"use strict";

import vim from "vim-colors";
import { Colors, removeHash } from "./colors";
import { normalize } from "./string";

export function generate(
  name: string,
  colors: Colors,
  darkOrLight: "dark" | "light"
) {
  const newColors = removeHash(colors);

  name = normalize(name);
  if (!name) {
    name = "my-scheme";
  }

  const vimScript = vim(name, {
    dark: darkOrLight === "dark",
    ...newColors,
    scheme: [
      newColors.color1,
      newColors.color2,
      newColors.color3,
      newColors.color4,
      newColors.color5,
      newColors.color6,
    ],
  });

  download(`${name}.vim`, vimScript);
}

function download(filename: string, text: string) {
  const element = document.createElement("a");
  element.setAttribute(
    "href",
    "data:text/plain;charset=utf-8," + encodeURIComponent(text)
  );
  element.setAttribute("download", filename);

  element.style.display = "none";
  document.body.appendChild(element);

  element.click();

  document.body.removeChild(element);
}
