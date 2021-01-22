import {getData} from "./script.js";
import {ShowPreLoader} from "./script.js";

export default class Catalog {
    constructor() {
        this.route = "catalog"
        this.content = document.getElementById("content")

        this.products
    }

    loadPage(hash = null) {
        this.loadCatalogPage(hash);
        return true;
    }

    async loadCatalogPage(hash = null) {
        this.content.innerHTML = ShowPreLoader();

        let data = await getData();
        let products = data.products;

        products = this.sortProducts(products, hash);

        this.content.innerHTML = `
        <div class="product-list-wrapper">  
            <div class="product-list" style="position: relative">
                ${this.loadCatalog(products)}
            </div>
        </div>
        `
    }

    loadCatalog(catalog) {
        let catalog_content = '';

        catalog.forEach(product => {
            catalog_content += `
            <div class="product-block">
                <a class="product-block__image" href="#product/${product.url}">
                    <img src="${product.image}" alt="image">
                </a>
                <div class="product-block__description">
                    <div class="product-block__title-row">
                        <a class="product-block__title-text">${product.title}</a>
                    </div>
                    <div class="product-block__price-row">
                        <div class="product-block__price-block">
                            <div>
                                <span class="product-block__price">${product.price}</span>
                                <span class="product-block__currency">грн</span>
                            </div>
                        </div>
                        <div class="product-block__btn-wrap">
                            <button type="button" class="product-block__cart-button">В корзину</button>
                        </div>
                    </div>
                </div>
            </div>`;    
        });

        return catalog_content;
    }

    sortProducts(catalog, hash = null) {
        let filterCatalog = catalog;

        if (hash){
            let types = (hash === "coffee") ? "coffee" :
                (hash === "tea") ? "tea" : "dessert";

            filterCatalog = catalog.filter(product => {
                return product.type.includes(types);
            })
        }

        return filterCatalog;
    }
}