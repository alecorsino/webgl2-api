import {getNumber} from './util'
/**
 * 
 * @param {string} prefix Prefixes the string or uses it's default value "flick-"
 * @returns a string followed by a number
 */
export const randomName = (prefix = 'flick-') => `${prefix}${Math.floor( 4200 * Math.random())}`;


/**
 * Creates a Canvas element and sets width and height as inline style
 * @param {string} id Canvas id porperty
 * @param {string} width String representation of css style units i.e "200px" 
 * @param {string} height String representation of css style units i.e "300px" 
 * @returns HTMLCanvasElement
 */
export const createCanvas = (id = randomName(), width = '200px', height = '200px') => {
  let canvas = document.createElement('canvas');
  canvas.id = id;
  setCanvasSize(width, height, canvas)
  return canvas;
}

/**
 * Modifies canvas size. Sets inline style and canvas props width and height
 * @param {string} width css style units. i.e "200px" "100vh"
 * @param {string} height css style units. i.e "200px" "100vh"
 * @param {*} canvas modified canvas
 */
export const setCanvasSize = (width, height, canvas) => {
  canvas.style.width = width;
  canvas.style.height = height;
  canvas.width  = getNumber(width);
  canvas.height = getNumber(height);
  console.log('CANVAS',canvas, getNumber(width));
  return canvas;
}


// const setCanvasSize = (canvas, width, height) => {


/**
   * Resize a canvas to match the size its displayed.
   * @param {HTMLCanvasElement} canvas The canvas to resize.
   * @param {number} [multiplier] amount to multiply by.
   *    Pass in window.devicePixelRatio for native pixels.
   * @return {boolean} true if the canvas was resized.
   * @memberOf module:webgl-utils
   */
  function resizeCanvasToDisplaySize(canvas, multiplier) {
    multiplier = multiplier || 1;
    var width  = canvas.clientWidth  * multiplier | 0;
    var height = canvas.clientHeight * multiplier | 0;
    if (canvas.width !== width ||  canvas.height !== height) {
      canvas.width  = width;
      canvas.height = height;
      return true;
    }
    return false;
  }
