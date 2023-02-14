import Block from './Block'

type BlockConstructable<P extends Record<string, unknown> = any> = new (props: P) => Block<P>

function isEqual (lhs: string, rhs: string): boolean {
  return lhs === rhs
}

function render (query: string, block: Block) {
  const root = document.querySelector(query)

  if (root === null) {
    throw new Error(`root not found by selector "${query}"`)
  }

  root.innerHTML = ''

  root.append(block.getContent()!)

  return root
}

class Route {
  private block: Block | null = null

  constructor (
    private readonly pathname: string,
    private readonly blockClass: BlockConstructable,
    private readonly query: string
  ) {}

  leave () {
    this.block = null
  }

  match (pathname: string) {
    return isEqual(pathname, this.pathname)
  }

  render () {
    if (this.block == null) {
      this.block = new this.blockClass({})

      render(this.query, this.block)
    }
  }
}

class Router {
  private static __instance: Router

  private readonly routes: Route[] = []

  private currentRoute: Route | null = null

  private readonly history = window.history

  private readonly location = window.location

  constructor (private readonly rootQuery: string) {
    if (Router.__instance) {
      return Router.__instance
    }

    this.routes = []

    Router.__instance = this
  }

  public use (pathname: string, block: BlockConstructable) {
    const route = new Route(pathname, block, this.rootQuery)
    this.routes.push(route)

    return this
  }

  public start () {
    window.onpopstate = (event: PopStateEvent) => {
      const target = event.currentTarget as Window

      this._onRoute(target.location.pathname)
    }

    this._onRoute(window.location.pathname)
  }

  private _onRoute (pathname: string) {
    const route = this.getRoute(pathname)

    if (route == null) {
      return
    }

    if ((this.currentRoute != null) && this.currentRoute !== route) {
      this.currentRoute.leave()
    }

    this.currentRoute = route

    route.render()
  }

  public go (pathname: string) {
    this.history.pushState({}, '', pathname)

    this._onRoute(pathname)
  }

  public back () {
    this.history.back()
  }

  public forward () {
    this.history.forward()
  }

  private getRoute (pathname: string) {
    return this.routes.find((route) => route.match(pathname))
  }

  public getHash (): string {
    return this.location.hash.slice(1)
  }
}

export default new Router('#app')
