const AirConditioner = require('../classes/AirConditioner');
const ProductsEnum = require('./enums');

// Returns a lit of Air Conditioner objects from a given list of products
exports.getAirConditioners = (products) => {
  const acList = [];
  for (let i = 0; i < products.length; i += 1) {
    if (products[i]['category'] === ProductsEnum.AIR_CONDITIONER) {
      acList.push(new AirConditioner(products[i]['size']));
    }
  }
  return acList;
};

// Calculates the avergae cubic weight for the given list of products
exports.calculateAverageCubicWeight = (products) => {
  let sum = 0;
  for (let i = 0; i < products.length; i += 1) {
    sum += products[i].getCubicWeight();
  }
  return sum / products.length;
};

// Mock logging
exports.logError = (err) => {
  console.error('Error!');
  console.error(err);
};
