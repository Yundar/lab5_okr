import {getData, sendRequest} from "./script.js"

export default class Order {
    constructor(cart){
        this.route = "order";

        this.cart = cart
    }

    loadPage(subHash){
        if (subHash == null){
            this.loadValidation();
        }
        else {
            this.loadOrder(subHash);
        }
        return true;
    }
    
    loadValidation(){
        const page = document.getElementById("content");

        page.innerHTML = `
            <div class="validation">
                <p class="validation-top">Введение данных покупателя</p>
                <form id="valid-form">
                    <div>
                        <label for="name">Имя</label>
                        <input type="text" name="name" id="name" placeholder="Ваше имя" min="2" required>
                    </div>
                    <div>
                        <label for="surname">Фамилия</label>
                        <input type="text" name="surname" id="surname" placeholder="Вашa фамилия" min="2" required>
                    </div>
                    <div>
                        <label for="email">Email</label>
                        <input type="email" name="email" id="email" placeholder="Ваша почта" required>
                    </div>
                    <div>
                        <label for="mobile">Номер телефона</label>
                        <input type="tel" name="mobile" id="mobile" pattern="^\\+?3?8?(0\\d{9})$" placeholder="Ваш номер телефона" minlength="10" maxlength="13" required>
                    </div>
                    <button type="submit">Подтвердить</button>
                    <button id="reset" type="reset">Очистить</button>
                </form>
            </div>
        `


        let form = document.getElementById("valid-form");

        form.addEventListener('submit', e => {
            e.preventDefault();

            let clientInformation = {
                name: form.elements.namedItem('name').value,
                surname: form.elements.namedItem('surname').value,
                email: form.elements.namedItem('email').value,
                tel: form.elements.namedItem('mobile').value,
            };

            let clientOrder = JSON.parse(localStorage.getItem("cart"));

            let clientData = {clientInformation, clientOrder};

            sendRequest('POST', "https://my-json-server.typicode.com/Yundar/lab4_okr/orders", JSON.stringify(clientData))
                .then( data => {    
                    this.loadOrder(data.id, clientInformation);
                    
                })
                .catch((error) => {
                    console.log(error);
                    this.showError();
                });

            
        });
    }

    loadOrder(subHash, clientInformation) {
        history.pushState(null, null, '#order/' + subHash)
        const page = document.getElementById("content");
        page.innerHTML = `
            <p class="order-top">Мы готовим ваш заказ </p>
            <div class="order">
                <span class="head">Ваши данные:</span>   
                <div class="info-item">               
                    <div class="item">
                        <p class="left">Имя</p> 
                        <span></span> 
                        <p class="right">${clientInformation.name}</p>   
                    </div>
                    <div class="item">
                        <p class="left">Фамилия</p> 
                        <span></span> 
                        <p class="right">${clientInformation.surname}</p>   
                    </div>
                    <div  class="item">
                        <p class="left">Телефон</p> 
                        <span></span> 
                        <p class="right">${clientInformation.tel}</p>   
                    </div>
                    <div  class="item">
                        <p class="left">email</p> 
                        <span></span> 
                        <p class="right">${clientInformation.email}</p>   
                    </div>
                </div>
                <div class="head">
                    <span class="left">Статус заказа</span>
                    <span></span> 
                    <span class="right">Подготавливается</span>
                </div>       
            </div>
        `;
        this.cart.clearCart()

    }


    showError(){
        document.getElementById("content").innerHTML = `
        <div role="alert">
            Some problems with the server. Sorry
        </div>
        `
    }
}