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
            const productNumber = product.productNumber;
            const response = await context.http.get({ url : `https://www.woolworths.com.au/apis/ui/product/detail/${productNumber}` });
            var updatedProduct = EJSON.parse(response.body.text()).Product;
            
            // Extract the details
            const name = updatedProduct['Name'];
            const prevPrice = updatedProduct['WasPrice'];
            const price = updatedProduct['InstorePrice'];
            const onSpecial = updatedProduct['InstoreIsOnSpecial'];
            const imagePath = updatedProduct['LargeImageFile'];
            const savingsAmount = updatedProduct['InstoreSavingsAmount'];
            
            // Update the product in the database
            users.updateOne(
              { username: user.username, "products.productNumber": productNumber },
              { $set: { 
                  "products.$.name": name,
                  "products.$.prevPrice": prevPrice,
                  "products.$.price": price,
                  "products.$.onSpecial": onSpecial,
                  "products.$.imagePath": imagePath,
                  "products.$.savingsAmount": savingsAmount
                } 
              }
            );
          });
        });
      });
}