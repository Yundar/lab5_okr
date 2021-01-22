import { getData, ShowPreLoader } from "./script.js";

export default class Product {
    constructor() {
        this.route = "product";
        this.content = document.getElementById("content");
    }

    loadPage(hash){
        if (hash == null){
            return false;
        }
        else {
            this.loadProductPage(hash);
        }
        return true;
    }

    async loadProductPage(hash){
        this.content.innerHTML = ShowPreLoader();

        let data = await getData();
        let product = data.products.filter(tempProduct => {
            return tempProduct.url === hash;
        });
        product = product[0];

        this.content.innerHTML = `
            ${this.loadProduct(product)}
        `;
    }

    loadProduct(product){
        return `
        <div class="product-wrapper">
            <div class="product-top">
                <h10 class="product-title">${product.title}</h10>
            </div>
            <div class="product">
                <div class="product-img">
                    <img src="${product.image}">
                </div>
                <div class="product-description">
                    ${product.description}
                </div>
            </div>
            <div class="product-price">
                <span>Стоимость: </span>
                <span>${product.price}</span>
                <span>₴</span>
            </div>
            <div class="product-button">
                <a href="#cart/${product.url}" class="button_product">
                    Добавить в корзину
                </a>
            </div>
        </div>
        `
    }
}