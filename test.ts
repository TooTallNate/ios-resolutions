import { guessDevice } from './dist/index.js';

// iPhone 13 / 14
console.log(guessDevice({ width: 390, height: 844 }, 3));

// iPhone 11
console.log(guessDevice({ width: 414, height: 896 }, 2));