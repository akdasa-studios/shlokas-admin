export function useEnvironment() {
  const env = process.env.NODE_ENV
  const host = env === 'production' ? 'shlokas.app' : 'localhost'
  const protocol = env === 'production' ? 'https' : 'http'

  function getTotpUrl() {
    return `${protocol}://${host}/totp/validate`
  }

  function getContentUrl() {
    return `${protocol}://${host}/content`
  }

  return {
    getTotpUrl,
    getContentUrl
  }
}