import React, { useState } from "react";

import ownDict from "../ownDict.json"
import Hyper_text from "../components/Hyper_text"


const level_words = ['word', 'this', 'also']

const Text_book = ({ set_promp, set_promp_color }) => {
  const [paragraphs, set_paras] = useState([]);
  return (
    <>
      <div
        className="p-5 m-1 overflow-y-auto border rounded shadow-sm outline-none h-ful shadow-stone-400"
        contentEditable="true"
        onInput={(e) => get_paragraphs(e, set_paras)} >
      </div>
      <div className="p-5 m-1 overflow-y-auto border rounded shadow-sm outline-none h-ful shadow-stone-400">
        <Hyper_text paragraphs={paragraphs} />
      </div>
    </>
  )

  function get_paragraphs(e, set_paras) {
    const paragraphs = e.target.innerHTML
      .replace(/<br>|<div>/gi, '')
      .replace(/ /gi, '~')
      .replace(/&nbsp;/gi, ' ')
      .split('</div>')
      .filter(element => element != [""])
      .map(element => element.split("~"))
    set_paras(paragraphs)
    give_last_word(paragraphs)
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
    <div className="flex flex-col justify-between w-full h-screen">
      <main className="flex flex-col p-5 px-10 grow">
        <h2 className="text-center capitalize">
          Write what you want
        </h2>
        <div className="container flex flex-col mx-auto -mt-6 grow">
          <span className={`w-40 h-10 p-2 font-bold mb-1 ${promp_color} rounded-sm bg-stone-400`} >
            {promp}
          </span>
          <section className="flex flex-col grow">
            <div className="grid grid-cols-2 grow" >
              <Text_book set_promp={set_promp} set_promp_color={set_promp_color} />
            </div>
            <div className="flex mt-2 h-60">
              <div className="w-2/3 px-3 overflow-y-auto border">
                <Allowed_words />
              </div>
              <div className="grid items-start w-1/3 grid-cols-4 grid-rows-4 p-5 overflow-y-auto border">
                <Fresh_list />
              </div>
            </div>
          </section>
        </div>
      </main>
      <footer className="flex items-center py-6 text-xl bg-stone-400 justify-evenly">
        <Word_classes />
      </footer>
    </div>
  );
};


export default Rich_text;
