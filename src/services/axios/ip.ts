export const baseURL = 'https://server-production-f58d.up.railway.app'

export type BuildUrlParameterList = Record<
  string,
  string | string[] | number | unknown | undefined | null
>

/**
 *  Constrói a URL que vai para a requisição
 *  @param endpoint - Enum Endpoint ou Endpoint
 *  @param parameterList - Objeto contendo os parâmetros que irão na URL
 *  @param idpk - (Opcional) Caso precisar informar o idpk de um registro
 */
export function buildUrl(
  endpoint: string,
  parameterList: BuildUrlParameterList
): string {
  let url = `${baseURL}/${endpoint}`

  if (Object.keys(parameterList).length) {
    url = `${url}?`

    Object.keys(parameterList).forEach((key: string) => {
      if (parameterList[key] !== undefined && parameterList[key] !== null) {
        const value = String(parameterList[key])
        url = `${url}${key}=${value}&`
      }
    })
    url = url.substring(0, url.length - 1)
  }

  return url
}
