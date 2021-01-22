export default class Main {
    constructor(home, pages){
        this.home = home;
        this.pages = pages;
    }

    loadDefaultPage(){
        this.home.loadHome();
    }

    getPage(route) {
        for (let i = 0; i < this.pages.length; i++) {
            if (route == this.pages[i].route){
                return this.pages[i];
            }
        }
    }

    loadCart(){
        let page = this.getPage("cart");
        page.loadCart();
    }

    loadByHash(route, hash = null){
        let page = this.getPage(route);
        if(!page.loadPage(hash))
            this.loadDefaultPage();
    }

}