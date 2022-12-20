// import { router } from "./pages/router";
// import svgSprites from "./layouts/svg-sprites.hbs";


import Auth from "./pages/auth/auth.js"
// import signup from "./pages/auth/signup.hbs"

// import "./partials";

const router = [Auth]


class Render {
    constructor(component) {
        this.template = component.template;
        this.path = component.path;
        this.states = component.state || {};
    }
    render() {
        return this.template(this.states);
    }
}

window.onload = () => {
    const path = window.location.pathname;
    const page =
        router.find((route) => route.path === path) ||
        router.find((route) => route.path === "*");
    console.log(`page: ${JSON.stringify(page)}`)
    const component = new Render(page);
    console.log(component)
    console.log(component.render())
    document.getElementById("app").innerHTML = component.render();
};

console.log("shit")