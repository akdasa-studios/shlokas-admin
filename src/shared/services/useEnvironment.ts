export function useEnvironment() {
  const env      = window.location.host === 'localhost' ? 'development' : 'production'
  const host     = env === 'production' ? 'shlokas.app' : 'localhost'
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

  function getAssetsPath(path: string) {
    const port = window.location.port
    if (port) { return path }
    return '/admin/' + path
  }

  return {
    getTotpUrl,
    getContentUrl,
    getDatabaseUrl,
    getAssetsPath
  }
}