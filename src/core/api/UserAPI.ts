import BaseAPI from './BaseAPI'

export class UserAPI extends BaseAPI {
  constructor () {
    super('/user')
  }

  async updateProfile (data: UpdateProfileData) {
    return await this.http.put('/profile', { data })
  }

  async updateAvatar (data: FormData) {
    return await this.http.put('/profile/avatar', {
      data,
      file: true
    })
  }

  async updatePassword (data: UpdatePasswordData) {
    return await this.http.put('/password', { data })
  }

  async search (data: UserSearchData) {
    return await this.http.post('/search', { data })
  }

  read = undefined

  create = undefined

  update = undefined

  delete = undefined
}

export default new UserAPI()
