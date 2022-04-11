class ShoppingCart {

    productsInCart = [];

    delivery = 5;

    addToBasket(id){
        // Search for the new product in Array
        let newProduct = allProducts.find((item) => item.id == id);
        // Find the duplicate in the Shopping Basket
        let duplicate = this.productsInCart.find((item) => item.id == id);
        
        if(duplicate){
            duplicate['price'] = duplicate['price'] + newProduct['price'];
            duplicate['quantity'] = duplicate['quantity'] + 1; 
        } else {
            this.productsInCart.push(JSON.parse(JSON.stringify(newProduct)));
        }

        this.loadBasket();
    }


    loadBasket(){
        document.getElementById('shopping-basket-product-box').innerHTML = '';
        document.getElementById('basket-number').innerHTML = 0;

        for (let i = 0; i < this.productsInCart.length; i++) {
            let product = this.productsInCart[i];
        
            document.getElementById('basket-number').innerHTML = i + 1;
            document.getElementById('shopping-basket-product-box').innerHTML += 
                this.loadBasketHTML(product, i);
        }
        this.calculateTotals();
    }


    deleteProduct(i) {
        this.productsInCart.splice(i, 1);
        this.loadBasket();
    }


    reduce(i) {
        let product = this.productsInCart[i];
        let productID = product['id'];
        let standardProduct = allProducts.find((item) => item.id == productID);

        if(product['quantity'] > 1){
            product['price'] = product['price'] - standardProduct['price'];
            product['quantity'] = product['quantity'] - 1;
            this.loadBasket();
        } else {
            this.deleteProduct(i)
        }
    }


    increase(i) {
        let product = this.productsInCart[i];
        let productID = product['id'];
        let standardProduct = allProducts.find((item) => item.id == productID);

        product['price'] = product['price'] + standardProduct['price'];
        product['quantity'] = product['quantity'] + 1;
        this.loadBasket();
    }


    calculateTotals() {
        let subtotal = this.productsInCart.reduce((preValue, item) => {
            return item['price'] + preValue; //Der return wird immer wieder an den nächsten Durchlauf übergeben
        }, 0) //Startwert

        let total;
        if (subtotal < 50) {
            this.delivery = 5;
            total = this.delivery + subtotal;
        } else if (subtotal > 50){
            total = subtotal;
            this.delivery = 0;
        }

        let roundedSubtotal = (Math.round(subtotal * 100) / 100).toFixed(2);
        let roundedDelivery = (Math.round(this.delivery * 100) / 100).toFixed(2);
        let roundedTotal = (Math.round(total * 100) / 100).toFixed(2);

        document.getElementById('subtotal').innerHTML = roundedSubtotal;
        document.getElementById('delivery').innerHTML = roundedDelivery;
        document.getElementById('total').innerHTML = roundedTotal;
    }


    loadBasketHTML(product, i){
        return /*html*/`
        
        <div class="shopping_basket-box">
            <h3 class="shopping_basket-name"><span>${product['quantity']} x </span>${product['name']}</h3>
            <div class="shopping_basket-icon-box">
                <div onclick="shoppingCart.reduce(${i})" class="shopping_basket-icon-container shopping_basket-icon-container-minus">
                    <img class="shopping_basket-icon-minus shopping_basket-icon" src="./img/minus.png">
                </div>
                <div onclick="shoppingCart.increase(${i})" class="shopping_basket-icon-container">
                    <img class="shopping_basket-icon-plus shopping_basket-icon" src="./img/plus.png">
                </div>
            </div>
            <div class="shopping_basket-price">${(Math.round(product['price'] * 100) / 100).toFixed(2)} €</div>
            <img onclick="shoppingCart.deleteProduct(${i})" class="shopping_basket-icon-trash" src="./img/trash.png">
        </div>
    `;
    }
    

}