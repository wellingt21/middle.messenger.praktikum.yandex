import hbs from "handlebars"
import "normalize.css";

import Auth from "./pages/signup/signup"
import Login from "./pages/login/login"
import Chat from "./pages/chat/chat"
import Profile from "./pages/profile/profile";

import notFound from "./pages/404/404"

import button from "./partials/button.hbs"
import input from "./partials/input.hbs"
import photo from "./partials/photo.hbs"

const pages = {
    signup: Auth,
    login: Login,
    chat: Chat,
    profile: Profile
}

hbs.registerPartial("button", button)
hbs.registerPartial("input", input)
hbs.registerPartial("photo", photo)

const renderPage = ({template, options}) => template(options)

window.onload = () => {
    const path = window.location.pathname.replace(/\//,'')
    const page = pages[path] || notFound
    const root = document.querySelector('#app')

    root.innerHTML = renderPage(page);
};
