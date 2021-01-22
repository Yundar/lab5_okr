import {getData} from "./script.js";
import {ShowPreLoader} from "./script.js";


export default class Home{
    constructor(){
        this.route = 'home';
        this.content = document.getElementById("content");
    }

    loadPage() {
        this.loadHome();
        return true;
    }

    async loadHome() {

        this.content.innerHTML = ShowPreLoader();

        let data = await getData();
        let products = data.products;

        this.content.innerHTML = `
        ${this.loadSlider()}
        <div class="category_name">Кофе</div>
        <div class="product-list-wrapper">  
            <div class="product-list" style="position: relative">
                ${this.loadCoffee(products)}
            </div>
        </div>
        <div class="category_name">Чай</div>
        <div class="product-list-wrapper">  
            <div class="product-list" style="position: relative">
                ${this.loadTea(products)}
            </div>
        </div>
        <div class="category_name">Дессерты</div>
        <div class="product-list-wrapper">  
            <div class="product-list" style="position: relative">
                ${this.loadDessert(products)}
            </div>
        </div>
        `;
        this.sliderScript();
        
    }

    loadSlider(){
        return `
        <div class="flex-wrapper">
            <div class="slide-wrapper">
                <div class="slide active">
                    <img src="img/slider/coffee-to-go.png" alt="">
                </div>
                <a class="slide" href="#actions/coffee_action">
                    <img src="img/slider/action.png" alt="">
                </a>
                <div class="slide">
                    <img src="img/slider/life-begins.png" alt="">
                </div>
            </div>
            
        </div>
        <div class="dots-wrapper">
            <span class="dot active"></span>
            <span class="dot"></span>
            <span class="dot"></span>
        </div>
        `
    }

    sliderScript(){
        const slides = document.querySelectorAll(".slide");
        const slidesWrapper = document.querySelector(".slider-wrapper");
        const dots = document.querySelectorAll(".dot");

        let index = 0;

        const activeSlide = n => {
            for(let slide of slides) {
                slide.classList.remove('active');
            }
            slides[n].classList.add('active');
        }

        const activeDot = n => {
            for(let dot of dots) {
                dot.classList.remove('active');
            }
            dots[n].classList.add('active');
        }

        const nextSlide = () => {
            if(index == slides.length - 1){
                index = 0;
                prepareCurrentSlide(index);
            } else {
                index ++;
                prepareCurrentSlide(index);
            }

        }

        const prepareCurrentSlide = ind => {
            activeSlide(ind);
            activeDot(ind);
        }

        dots.forEach((item, indexDot) => {
            item.addEventListener('click', () => {
                index = indexDot;
                prepareCurrentSlide(index);
            })
        })

        const interval = setInterval(nextSlide, 5000);

    }

    loadCoffee(catalog) {
        let catalog_content = '';

        catalog.forEach(coffee => {
            if(coffee.type == "coffee"){
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

    loadTea(catalog) {
        let catalog_content = '';

        catalog.forEach(tea => {
            if(tea.type == "tea"){
                catalog_content += `
                <div class="product-block">
                    <a class="product-block__image" href="#product/${tea.url}">
                        <img src="${tea.image}" alt="image">
                    </a>
                    <div class="product-block__description">
                        <div class="product-block__title-row">
                            <a class="product-block__title-text">${tea.title}</a>
                        </div>
                        <div class="product-block__price-row">
                            <div class="product-block__price-block">
                                <div>
                                    <span class="product-block__price">${tea.price}</span>
                                    <span class="product-block__currency">грн</span>
                                </div>
                            </div>
                            <a class="product-block__btn-wrap" href="#cart/${tea.url}">
                                <button type="button" class="product-block__cart-button">В корзину</button>
                            </a>
                        </div>
                    </div>
                </div>`;
            }
            
        });

        return catalog_content;
    }

    loadDessert(catalog) {
        let catalog_content = '';

        catalog.forEach(dessert => {
            if(dessert.type == "dessert"){
                catalog_content += `
                <div class="product-block">
                    <a class="product-block__image" href="#product/${dessert.url}">
                        <img src="${dessert.image}" alt="image">
                    </a>
                    <div class="product-block__description">
                        <div class="product-block__title-row">
                            <a class="product-block__title-text">${dessert.title}</a>
                        </div>
                        <div class="product-block__price-row">
                            <div class="product-block__price-block">
                                <div>
                                    <span class="product-block__price">${dessert.price}</span>
                                    <span class="product-block__currency">грн</span>
                                </div>
                            </div>
                            <a class="product-block__btn-wrap" href="#cart/${dessert.url}">
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