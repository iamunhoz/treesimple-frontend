export enum LocalStorageKey {
  accessToken = 'accessToken'
}

export class LocalStorage {
  /** Seta valor para qualquer chave informada, podendo a chave ser inválida */
  static unsafeSet(key: string, value: unknown): void {
    if (typeof value === 'string') {
      localStorage.setItem(key, value)
    } else {
      localStorage.setItem(key, JSON.stringify(value))
    }
  }

  /** Garante que estamos setando uma chave que já foi mapeada */
  static set(key: LocalStorageKey, value: unknown): void {
    this.unsafeSet(key, value)
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  static get(key: LocalStorageKey): any {
    const value = localStorage.getItem(key)

    if (!value) return null

    try {
      const parsed = JSON.parse(value)
      return parsed
    } catch (err) {
      return value
    }
  }

  static remove(key: LocalStorageKey): void {
    localStorage.removeItem(key)
  }

  // accessToken
  static get accessToken(): string {
    return this.get(LocalStorageKey.accessToken) || ''
  }

  static set accessToken(value: string) {
    this.set(LocalStorageKey.accessToken, value)
  }
}
