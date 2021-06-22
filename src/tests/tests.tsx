


/* const levelsArray = [
  ["Hello Darkness my old friend"],
  [ "Hello Darkness", "my old friend" ]
]

function bisect(array: any[], indexRazor:number) {

  let tmpString: string = array[array.length-1][0]
  let tmpArray: string[] = tmpString.split(' ')


  array.push([
    tmpArray.slice(0, indexRazor).join(' '),
    tmpArray.slice(indexRazor).join(' ')
  ])
}


bisect(levelsArray, 2)

console.log(levelsArray) */







/* <!-- begin snippet: js hide: false console: false babel: null -->

<!-- language: lang-css -->

    .diag {
        background: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' version='1.1' preserveAspectRatio='none' viewBox='0 0 100 100'><path d='M1 0 L0 1 L99 100 L100 99' fill='black' /><path d='M0 99 L99 0 L100 1 L1 100' fill='black' /></svg>");
        background-repeat:no-repeat;
        background-position:center center;
        background-size: 100% 100%, auto;
    }

<!-- language: lang-html -->

    <div class="diag" style="width: 300px; height: 100px;"></div>

<!-- end snippet --> */





























/* const appState = {
  levels: 0,
  phrases: [
    ['hello Darkness my old friend']
  ]
}

const levelsLooper = []
for (let i = 0; i <= appState.levels; i++){
  levelsLooper.push(i)
}
//console.log(levelsLooper)
levelsLooper.map(segment => {
  console.log("appState.phrases[segment] is: ",appState.phrases[segment])
  if (typeof appState.phrases[segment] !== 'undefined') {
    //console.log(" 'if (appState.phrases[segment])' passed")
    appState.phrases[segment].map((phrase, index) => {
     // console.log("  inside second map()", phrase, index)
          
    })
  }
})

*/

export{}