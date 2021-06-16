interface config {
  text: string;
}

const data: config = {
  text: 'You do You'
}

function splitSentence(sentence: string): Array<string> {
  return sentence.split('')
}

export { data }

