/**
 * Utils
 * Generic functions
 */

 /**
  * Sleep for @param ms microseconds (using setTimeout)
  * usage:
  *     sleep(500).then(...)
  */
function sleep(ms : number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}