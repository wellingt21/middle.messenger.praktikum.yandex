import Route from './route';
import Block from "../Block";

import ChatPage from "../../pages/chat/chat"
import EditPage from "../../pages/edit/edit"
import FixPage from "../../pages/fix/fix"
import LoginPage from '../../pages/login/login'
import NotFoundPage from '../../pages/notfound/notfound'
import ProfilePage from "../../pages/profile/profile"
import SignupPage from "../../pages/signup/signup"

export type BlockType = typeof FixPage | typeof LoginPage | typeof EditPage | typeof NotFoundPage | typeof SignupPage
  | typeof ChatPage | typeof Block | typeof ProfilePage

export interface UseMethodType {
  pathname: string
  block: BlockType
}

export type BlockConstructable<P extends Record<string, any> = any> = new(props: P) => Block<P>

export default class Router {
  private static __instance: Router
  private readonly routes: Route[] = []
  private currentRoute: Route | null = null
  private readonly history = window.history

  constructor(private readonly rootQuery: string) {
    if (Router.__instance) {
      return Router.__instance
    }

    this.routes = []

    Router.__instance = this
  }

  use(args: UseMethodType): Router {
    const { pathname, block } = args
    const route = new Route(pathname, block, this.rootQuery)
    this.routes.push(route)

    return this;
  }

  start(): void {
    window.onpopstate = (event: PopStateEvent) => {
      const target = event.currentTarget as Window

      this._onRoute(target.location.pathname)
    };

    this._onRoute(window.location.pathname)
  }

  private _onRoute(pathname: string, props?: Record<string, any>): void {
    const route = this.getRoute(pathname)

    if (!route) {
      return;
    }

    if (this.currentRoute && this.currentRoute !== route) {
      this.currentRoute.leave()
    }

    this.currentRoute = route

    route.render(props)
  }

  go(pathname: string, props?: Record<string, any>): void {
    this.history.pushState({}, '', pathname)

    this._onRoute(pathname, props)
  }

  back(): void {
    this.history.back()
  }

  forward(): void {
    this.history.forward()
  }

  private getRoute(pathname: string): Route | undefined {
    return this.routes.find(route => route.match(pathname))
  }
}
