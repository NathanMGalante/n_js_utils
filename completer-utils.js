let completerMap = {};

let anyCompleterKeyNumber = 0;

/**
 * @param {String} key The key
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
 * @param {String} key [Required] The key
 */
export const getCompleter = (key) => {
  return completerMap[key];
};
