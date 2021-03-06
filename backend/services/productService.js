const { Product } = require('../models/productModel');
const axios = require('axios').default;

class ProductService {
  /**
   * Filters an array of user products to return
   * only the products that match the name and
   * onSpecial property values
   * @param {array} products 
   * @param {string} name 
   * @param {boolean} onSpecial 
   */
  filter(products, name, onSpecial) {
    const matches = products.filter((product) => {
      let c1 = true,
          c2 = true;
      if (name) {
        c1 = product.name.toLowerCase().includes(name.toLowerCase());
      }
      if (onSpecial) {
        c2 = product.onSpecial;
      }
      return c1 && c2;
    })
    return matches
  }

  /**
   * Paginates an array of products. Returns five products corresponding
   * to the given page number
   * @param {array} products 
   * @param {number} page 
   */
  paginate(products, page) {
    const PRODUCTS_PER_PAGE = 5;
    const firstIndex = (page - 1) * PRODUCTS_PER_PAGE;
    const secondIndex = firstIndex + PRODUCTS_PER_PAGE;
    return products.slice(firstIndex, secondIndex)
  }


  /**
   * Checks the validity of a potential Woolworths product URL
   * @param {string} url potential Woolworths product URL 
   */
  isValidURL(url) {
    const expression = /((https?)\/\/)?(www\.)?woolworths.com.au\/shop\/productdetails\/[0-9]+\/[a-z0-9-]+/;
    const regex = new RegExp(expression);
    return url.match(regex);
  }


  /**
   * Extract the product number from a validated Woolworths product URL
   * @param {string} url Woolworths product URL 
   */
  getProductNumber(url) {
    var matches = url.match(/(\d+)/);
    if (matches) {
      // Product number will always be first sequence of numbers in URL
      return Number(matches[0]);
    }
  }

  /**
   * Obtain Woolworths product details, such as price, from 
   * the publicly exposed Woolworths product API endpoint.
   * Returns a null product if the product number does not
   * match any of their records
   * @param {string} url valid Woolworths product URL (in terms of syntax)
   */
  async getProductData(url) {
    const number = this.getProductNumber(url);
    const endpoint = `https://www.woolworths.com.au/apis/ui/product/detail/${number}`;
    return await axios.get(endpoint);
  }


  /**
   * Creates an returns an instance of a product model object for the given product.
   * Returns null if the product denoted by the given URL does not exist in
   * the Woolworths backend
   * @param {string} url valid Woolworths product URL (in terms of syntax) 
   */
  async createProductModel(url) {
    const response = await this.getProductData(url);
    const data = response.data['Product'];

    // Sanity check to see if product actually exists in Woolworth's backend
    if (!data) {
      return null;
    }
    
    // Extract and rename relevant fields
    const {
      Name: name,
      Description: description,
      InstoreWasPrice: prevPrice,
      InstorePrice: price,
      InstoreIsOnSpecial: onSpecial,
      LargeImageFile: imagePath,
      InstoreSavingsAmount: savingsAmount
    } = data;

    const product = { 
      name, 
      number: this.getProductNumber(url),
      url: url,
      description, 
      prevPrice, 
      price,
      prevOnSpecial: false,
      onSpecial, 
      imagePath, 
      savingsAmount,
      lastOnSpecialStart: onSpecial ? new Date() : null,
      lastOnSpecialEnd: null
    }

    console.log(JSON.stringify(product));
    return new Product(product);
  }
}

module.exports = ProductService;