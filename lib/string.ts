"use strict";

export function normalize(str: string) {
  return str
    .replace(/\s+/g, "-")
    .trim()
    .replace(/-{2,}/g, "-")
    .replace(/^-/g, "");
}
