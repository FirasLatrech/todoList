export const getTokens = () => {
  return {
    access_token: localStorage.getItem('access_token') || null,
    refresh_token: localStorage.getItem('refresh_token') || null,
  }
}

export const setTokens = (access_token: string, refresh_token?: string | null) => {
  localStorage.setItem('access_token', access_token)
  if (refresh_token) {
    localStorage.setItem('refresh_token', refresh_token)
  }
}

export const clearTokens = () => {
  localStorage.removeItem('access_token')
  localStorage.removeItem('refresh_token')
}
