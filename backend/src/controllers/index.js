const database = require('../database/products.json');
const searchProduct = async (req,res) => {

    const search = req.query.filter || "";
    
    if(!search){
        return res.status(404).json({
            ok:false,
            msg:"no products found"
        });
    }

    let suggestions = [], listCategory = [];
    
    try {

    const products = database.product.filter(producto => producto.name.toLowerCase().includes(search.toLowerCase()));
    
    products.forEach(productSearch => {
      if(!listCategory.includes(productSearch.category)){

        const suggestionCategory = database.product.filter(producto => producto.category === productSearch.category && producto.name !== productSearch.name).slice(0, 2);
      
        listCategory.push(productSearch.category);

        suggestionCategory.forEach(suggestion => {
            
            // Verificar si el producto ya existe en las sugerencias
            const exists = products.find(existProduct => existProduct.name === suggestion.name);
            
            if (!exists) {
              suggestions.push(suggestion);
            }
          });
      }
      
    });


    if(products.length === 0){
        return res.status(404).json({
            ok:false,
            msg:"no products found"
        });
    }

        return res.status(200).json({
            ok:true,
            products,
            suggestions
        });

    } catch (error) {
        return res.status(500).send({
            ok:false,
            msg:"server error"
        });
    }
}

module.exports = {
    searchProduct
}