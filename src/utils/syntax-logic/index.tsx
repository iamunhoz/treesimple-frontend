import { Phrase } from 'types/PhraseTypes'

export default function useSyntaxLogic() {
  /* */
}

// sentença digitada pelo usuario é salvo em algum lugar
export const phrase = 'Eu lavo carro azul'
export const parentId = null
export const role = 'sentence'

//botão 'start building' é clicado
export const sentence = new Phrase({ phrase, parentId, role })

// array de phrases que se relacionam entre si via id
const phraseArray: (Phrase | undefined)[] = []

// adição do primeiro sintagma, a sentença
phraseArray.push(sentence)

//definir o que é head ou tail é uma ação humana
// ação: foi clicado no espaço entre palavras para dividir esq-head, dir-tail
sentence.setHead('Eu')
phraseArray.push(sentence.getHead())

sentence.setTail('lavo carro azul')
phraseArray.push(sentence.getTail())

sentence.childTail?.setHead('lavo')
sentence.childTail?.setTail('carro azul')

/*
desse jeito, não vou conseguir fazer a recursividade acontecer programaticamente.
*/
