import {getData} from "./script.js"

export default class Cart {
    constructor(){
        this.route = "cart";

        this.products;
        this.cost = 0;
        this.amount = 0;
    }

    async loadPage(hash) {

        if (hash == null){
            this.loadCart();
            return false;
        }
        else {
            if(hash == 'clear'){
                this.clearCart();
            }
            else {
                this.addItemToCartLocalStorage(hash);
            }
        }

        return true;
    }

    async loadCart() {
        const page = document.getElementById("content");

        let data = await getData()
        this.products = data.products;
        
        let itemsInCart = [];
        let cartLocalStorage = JSON.parse(localStorage.getItem("cart"));
        cartLocalStorage.forEach(item => {
            itemsInCart.push(item.url);
        });

        let itemsToShow = this.products.filter(product => {
            return itemsInCart.includes(product.url)
        });

        page.innerHTML = this.loadCartTemplate();

        let cart_body = document.querySelector('.cart-body');
        let counterCart = document.getElementById("cart-counter");
        let totalPriceEl = document.getElementById("total-price");


        itemsToShow.forEach(item => {
            let item_amount = this.getAmountFromLocalStorage(item.url);

            this.totalProducts += item_amount
            counterCart.innerText = this.totalProducts;

            this.totalPrice += (item.price * item_amount);
            totalPriceEl.innerText = (this.totalPrice);

            let amount = cartLocalStorage.filter(itemShow => {
                return item.url === itemShow.url;
            })[0].amount;

            cart_body.innerHTML += this.loadCartProductTemplate(item, amount);

            
        });

        itemsToShow.forEach(item => {
            let delete_btn = document.getElementById("delete-" + item.url);
            delete_btn.addEventListener("click", (e) => {
                e.preventDefault();
                cartLocalStorage.forEach(localItem => {
                    if(localItem.url == item.url){
                        counterCart.innerText = parseInt(counterCart.innerText) - localItem.amount;
                        cartLocalStorage.splice(cartLocalStorage.indexOf(localItem), 1);
                    }
                })   
                             
                localStorage.setItem("cart", JSON.stringify(cartLocalStorage));
    
                this.loadCart()
            });
        });

        this.totalPrice = 0;
        this.totalProducts = 0;

        
    }

    addItemToCartLocalStorage(subHash) {

        window.location = "#cart";
        
        let counterCart = document.getElementById("cart-counter");

        let itemsCart = JSON.parse(localStorage.getItem("cart"));

        if(!itemsCart){
            itemsCart = [];
            itemsCart.push({url: subHash, amount: 1})
            localStorage.setItem("cart", JSON.stringify(itemsCart));
            counterCart.innerText = parseInt(counterCart.innerText) + 1;
            return true;
        }

        let exist = false;
        for (let i = 0; i < itemsCart.length; i++) {
            if (itemsCart[i].url === subHash){
                itemsCart[i].amount++;
                exist = true;
                break
            }
        }

        if (!exist){
            itemsCart.push({url: subHash, amount: 1});
            localStorage.setItem("cart", JSON.stringify(itemsCart));
            counterCart.innerText = parseInt(counterCart.innerText) + 1;
            return true;
        }

        
        localStorage.setItem("cart", JSON.stringify(itemsCart));

        counterCart.innerText = parseInt(counterCart.innerText) + 1;

        return false;
    }

    getAmountFromLocalStorage(url) {
        let itemsCart = JSON.parse(localStorage.getItem("cart"));

        for (let i = 0; i < itemsCart.length; i++) {
            if (itemsCart[i].url === url){
                return itemsCart[i].amount;
            }
        }
    }

    loadCartTemplate() {
        return `
            <div class="cart_wrapper" id="cart_content">
                <div class="cart-top">
                    <h10 class="cart-title">Корзина</h10>
                </div>
                <div class="cart-content">
                    <ul class="cart-body">
                        
                    </ul>
                    <p class="total">
                        <strong>Итоговая цена:</strong>
                        <strong><span class="amount" id="total-price">${this.totalPrice}</span> ₴</strong>
                    </p>
                    <p class="cart-button">
                        <a href="#order" class="button_cart">
                            Оформить заказ
                        </a>
                    </p>
                </div>
            </div>
        `
    }

    loadCartProductTemplate(product, amount) {
        return `
                        <li class="cart-item">
                            <a href="#cart" class="remove-from-cart" id="delete-${product.url}" aria-label="Remove this item">
                                ×</a>
                            <span class="item-image">
                                <a href="#product/${product.url}">
                                    <img src="${product.image}" alt="" width="176" height="176">
                                </a>
                            </span>
                            <span class="cart-description">
                                <span class="cart-text">Название:   </span>
                                <a href="#product/${product.url}" class="item-name">
                                    ${product.title}
                                </a>
                                <span class="cart-quantity">
                                    <div class="quantity">
                                        <span class="cart-text">Количество:</span>
                                        <span id="amount-${product.url}"> ${amount}</span>
                                    </div>
                                </span>
                                <span class="item-price">
                                    <span class="cart-text">Стоимость:   </span>
                                    ${product.price * amount}
                                </span>
                                ₴
                            </span>
                        </li>
        `
    }


    clearCart(){
        localStorage.setItem("cart", JSON.stringify([]));

        this.totalPrice = 0;
        this.totalProducts = 0;

        let counterCart = document.getElementById("cart-counter");
        counterCart.innerText = 0;

        //this.loadPage();
    }

}