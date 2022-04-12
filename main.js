
let men = new Men();
let women = new Women();
let shoppingCart = new ShoppingCart();
let allProducts = [];
let allMen = [];
let allWomen = [];
var open = false;


function init() {
    calculateAllProducts();
    decideCategory('all');
    console.log(allProducts);
}


function calculateAllProducts() {
    allMen.push(...men.shirts, ...men.pullover, ...men.shorts);
    allWomen.push(...women.shirts, ...women.pullover, ...women.shorts);
    allProducts.push(...allMen, ...allWomen);
}


function openBasket() {
    if(!open){
        //OpenBasket
        document.getElementById('shopping-basket').classList.remove('d-none');
        shoppingCart.loadBasket();
        open = true;
    } else if(open){
        //CloseBasket
        document.getElementById('shopping-basket').classList.add('d-none');
        open = false;
    }
}


function decideCategory(type) {
    if(type == 'all'){
        loadProducts(allProducts);
    } else if(type == 'women'){
        loadProducts(allWomen);
    } else if(type == 'men'){
        loadProducts(allMen);
    }
}


function loadProducts(category){
    document.getElementById('products-container').innerHTML = '';
    for (let i = 0; i < category.length; i++) {
        let product = category[i];
        document.getElementById('products-container').innerHTML += productsHTML(product, i); 
    }
}


function productsHTML(product){
    return /*html*/`
        <div class="product">
            <img class="product-img" src="./img${product['img']}">
            <div class="product-footer">
                <div>
                    <h3 class="product-name">${product['name']}</h3>
                    <h3 class="product-price">
                        <span class="product-price-text">Preis</span> <span>${product['price']}</span> €
                    </h3>
                </div>
                <div onclick="shoppingCart.addToBasket(${product['id']})" id="product-${product}" class="product-plus-img-outer">
                    <img class="product-plus-img" src="./img/plus.png">
                </div>
            </div>
        </div>
    `;
}



    
    


