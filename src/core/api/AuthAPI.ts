import BaseAPI from './BaseAPI'
// import { SigninData, SignupData, User } from '../../types/interfaces';

export class AuthAPI extends BaseAPI {
  constructor () {
    super('/auth')
  }

  async signin (data: SigninData) {
    return await this.http.post('/signin', { data })
  }

  async signup (data: SignupData) {
    return await this.http.post('/signup', { data })
  }

  async read (): Promise<User> {
    return await this.http.get('/user')
  }

  async logout () {
    return await this.http.post('/logout')
  }

  create = undefined

  update = undefined

  delete = undefined
}

export default new AuthAPI()
