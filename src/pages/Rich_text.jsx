import React, { useState } from "react";

import ownDict from "../ownDict.json"
import Hyper_text from "../components/Hyper_text"

const level_words = ['go', 'this']


const text = `
I think that the planet of

I think that the planet of the little prince is Asteroid B-612.
In 1909, one astronomer discovers this asteroid. The astronomer is from Turkey.
He speaks about his asteroid at a big conference. But nobody believes him because he has Turkish clothes. It is crazy but people do these things.

But there is something good for Asteroid B-612. A Turkish leader says that people in Turkey must have clothes like Europeans. The astronomer speaks about his asteroid again in 1920. He has very nice clothes. And now everybody believes him.

I speak about Asteroid B-612 and I speak about its number because people like numbers. When you tell people that you have a new friend, they never ask you questions about important things. They never ask you, “Is his voice nice? What games does he play? Does he have butterflies at home?”

They ask, “How old is he? How many brothers does he have? How big is he? How much money does his father have?” If they know these numbers, they think that they know this person.

If you say to the people, “I know a small red house. It has beautiful flowers in the windows. A lot of birds fly around the house,” the people can’t imagine the house. You must say to the people, “I know a big house. It is very expensive. You can buy this house for one hundred thousand dollars.” Then the people say, “It is a nice house.”

If you say to the people, “The little prince exists because he laughs and he wants a sheep,” this information is not enough for the adults. They don’t believe you. They think that you live in a dream. But if you tell them, “The planet of the little prince is Asteroid B-612,” they believe you. This is how the people think.

If you understand life, you don’t need numbers. You need to hear a nice story. You like to hear, “The little prince lives on a small planet. The planet is very small. The little prince is alone. He wants to have a friend.” If you understand life, this is what you want to hear.
`


const Text_book = ({ set_promp, set_promp_color, editText = true }) => {
  const [paragraphs, set_paras] = useState([]);
  const [_default, set_default] = useState('Start writing')
  const style = 'overflow-y-auto  outline-none p-5 w-full '
  return (
    <div className="relative">
      <div
        className={`${style} text-transparent caret-neutral-800 font-light whitespace-pre-line absolute `}
        contentEditable="true"
        onInput={(evt) => get_paragraphs(evt, set_paras)} >
        {/* {_default} */}
        {text}
        {/* <div>
          <br />
        </div> */}
      </div>
      <div
        className={`${style} ${editText && 'pointer-events-none'} border rounded shadow-sm absolute shadow-stone-400`}>
        <Hyper_text paragraphs={paragraphs} />
      </div>
    </div>
  )

  function get_paragraphs(evt, set_paras) {
    // if (evt.nativeEvent.inputType == 'insertFromPaste') {
    //   set_default(evt.target.innerText)
    // }
    let include = true
    let last = 'any string'
    const paragraphs = evt.target.innerText
      .split(/\r?\n/)
      .filter(p => {  //removing some extra blanck paragraphs.
        if (last === '') {
          if (p === '') {
            include = !include
            return include
          }
          last = p
          include = true
        }
        last = p
        return true
      })
      .map(p => {   //split words an spaces
        if (p === '') {
          return ['']
        }
        const new_arr = []
        let word = ''
        for (let i = 0; i < p.length; i++) {
          if (p[i].match(/\W/)) {
            if (word) {
              new_arr.push(word)
              word = ''
            }
            new_arr.push(p[i])
          }
          else {
            word = word + p[i]
          }
        }
        word && new_arr.push(word)
        return new_arr
      })

    give_last_word(paragraphs)
    set_paras(paragraphs)
  }

  function give_last_word(paragraphs) {
    if (paragraphs.length > 0) {
      const last_para = paragraphs[paragraphs.length - 1]
      const last_word = last_para[last_para.length - 1]
      level_words.includes(last_word) ?
        set_promp_color('text-green-900') :
        set_promp_color('text-red-900')
      set_promp(last_word)
    }
  }
}

const Rich_text = () => {
  const [promp, set_promp] = useState("");
  const [word_type, set_word_type] = useState("verbs");
  const [word_list, set_word_list] = useState([]);
  const [fresh_list, set_fresh_list] = useState([])
  const [promp_color, set_promp_color] = useState('')
  const Fresh_list = () => {
    return (
      <>
        {
          fresh_list.map(word => (
            <button
              key={word}
              onClick={() => set_fresh_list([...fresh_list.filter(w => w != word)])}
              className="capitalize hover:opacity-70" >
              {word}
            </button>
          ))
        }
      </>
    )
  }

  const Allowed_words = () => {
    return (
      <>
        <h3 className="sticky top-0 capitalize bg-white">{word_type}</h3>
        <div className="flex flex-wrap gap-2 px-5 pb-2">
          {word_list.map((word, i) => {
            return (
              <button
                key={i}
                className="w-32 p-1 text-left rounded shadow-sm shadow-stone-400 hover:text-stone-100 hover:bg-stone-400"
                onClick={() => {
                  fresh_list.length > 15
                    ? set_fresh_list([...fresh_list.slice(1, 16), word])
                    : set_fresh_list([...fresh_list, word]);
                }}
              >
                {word}
              </button>
            );
          })}
        </div>
      </>
    )
  }

  const Word_classes = () => {
    return (
      <>
        <button
          className="btn"
          onClick={() => get_words_of_type("verb", set_word_type, set_word_list)}
        >
          Verbos
        </button>
      </>
    )
    function get_words_of_type(pos) {
      set_word_type(pos + "s");
      const word_list = Object.keys(ownDict).reduce((result, word) => {
        result = ownDict[word].meanings.reduce((matches, current) => {
          current.class == pos && matches.push(word);
          return matches;
        }, result);
        return result;
      }, []);
      set_word_list(word_list);
    }
  }

  return (
    <div className="flex flex-col justify-between w-full min-h-screen">
      <main className="flex flex-col p-5 px-10 grow">
        <h2 className="text-center capitalize">
          Write what you want
        </h2>
        <div className="container flex flex-col mx-auto -mt-6 grow">
          <span className={`w-40 h-10 p-2 font-bold mb-1 ${promp_color} rounded-sm bg-stone-400`} >
            {promp}
          </span>
          <section className="flex flex-col grow">
            <div className="w-full grow" >
              <Text_book set_promp={set_promp} set_promp_color={set_promp_color} />
            </div>
            {/* <div className="flex mt-2 h-60">
              <div className="w-2/3 px-3 overflow-y-auto border">
                <Allowed_words />
              </div>
              <div className="grid items-start w-1/3 grid-cols-4 grid-rows-4 p-5 overflow-y-auto border">
                <Fresh_list />
              </div>
            </div> */}
          </section>
        </div>
      </main>
      <footer className="flex items-center py-6 text-xl bg-stone-400 justify-evenly">
        <Word_classes />
      </footer>
    </div >
  )
}


export default Rich_text;
