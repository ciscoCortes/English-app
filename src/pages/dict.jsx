import { useState } from "react"

import Download_button from "../components/Download_button"
import ownDict from "../wiki_data_trans.json"
import IPAword from "../components/IPAword"
import ph_aids from '../ph_aids.json'

const phonetic_aids = {}


const Dict = () => {

  const [word, setWord] = useState('')
  const [ipa, setIpa] = useState('')
  const [index, setIndex] = useState(0)
  // const words = Object.keys(ownDict)
  const text = `
  a
  about
  adults
  after
  again
  alone
  also
  am
  and
  another
  answer
  are
  aren't
  around
  as
  ask
  asks
  asteroid
  astronomer
  at
  b-
  baobab
  baobabs
  beautiful
  because
  believe
  believes
  big
  birds
  box
  brothers
  but
  butterflies
  buy
  can
  can't
  clever
  clothes
  colour
  colours
  comes
  conference
  conversation
  correct
  crazy
  day
  difficult
  discovers
  do
  does
  dollars
  don't
  draw
  dream
  during
  earth
  eat
  eats
  elephants
  enough
  europeans
  every
  everybody
  example
  exists
  expensive
  explains
  father
  flowers
  fly
  for
  forget
  friend
  from
  funny
  games
  good
  hands
  has
  have
  he
  hear
  here
  him
  his
  home
  house
  houses
  how
  hundred
  i
  idea
  if
  imagine
  important
  in
  information
  is
  it
  its
  journey
  know
  laughs
  leader
  life
  like
  little
  live
  lives
  lot
  make
  many
  maybe
  me
  meeting
  mistake
  mistakes
  moments
  money
  more
  much
  must
  my
  need
  never
  new
  nice
  nine
  nobody
  not
  now
  number
  numbers
  of
  ok
  old
  on
  one
  paper
  past
  people
  perfect
  person
  picture
  pictures
  planet
  play
  possible
  prince
  prince's
  problem
  problems
  put
  question
  questions
  reason
  red
  sad
  say
  says
  see
  sheep
  simple
  six
  size
  slowly
  small
  so
  some
  something
  sometimes
  soon
  speak
  speaks
  stand
  start
  starts
  story
  sure
  tell
  that
  the
  them
  then
  there
  these
  they
  things
  think
  thinks
  third
  this
  thousand
  to
  too
  trees
  true
  try
  turkey
  turkish
  understand
  unfortunately
  very
  voice
  want
  wants
  well
  what
  when
  why
  windows
  with
  write
  years
  yes
  you
  young
  your
  
  `

  let words = text.split('\n')
    .map(w => w.trim())
    .filter(w => w)
    .filter(w => !(w in ph_aids))
    .filter(w => w in ownDict)

  const Phonetic_aids_editor = ({ word, ipa }) => {
    const word_arr = word.split('')
    const ipa_arr = ipa.split('')
    const [aids_arr, set_aids_arr] = useState(word_arr)
    const [aids_map, set_aids_map] = useState(word_arr.map(() => 0))
    let aid = ''

    return (
      <>
        <div className="flex gap-2">
          {
            word_arr.map((vowel, i) =>
              <button key={i}
                onClick={() => update_phonetic_aids(i)} >
                {vowel}
              </button>
            )
          }
        </div>
        <div className="flex gap-2">
          {
            ipa_arr.map((phonema, i) =>
              <button key={i}
                onClick={() => aid = aid + phonema} >
                {phonema}
              </button>
            )
          }
          <button className="absolute text-red-700 m-44 right-96"
            onClick={() => aid = 'x'} >
            X
          </button>
        </div>
        <IPAword word={word} phonetic_aids={aids_arr} aids_map={aids_map} />
        <button className="absolute px-4 py-1 text-xl rounded-md shadow-lg right-44 bottom-96 m-52 hover:bg-slate-400 bg-slate-200 active:bg-slate-800 active:text-white"
          onClick={() => get_next(index)}>
          Next
        </button>
        <button className="absolute right-0 px-4 py-1 m-32 text-xl rounded-md shadow-lg active:bg-slate-800 active:text-white mr-96 bottom-96 hover:bg-slate-400 bg-slate-200"
          onClick={() => save()}>
          Save
        </button>
      </>
    )

    function update_phonetic_aids(i) {
      const aids = [...aids_arr]
      const map = [...aids_map]
      if (aid) {
        if (aid === "ˈ") {
          map[i] === 0 ? map[i] = 2
            : map[i] === 1 ? map[i] = 3
              : map[i] = map[i]
          set_aids_map(map)
          aid = ''
        } else {
          map[i] = 1
          aids[i] = aid
          set_aids_map(map)
          set_aids_arr(aids)
          aid = ''
        }
      } else {
        aids[i] ? aids[i] = ''
          : aids[i] = word_arr[i]
        map[i] = 0
        set_aids_map(map)
        set_aids_arr(aids)
      }
    }
    function get_next(index) {
      const { phonetics, current_word } = get_phonetics(index)
      index++
      if (phonetics) {
        setIpa(phonetics)
        setWord(current_word)
        setIndex(index)
      }
      else {
        get_next(index)
      }
    }
    function get_phonetics(index) {
      if (index >= words.length) {
        return { phonetics: '--', current_word: '--FIN--' }
      }
      else {
        const current_word = words[index]
        let phonetics = ''
        const ipaDict = ownDict[current_word]['pronunciation']
        if (ipaDict) {
          'US' in ipaDict ? phonetics = ipaDict['US']
            :
            'IPA' in ipaDict ? phonetics = ipaDict['IPA']
              :
              'UK' in ipaDict && (phonetics = ipaDict['UK'])

          phonetics && (phonetics = phonetics.split(',')[0].replace(/[\/\[\]]/gi, ''))
        }

        return { phonetics, current_word }
      }
    }
    function save() {
      phonetic_aids[word] = {}
      phonetic_aids[word]['aids_arr'] = aids_arr
      phonetic_aids[word]['map'] = aids_map
    }
  }

  return (
    <div className="flex flex-col items-center justify-center gap-4 text-2xl font-bold mt-52 mr-52">
      <Phonetic_aids_editor word={word} ipa={ipa} />
      <Download_button file={phonetic_aids} file_name='phonetic_aids.json'>
        Download
      </Download_button>
    </div >
  )

}

export default Dict;
