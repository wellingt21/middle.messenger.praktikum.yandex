import API, { AuthAPI } from '../api/auth'
import store from '../store/Store'

import {  SignupData, LoginData } from '../api/types';
import Router from "../router/Router";

export class AuthController {
  private readonly api: AuthAPI;
  private router: Router
    static fetchUser: any;

  constructor() {
    this.api = API;
    this.router = new Router("#app")
  }

  async login(data: LoginData) {
    try {
      await this.api.login(data);

      this.router.go('/profile');
    } catch (e: any) {
      console.error(e);
    }
  }

  async signup(data: SignupData) {
    try {
      await this.api.signup(data);

      await this.fetchUser();

      this.router.go('/profile');
    } catch (e: any) {
      console.error(e.message);
    }
  }

  async fetchUser() {
    const user = await this.api.read();
    store.set('user', user);
  }

  async logout() {
    try {
      await this.api.logout();

      this.router.go('/');
    } catch (e: any) {
      console.error(e.message);
    }
  }
}

export default new AuthController();
