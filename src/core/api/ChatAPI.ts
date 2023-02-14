import BaseAPI from './BaseAPI'
export class ChatAPI extends BaseAPI {
  constructor () {
    super('/chats')
  }

  async read () {
    return await this.http.get('')
  }

  async create (data: ChatsData) {
    return await this.http.post('', { data })
  }

  async delete (data: DeleteChatData) {
    return await this.http.delete('', { data })
  }

  async addUsers (data: ChatsUsersData) {
    return await this.http.put('/users', { data })
  }

  async deleteUsers (data: ChatsUsersData) {
    return await this.http.delete('/users', { data })
  }

  async token (chatId: number) {
    return await this.http.post(`/token/${chatId}`)
  }

  async changeAvatar (data: FormData) {
    return await this.http.put('/avatar', {
      data,
      file: true
    })
  }

  update = undefined
}

export default new ChatAPI()
