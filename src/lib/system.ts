export function isLoggedInFn(jwt: string | undefined) {
  if (!jwt) return false

  // should make a api request to see whether jwt is still valid
  return !!jwt.length
}
