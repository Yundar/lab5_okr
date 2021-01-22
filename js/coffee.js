import {getData} from './script.js';
import {ShowPreLoader} from './script.js';

export default class Coffee {
    constructor() {
        this.route = 'coffee';
        this.content = document.getElementById('content');

        this.products;
    }

    loadPage(hash = null) {
        this.loadCatalogPage(hash);
        return true;
    }

    async loadCatalogPage() {
        this.content.innerHTML = ShowPreLoader();

        let data = await getData();
        let products = data.products;

        this.content.innerHTML = `
        <div class="product-list-wrapper">  
            <div class="product-list" style="position: relative">
                ${this.loadCatalog(products)}
            </div>
        </div>
        `;
    }

    loadCatalog(catalog) {
        let catalog_content = '';

        catalog.forEach(coffee => {
            if(coffee.type == 'coffee'){
                catalog_content += `
                <div class="product-block">
                    <a class="product-block__image" href="#product/${coffee.url}">
                        <img src="${coffee.image}" alt="image">
                    </a>
                    <div class="product-block__description">
                        <div class="product-block__title-row">
                            <a class="product-block__title-text">${coffee.title}</a>
                        </div>
                        <div class="product-block__price-row">
                            <div class="product-block__price-block">
                                <div>
                                    <span class="product-block__price">${coffee.price}</span>
                                    <span class="product-block__currency">грн</span>
                                </div>
                            </div>
                            <a class="product-block__btn-wrap" href="#cart/${coffee.url}">
                                <button type="button" class="product-block__cart-button">В корзину</button>
                            </a>
                        </div>
                    </div>
                </div>`;
            }
            
        });

        return catalog_content;
    }
}