class ShoppingCart {

    productsInCart = [];
    subtotal;
    total;
    discount = 0;
    discountSum;
    delivery = 5;
    currentProduct;
    currentStandardProduct;

    addToBasket(id){
        // Search for the new product in Array
        let newProduct = allProducts.find((item) => item.id == id);
        // Find the duplicate in the Shopping Basket
        let duplicate = this.productsInCart.find((item) => item.id == id);
        // if the product exist in shopping basket
        if(duplicate){
            duplicate['price'] = duplicate['price'] + newProduct['price'];
            duplicate['quantity'] = duplicate['quantity'] + 1; 
        } else { //push it in the Cart
            this.productsInCart.push(JSON.parse(JSON.stringify(newProduct)));
        }

        this.loadBasket();
    }


    loadBasket(){
        document.getElementById('shopping-basket-product-box').innerHTML = ''; // reset the shopping basket
        document.getElementById('basket-number').innerHTML = 0; //total number on the basket img

        for (let i = 0; i < this.productsInCart.length; i++) {
            let product = this.productsInCart[i];
        
            document.getElementById('basket-number').innerHTML = i + 1; //total number on the basket img (+1 because i starts with 0)
            document.getElementById('shopping-basket-product-box').innerHTML += 
                this.loadBasketHTML(product, i);
        }
        this.calculateTotals();
    }


    calculateTotals() {
        //calc subtotal
        this.subtotal = this.productsInCart.reduce((preValue, item) => {
            return item['price'] + preValue; //Der return wird immer wieder an den nächsten Durchlauf übergeben
        }, 0) //Startwert
        //calc discountSum
        this.discountSum = this.subtotal / (100 + this.discount) * this.discount;
        //calc total and calc free shipping, when subtotal is more or less than 50
        if (this.subtotal < 50) {
            this.delivery = 5;
            this.total = this.subtotal - this.discountSum + this.delivery;
        } else if (this.subtotal > 50){
            this.delivery = 0;
            this.total = this.subtotal - this.discountSum;
        }
        this.roundedTotalsAndRender();
    }


    roundedTotalsAndRender() {
        let roundedSubtotal = (Math.round(this.subtotal * 100) / 100).toFixed(2);
        let roundedDelivery = (Math.round(this.delivery * 100) / 100).toFixed(2);
        let roundedDiscount = (Math.round(this.discountSum * 100) / 100).toFixed(2);
        let roundedTotal = (Math.round(this.total * 100) / 100).toFixed(2);

        document.getElementById('subtotal').innerHTML = roundedSubtotal;
        document.getElementById('delivery').innerHTML = roundedDelivery;
        document.getElementById('discount').innerHTML = roundedDiscount;
        document.getElementById('total').innerHTML = roundedTotal;
    }


    deleteProduct(i) {
        this.productsInCart.splice(i, 1);
        this.loadBasket();
    }


    reduce(i) {
        this.findProducts(i);
        // if the product is in the basket more than once 
        if(this.currentProduct['quantity'] > 1){
            this.currentProduct['price'] = this.currentProduct['price'] - this.currentStandardProduct['price']; //calc new price
            this.currentProduct['quantity'] = this.currentProduct['quantity'] - 1; //calc new quantity
            this.loadBasket();
        } else { // if the product is present only once
            this.deleteProduct(i)
        }
    }


    increase(i) {
        this.findProducts(i);
        this.currentProduct['price'] = this.currentProduct['price'] + this.currentStandardProduct['price'];
        this.currentProduct['quantity'] = this.currentProduct['quantity'] + 1;
        this.loadBasket();
    }


    findProducts(i){
        this.currentProduct = this.productsInCart[i]; //find product
        let productID = this.currentProduct['id']; //find product id
        this.currentStandardProduct = allProducts.find((item) => item.id == productID); //find product in allProducts to calculate the new prices
    }


    addDiscount(discount){
        this.discount = discount;
        this.calculateTotals();
        this.setDiscountButtonColor();
    }


    setDiscountButtonColor(){
        document.getElementById('button-10').style.backgroundColor = 'transparent';
        document.getElementById('button-20').style.backgroundColor = 'transparent';
        document.getElementById('button-30').style.backgroundColor = 'transparent';
        document.getElementById('button-' + this.discount).style.backgroundColor = 'rgb(234, 234, 234)';
    }


    loadBasketHTML(product, i){
        return /*html*/`
        
        <div class="shopping_basket-box">
            <h3 class="shopping_basket-name"><span>${product['quantity']} x </span>${product['name']}</h3>
            <div class="shopping_basket-icon-box">
                <div onclick="shoppingCart.reduce(${i})" class="shopping_basket-icon-container shopping_basket-icon-container-minus">
                    <img class="shopping_basket-icon-minus shopping_basket-icon" src="./img/minus.png">
                </div>
                <div onclick="shoppingCart.increase(${i})" class="shopping_basket-icon-container shopping_basket-icon-container-plus">
                    <img class="shopping_basket-icon-plus shopping_basket-icon" src="./img/plus.png">
                </div>
            </div>
            <div class="shopping_basket-price">${(Math.round(product['price'] * 100) / 100).toFixed(2)} €</div>
            <div class="shopping_basket-icon-trash-outer">
                <img onclick="shoppingCart.deleteProduct(${i})" class="shopping_basket-icon-trash" src="./img/trash.png">
            </div>
        </div>
    `;
    }
    
}