import {data} from './data'
import p5Types from "p5"

let pos = {x: 100, y:100}
let draw = (p5: p5Types) => {
  let dataImported = data
  p5.background("rgb(0%, 10%, 50%)")
  let rectangle = p5.rect(pos.x, pos.y, 100, 50)
  p5.text(dataImported.text,pos.x + pos.x/4, pos.y + pos.y/4)
}

export {draw}