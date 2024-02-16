/**
 * returns str "xrem"
 */

function calculateVariableFactor(strSize: number) {
  const Amin = 100
  const Amax = 1
  const Bmin = 1.1
  const Bmax = 1.5

  const slope = (Bmax - Bmin) / (Amax - Amin)

  return (strSize - Amin) * slope + Bmin
}

export function getWidthFromCharLength(str: string) {
  return str.length * calculateVariableFactor(str.length)
}
