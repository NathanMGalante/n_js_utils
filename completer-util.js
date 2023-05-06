/**
 * Creates a completer object with methods for completing and rejecting a Promise, as well as the Promise itself.
 * If a key is provided, it is used as a unique identifier for the completer object, otherwise a default key is used.
 * The completer object is stored in an internal map with the provided key as the key-value pair, which can later be retrieved using the `getCompleter` function.
 *
 * @param {string|null} key - A unique identifier for the completer object (optional).
 * @returns {object} An object with methods for completing and rejecting a Promise, as well as the Promise itself.
 */
export const completer = (key = null) => {
  let complete;
  let completeError;
  let future;

  future = new Promise((resolve, reject) => {
    complete = resolve;
    completeError = reject;
  }).finally(() => {
    delete completerMap[key];
    if (key.includes("anyCompleterKey")) {
      anyCompleterKeyNumber--;
    }
  });

  const object = { complete, completeError, future };
  if (key === null) {
    key = "anyCompleterKey" + anyCompleterKeyNumber++;
  }
  completerMap[key] = object;
  return completerMap[key];
};

/**
 * Retrieves a completer object from the internal map using the provided key.
 *
 * @param {string} key - The unique identifier of the completer object.
 * @returns {object|null} The completer object associated with the provided key, or null if no object was found.
 */
export const getCompleter = (key) => {
  return completerMap[key] || null;
};
