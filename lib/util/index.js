/**
 *  Postpone execution after the current stack call is empty
 * @param {Function} job Function to be called later
 * @param {Arguments} args Arguments to be passed to the function when is called. Because Context is lost.
 */
export const delayJob = (job, ...args) => {
  // console.log('[EXEC JOB]', job);
  setTimeout(() => job.call(this, ...args) , 0);
}

/**
 * 
 * @param {Byte} b Values between 0..255
 * @returns {float} values between 0..1,0
 */
export const byteToFloat = (b) => b/255

/**
 * Returns an array with all the arguments converted to float 
 * i.e. (255, 0, 128) -> [1, 0, 0.5019607843137255].
 * Uses byteToFloat to map values.
 * @param {number} rgba [0-255] Number
 */
export const rgbaToFloat = (...rgba) => rgba.map(byteToFloat) 

/**
 * Returns a number from a css style size string unit. i.e "200px" -> 200
 * @param {string} str String containing a number
 */
export const getNumber = (str) => +str.match(/([0-9]+)/g)

/**
 *  "Class" extension by object composition.
 * @param {Object} target Class Prototype to extend
 * @param {Object} behaviour (new "methods")functions wrapped in an object. it accepts multiple objects.
 */
export const ClassMixin = (target, ...behaviour) => Object.assign(target, ...behaviour);
// const ClassMixin = (behaviour) => (target) => Object.assign(target, behaviour);

/**
 * Converts first letter of a String to Upper ase. i.e "hola" -> "Hola"
 * @param {string} str 
 * @returns {string}
 */
export const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);
