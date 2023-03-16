export function useEnvironment() {
  const env = process.env.NODE_ENV
  const host = env === 'production' ? 'shlokas.app' : 'localhost'
  const protocol = env === 'production' ? 'https' : 'http'

  function getDatabaseUrl(login: string, password: string, database: string) {
    return `${protocol}://${login}:${password}@${host}/db/${database}`
  }

  function getTotpUrl() {
    return `${protocol}://${host}/totp/validate`
  }

  function getContentUrl() {
    return `${protocol}://${host}/content`
  }

  return {
    getTotpUrl,
    getContentUrl,
    getDatabaseUrl
  }
}