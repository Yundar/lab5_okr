import {ShowPreLoader} from "./script.js"

export default class Router {
    constructor({orders_end_points, products_end_points, actions_end_points, cart_end_points, coffee_end_points, dessert_end_points, tea_end_points}, main){
        
        window.addEventListener('hashchange', () => this.onRouteChange());

        this.end_points = {
            "home": '',
            "cart": cart_end_points,
            "actions": actions_end_points,
            "product": products_end_points,
            "coffee": coffee_end_points,
            "dessert": dessert_end_points, 
            "tea": tea_end_points,
            "order": orders_end_points
        }
        
        this.main = main;

        if (window.location.hash){
            this.loadHome();
        }
    }

    onRouteChange() {

        window.scrollTo({
            left:0,
            top:0,
            behavior: 'smooth'
        });

        const fullRoute = window.location.hash.substring(1);
        const splitedHash = fullRoute.split('/');

        let route;
        let hash;

        if (splitedHash.length == 2){
            route = splitedHash[0];
            hash = splitedHash[1];

            if (!this.loadContent(route, hash))
                this.loadHome();
        }

        else if (splitedHash.length == 1) {
            route = splitedHash[0];

            if (!this.loadContent(route))
                this.loadHome();
        }
        else {
            this.loadHome();
        }
    }

    loadContent(route, hash=null) {
        if (route in this.end_points) {
            if (hash != null && this.end_points[route].includes(hash)) {
                this.main.loadByHash(route, hash);
                return true;
            }
            else if (hash == null){
                this.main.loadByHash(route);
                return true;
            }
        }
        return false;
        
    }

    loadHome(){
        history.pushState(null, null, '#home');
        this.main.loadDefaultPage();
    }
}