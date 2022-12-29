import hbs from "handlebars"
import "normalize.css";

import Auth from "./pages/signup/signup"
import Login from "./pages/login/login"
import notFound from "./pages/404/404"

import button from "./partials/button.hbs"
import input from "./partials/input.hbs"

const pages = {
    signup: Auth,
    login: Login
}

hbs.registerPartial("button", button)
hbs.registerPartial("input", input)

const renderPage = ({template, options}) => template(options)

window.onload = () => {
    const path = window.location.pathname.replace(/\//,'')
    const some = pages[path] || notFound
    const root = document.querySelector('#app')

    root.innerHTML = renderPage(some);
};

console.log("shit on src/index.js")
