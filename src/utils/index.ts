/* eslint-disable @typescript-eslint/no-explicit-any */
export function classNames(...classes: unknown[]): string {
  return classes.filter(Boolean).join(' ')
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function ignore(...args: any): void {
  //
}
