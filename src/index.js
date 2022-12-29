import hbs from "handlebars"
import "normalize.css";

import Auth from "./pages/signup/signup"
import Login from "./pages/signin/login"
import notFound from "./pages/404/404"

import button from "./partials/button.hbs"
import input from "./partials/input.hbs"

const router = [Auth, Login, notFound]
const root = document.querySelector('#app')

hbs.registerPartial("button", button)
hbs.registerPartial("input", input)

const renderPage = ({template, options}) => template(options)

window.onload = () => {
    const path = window.location.pathname;
    console.log(`path is ${path}`);

    const page = router.find((route) => route.path === path) || notFound

    root.innerHTML = renderPage(page);
};

console.log("shit on src/index.js")
