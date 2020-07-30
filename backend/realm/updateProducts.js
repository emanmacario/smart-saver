/**
 * This function is a serverless function that is deployed on MongoDB Realm.
 * It's purpose is to update all of the user products on a daily basis,
 * according to a scheduled trigger
 */
exports = function() {

  const mongodbAtlas = context.services.get("mongodb-atlas");
  const users = mongodbAtlas.db("WooliesSmartSaver").collection("users");

  users.find()
    .toArray()
    .then((usersList) => {
      usersList.forEach((user) => {
        const products = user.products;
        
        // Update all of the user's products
        products.forEach(async (product) => {
          
          // Get the product details from Woolworths API
          const number = product.number;
          const response = await context.http.get({ url : `https://www.woolworths.com.au/apis/ui/product/detail/${number}` });
          var updatedProduct = EJSON.parse(response.body.text()).Product;
          
          // Extract the details
          const name = updatedProduct['Name'];
          const prevPrice = updatedProduct['InstoreWasPrice'];
          const price = updatedProduct['InstorePrice'];
          const onSpecial = updatedProduct['InstoreIsOnSpecial'];
          const imagePath = updatedProduct['LargeImageFile'];
          const savingsAmount = updatedProduct['InstoreSavingsAmount'];
          
          // Update the product in the database
          users.updateOne(
            { username: user.username, "products.number": number },
            { $set: { 
                "products.$.name": name,
                "products.$.prevPrice": prevPrice,
                "products.$.price": price,
                "products.$.prevOnSpecial": product.onSpecial,
                "products.$.onSpecial": onSpecial,
                "products.$.imagePath": imagePath,
                "products.$.savingsAmount": savingsAmount,
                "products.$.lastOnSpecialStart": !product.onSpecial && onSpecial ? new Date() : product.lastOnSpecialStart,
                "products.$.lastOnSpecialEnd": product.onSpecial && !onSpecial ? new Date() : product.lastOnSpecialEnd
              } 
            }
          );
        });
      });
    });
}