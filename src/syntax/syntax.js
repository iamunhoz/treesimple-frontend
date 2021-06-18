var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
// hardcoded por hora. Deve ser requisitado do usuario
var input = 'A verdade vos libertará logo';
//O input, que era uma unica longa string, se torna uma array, onde em cada index existe uma palavra
// é um trabalho que está sendo feito separadamente por legibilidade
var phrases = input.split(' ');
// o valor deve ser o index do primeiro elemento do segundo grupo (regras do método splice())
var razorIndex = 2;
/**
 * Transforma uma array de palavras em uma array de arrays de palavras
 * ex: ['the','cow','is','conscious'], with the razor bisecting at 2, results in
 * [['the','cow'],['is','conscious']]
 * @param phraseArr
 * @param razorPosition
 * @returns
 */
function bisect(phraseArr, razorPosition) {
    var tmpArray = __spreadArray([], phraseArr);
    var rightSide = tmpArray.splice(razorPosition, tmpArray.length - razorPosition);
    var leftSide = __spreadArray([], tmpArray);
    phraseArr.splice(0, -1, [leftSide, rightSide]);
    return phraseArr;
}
console.log(bisect(phrases, razorIndex));
function buildOrSplit(phrase) {
    var product;
    if (typeof phrase == 'string') {
        product = phrase.split(' ');
    }
    else if (Array.isArray(phrase)) {
    }
    return product;
}
