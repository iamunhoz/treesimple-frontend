import {data} from './data'

let draw = (p5: any) => {
  let dataImported = data
  p5.background("rgb(0%, 10%, 50%)")
  p5.rect(100, 100, 100, 50)
  p5.text(dataImported.text, 150, 150)
}

export {draw}