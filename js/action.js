import {getData} from "./script.js"
import {ShowPreLoader} from "./script.js"

export default class Action {
    constructor(){
        this.route = "actions";
        this.content = document.getElementById("content");
        
    }
    
    loadPage(hash){
        console.log(hash);

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
        let action = data.actions.filter(action => {
            return action.url === hash;
        }); 
        action = action[0];
        
        

        this.content.innerHTML = `
            ${this.pageHTML(action)}
        `;
    }

    pageHTML(action) {
        return `
        <div class="actions_wrapper" id="actions_content">
            <div class="actions">
                <div class="action-content">
                    <div class="action-img">
                        <img src="${action.image}">
                    </div>
                    <div class="action-description">${action.description}</div>
                </div>
            </div>
        </div>
        `;
    }
}