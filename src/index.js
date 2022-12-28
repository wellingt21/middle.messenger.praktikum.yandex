// import { router } from "./pages/router";
// import svgSprites from "./layouts/svg-sprites.hbs";


import Auth from "./pages/auth/auth.js"
import Login from "./pages/login/login"

// import "./partials";

const router = [Auth, Login]
const root = document.querySelector('#app')

const renderPage = ({template, state}) => template(state)

window.onload = () => {
    const path = window.location.pathname;
    console.log(`path is ${path}`);

    const page =
        router.find((route) => route.path === path) ||
        router.find((route) => route.path === "*");
    // console.log(`page: ${JSON.stringify(page)}`)
    // const component = new Render(page);renderPage
    root.innerHTML = renderPage(page);
};

console.log("shit on src/index.js")
