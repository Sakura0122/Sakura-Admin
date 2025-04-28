import storage from '@/utils/storage'

const TOKEN_KEY = 'sakura_token'

function setToken(token: string) {
  return storage.set(TOKEN_KEY, token)
}

function getToken(): string {
  return storage.get(TOKEN_KEY)
}

function removeToken() {
  return storage.remove(TOKEN_KEY)
}

export { setToken, getToken, removeToken }
