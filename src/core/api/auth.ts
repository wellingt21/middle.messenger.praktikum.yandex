import HTTPTransport from '../service/http/http-transport'

export class AuthApi extends HTTPTransport {
  auth = async (data: Record<string, string>): Promise<unknown> => {
    const url = '/auth/signin'

    return await this.post(url, { data })
  }

  create = async (data: Record<string, string>): Promise<unknown> => {
    const url = '/auth/signup'

    return await this.post(url, { data })
  }

  user = async (): Promise<unknown> => {
    const url = '/auth/user'

    return await this.get(url, {})
  }

  logout = async (): Promise<unknown> => {
    const url = '/auth/logout'

    return await this.post(url, {})
  }
}
