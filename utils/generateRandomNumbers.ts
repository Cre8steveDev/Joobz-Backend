/**
 * Generates a random number of a given length
 * length: Length of the number
 */

function generateRandomNumber(length: number) {
  if (length <= 0) {
    return 0;
  }

  const min = Math.pow(10, length - 1);
  const max = Math.pow(10, length) - 1;

  return Math.floor(Math.random() * (max - min + 1) + min);
}

export default generateRandomNumber;
