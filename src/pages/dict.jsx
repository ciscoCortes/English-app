import { useState } from "react"
import ownDict from "../ownDict.json"
import dictData from "../dictList.json"
import dicText from "../dictText.json"
import IPAword from "../components/IPAword"

const phonetic_aids = {}
function Dict() {

  const [word, setWord] = useState('')
  const [ipa, setIpa] = useState('')
  const [index, setIndex] = useState(0)
  const words = Object.keys(ownDict)

  function next() {
    if (index == words.length) {
      setWord('---FIN---')
      setIpa('')
    }
    else {
      const current = words[index]
      setWord(current)

      let a = ''
      const ipaDict = ownDict[current]['pronunciation']

      if ('US' in ipaDict) {
        a = ipaDict['US']
        a.length > 1 && (a = a.split(',')[0])
        let regex = /\//gi
        a = a.replace(regex, '')
        regex = /[\[\]]/gi
        a = a.replace(regex, '')
      }
      else if ('IPA' in ipaDict) {
        a = ipaDict['IPA']
        a.length > 1 && (a = a.split(',')[0])
        let regex = /\//gi
        a = a.replace(regex, '')
        regex = /[\[\]]/gi
        a = a.replace(regex, '')
      }
      else if ('UK' in ipaDict) {
        a = ipaDict['UK']
        a.length > 1 && (a = a.split(',')[0])
        let regex = /\//gi
        a = a.replace(regex, '')
        regex = /[\[\]]/gi
        a = a.replace(regex, '')
      }
      else {
        a = 'NO IPA'
      }
      setIpa(a)
      setIndex(index + 1)
    }
  }


  return (
    <div className="flex flex-col items-center justify-center gap-4 text-2xl font-bold mt-52 mr-52">
      <Work wordSpell={word} ipaSpell={ipa} />
      <button className="absolute px-4 py-1 text-xl rounded-md shadow-lg right-44 bottom-96 m-52 hover:bg-slate-400 bg-slate-200 active:bg-slate-800 active:text-white"
        onClick={() => next()}>
        Next
      </button>
      <button className="absolute bottom-0 right-0 px-4 py-1 text-xl rounded-md shadow-lg m-52 hover:bg-slate-400 bg-slate-200"
        onClick={() => download(phonetic_aids, 'phonetic_aids.json', 'text/plain')}>
        Download
      </button>



      <div className="absolute bottom-5 left-5">
        <button className="p-3 m-2 text-xl text-white border bg-stone-400">
          gray bg-stone-400
        </button>
        <button className="p-3 m-2 text-xl text-white bg-green-900 border">
          green bg-green-900
        </button>
        <button className="p-3 m-2 text-xl text-white border bg-neutral-800">
          black bg-neutral-800
        </button>
        <button className="p-3 m-2 text-xl border bg-stone-100">
          cloud bg-stone-100
        </button>
        <button className="p-3 m-2 text-xl text-white bg-red-900 border">
          red bg-red-900
        </button>
        <button className="p-3 m-2 text-xl text-white border bg-amber-500">
          orange bg-amber-500
        </button>
        <button className="p-3 m-2 text-xl text-white bg-blue-400 border">
          blue bg-blue-400
        </button>
      </div>
    </div >
  )


  function Work({ wordSpell, ipaSpell }) {

    const word = wordSpell
    const ipa = ipaSpell
    const arr = []
    const arripa = []
    const [ph, setPh] = useState('')

    for (let i = 0; i < word.length; i++) {
      arr.push(word[i])
    }
    for (let i = 0; i < ipa.length; i++) {
      arripa.push(ipa[i])
    }

    const [phDict, setPhDict] = useState(arr)
    const [phMap, setMap] = useState(arr.map(() => 0))

    return (
      <>
        <div className="flex gap-2">
          {
            arr.map((e, i) => {
              return (
                <button key={i}
                  onClick={() => {
                    const ar = [...phDict]
                    const mp = [...phMap]
                    if (ph === '') {
                      ar[i] === ' ' ?
                        ar[i] = arr[i] :
                        ar[i] = ' '
                      mp[i] = 0
                      setMap(mp)
                      setPhDict(ar)
                    }
                    else if (ph === "ˈ") {
                      mp[i] === 0 ?
                        mp[i] = 2 :
                        mp[i] === 1 ?
                          mp[i] = 3 : mp[i] = mp[i]
                      setMap(mp)
                      setPh('')
                    }
                    else {

                      mp[i] = 1
                      ar[i] = ph
                      setMap(mp)
                      setPhDict(ar)
                      setPh('')
                    }
                  }}
                >{e}</button>
              )
            })
          }
        </div>
        <div className="flex gap-2">
          {
            arripa.map((e, i) => {
              return (
                <button key={e + i}
                  onClick={() => setPh(ph + e)}
                >{e}</button>
              )
            })
          }
          <button
            className="absolute text-red-700 m-44 right-96"
            key={'x'}
            onClick={() => setPh('x')}
          >X</button>
        </div>
        <IPAword word={word} phonetic_aids={phDict} aids_map={phMap} />
        <button className="absolute right-0 px-4 py-1 m-32 text-xl rounded-md shadow-lg active:bg-slate-800 active:text-white mr-96 bottom-96 hover:bg-slate-400 bg-slate-200"
          onClick={() => save()}>
          Save
        </button>
      </>
    )

    function save() {
      phonetic_aids[word] = {}
      phonetic_aids[word]['phDict'] = phDict
      phonetic_aids[word]['map'] = phMap
    }
  }


  function download(content, fileName, contentType) {
    var a = document.createElement("a");
    var file = new Blob([JSON.stringify(content)], { type: contentType });
    a.href = URL.createObjectURL(file);
    a.download = fileName;
    a.click();
  }
  // const look = ['ˈ', 'ɒ', 'ə']
  // const arr = []
  // let accent = null
  // for (let i = 0; i < str.length; i++) {j
  //   arr.push(str[i])
  // }
  // return (
  //   <div className="flex items-center justify-center text-xl ">
  //     <button >
  //       <sub className="flex justify-center -mb-0.5 gap">
  //         {
  //           phDict.map((e, i) => {
  //             let color = ''
  //             let lg = ''
  //             phMap[i] == 1 ?
  //               e == "ˈ" ?
  //                 color = 'text-red-900 -mr-1 font-bold mt-1' :
  //                 color = 'text-green-900' :
  //               color = 'text-transparent'
  //             e == "ˈ" ? e = "'" : e = e
  //             return (
  //               <span className={color} key={i}>{e}</span>
  //             )
  //           }
  //           )
  //         }
  //       </sub>
  //       <div className="">{word}</div>
  //     </button>
  //   </div>
  // )


  // HERRAMIENTA PARA DESCARTAR PALABRAS QUE NO DEBEN IR EN EL DICCIONARIO
  // const [trash, setTrash] = useState([])

  // return (
  //   <div className="grid grid-cols-2 gap-4 p-10 col ">
  //     <div className="grid grid-cols-6 gap-1 max-w-max">
  //       {dicText.map((word, i) => {
  //         return (
  //           <button
  //             key={i}
  //             className="p-1 border rounded-md bg-slate-300 hover:bg-slate-400 active:text-white"
  //             onClick={() => setTrash([...trash, word])}>
  //             {word}
  //           </button>
  //         )
  //       })}
  //     </div>
  //     <p className="p-10 text-lg bg-sky-200">
  //       {trash.map((word, i) => {
  //         return (
  //           `${word} `
  //         )
  //       })}
  //     </p>
  //   </div>
  // )

  // HERRAMIENTA PARA ELEGIR CONTENIDO DEL DICCIONARIO 


  // const dataToShow = {};
  // for (const word in dictData) {
  //   const trans = dictData[word].sentences[0].trans;
  //   if (dictData[word].dict) {
  //     const dictList = dictData[word].dict.map(({ pos, terms }) => {
  //       return { pos, terms };
  //     });
  //     dictList ? dataToShow[word] = [...dictList] : dataToShow[word] = [trans]
  //   }
  // }

  // const newDict = JSON.parse(JSON.stringify(dataToShow))
  // for (let key in newDict) {
  //   newDict[key] = newDict[key].map(array => {
  //     array.terms = []
  //     return array
  //   })
  // }

  // return (
  //   <div className="p-10 ">
  //     {Object.keys(dataToShow).map((word, i) => {
  //       return (
  //         <div key={i} className="m-1 border rounded-md">
  //           <div className="flex items-baseline gap-5 p-3 bg-slate-200">
  //             <h2>{word}</h2>
  //           </div>
  //           <div className="grid grid-cols-2">
  //             {dataToShow[word] &&

  //               dataToShow[word].map(({ pos, terms }, i) => {
  //                 return (
  //                   <div
  //                     key={i}
  //                     className="p-1 border-t border-l ">
  //                     <h3 className="pb-1 pl-1 opacity-80">{pos}</h3>
  //                     {terms.map((term, i) => {
  //                       if (i < 6) {
  //                         return (
  //                           <div
  //                             key={i}
  //                             className="pl-3 opacity-80">
  //                             <button
  //                               onClick={() => addTerm(word, pos, term)}
  //                               className={`border p-1 rounded m-1 bg-neutral-200 hover:bg-neutral-300 active:text-lg `}>
  //                               {term}
  //                             </button>
  //                             <br></br>
  //                           </div>
  //                         );
  //                       }
  //                     })}
  //                   </div>
  //                 );
  //               })}
  //           </div>
  //         </div>
  //       );
  //     })}
  //     <button className="p-3 text-lg border bg-fuchsia-400"
  //       onClick={() => download(newDict, 'dict_1.json', 'text/plain')}>
  //       save
  //     </button>
  //   </div >
  // );
  // function addTerm(word, currentPos, term) {
  //   setOpcity('opacity-20')
  //   newDict[word] = newDict[word].map(({ pos, terms }) => {
  //     if (pos === currentPos) {
  //       terms = [...terms, term]
  //       return { pos, terms }
  //     }
  //     return { pos, terms }
  //   })
  // }

  // function download(content, fileName, contentType) {
  //   var a = document.createElement("a");
  //   var file = new Blob([JSON.stringify(content)], { type: contentType });
  //   a.href = URL.createObjectURL(file);
  //   a.download = fileName;
  //   a.click();
  // }

}

export default Dict;
