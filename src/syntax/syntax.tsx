// hardcoded por hora. Deve ser requisitado do usuario
let input: string = 'A verdade vos libertará logo'

// O input, que era uma unica longa string, se torna uma array,
// onde em cada index existe uma palavra
// (é um trabalho que está sendo feito separadamente
// por legibilidade)
let phrases = input.split(' ')

// o valor deve ser o index do primeiro elemento
// do segundo grupo (regras do método splice())
let razorIndex = 2

/**
 * Transforma uma array de palavras em uma array de arrays de palavras
 * ex: ['the','cow','is','conscious'], with the razor bisecting at 2, results in
 * [['the','cow'],['is','conscious']]
 * @param phraseArr 
 * @param razorPosition 
 * @returns 
 */
function bisect(phraseArr:Array<any>, razorPosition:number):Array<any>{
  let tmpArray:Array<any> = [...phraseArr]
  let rightSide:Array<string> = tmpArray.splice(razorPosition, tmpArray.length - razorPosition)
  let leftSide:Array<string> = [...tmpArray]
  phraseArr.splice(0, phraseArr.length, leftSide, rightSide)
  return phraseArr
}


//tests
if (true) {
let phrases2 = bisect(phrases, razorIndex)
console.log(phrases2)
console.log(bisect(phrases2[1], 2))
bisect(phrases2[1][0], 1)
bisect(phrases, 1)
console.log(phrases)
}
export {}