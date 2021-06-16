let input: string = 'A verdade vos libertará'

function buildOrSplit(phrase:string | Array<any>): string | Array<any> {
  let product: string | Array<any>
  if (typeof phrase == 'string') {
    product = phrase.split(' ')
  } else if (Array.isArray(phrase)){
    
  }
  return product
}