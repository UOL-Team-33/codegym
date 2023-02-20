/**
 * Loads code data from supplied file name and returns string.
 */
const loadFile = src => {
  if (!src) return '';

  return fetch(src).then(r => r.text());
};

export { loadFile };
