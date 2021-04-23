// Please read README.md for instructions on how to run this program
// and brief explanations of code habits.
//
// Assumptions
// - All dimensions are provided in centimetres (cm)
// - All weights are provided in grams (g)

const fetch = require('node-fetch');
const ProductsEnum = require('./utils/enums');
const { getAirConditioners, calculateAverageCubicWeight, logError } = require('./utils/helpers');

const domain = 'http://wp8m3hewt.s3-website-ap-southeast-2.amazonaws.com';

/** Returns the list of all product from the given API endpoint based on
 * the passed-in product parameter
 *
 * Paginated API is processed recursively
*/
const getProducts = async (url, product, productList) => {
  try {
    const response = await fetch(url);
    if (response.status === 200) {
      const data = await response.json();

      // Recursively obtain next page of products if next page exists
      if (data.next) {
        const nextEndpoint = domain + data.next;
        if (data.objects) {
          return await getProducts(nextEndpoint,
            product, productList.concat(getAirConditioners(data.objects)));
        }
        return await getProducts(nextEndpoint, product, productList);
      }
      return productList;
    }

    // Log the HttpResponse status if not 200 OK
    console.log(response.status, response.statusText);
    return productList;
  } catch (err) {
    logError(err);
  }
};

const initialPath = '/api/products/1';
const initialEndpoint = `${domain}${initialPath}`;

/** The main function to be run:
 *  An asynchronous function that first retrieves all the Air Conditioners
 *  and then calculates the average cubic weight for them.
 */
const printAirConditionersAverageCubicWeight = async () => {
  try {
    const products = await getProducts(initialEndpoint,
      ProductsEnum.AIR_CONDITIONER, []);

    console.assert(products !== undefined,
      'products (The list of products) is undefined.');

    if (products) {
      console.assert(products.length > 0,
        'No Air Conditioners found.');

      const average = calculateAverageCubicWeight(products);

      if (average) {
        console.log(`The average cubic weight for all Air Conditioners is ${average}kg`);
      }
    }
  } catch (err) {
    logError(err);
  }
};

printAirConditionersAverageCubicWeight();
