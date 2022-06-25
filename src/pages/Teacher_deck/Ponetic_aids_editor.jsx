import { useState } from "react"

import Download_button from "../../components/Download_button"
import ownDict from "../../wiki_data_trans.json"
import Hiperword from "../../components/Hiperword"

const phonetic_aids = {}
let index = 0
let current_aid = ''
const hidden = 0
const phoneme = 1
const accent = 2
const accent_phoneme = 3

const Phonetic_aids_editor = ({ words }) => {

    const [word, set_word] = useState('')
    const [phonetics, set_phonetics] = useState('')
    const [aids, set_aids] = useState([...word])
    const [aids_map, set_aids_map] = useState([...word].map(() => 0))

    return (
        <>
            <Hiperword word={word} phonetic_aids={aids} aids_map={aids_map} />
            <div>
                <div className="flex gap-2">
                    {
                        word.split('').map((vowel, i) =>
                            <button key={i}
                                onClick={() => update_phonetic_aids([...aids], [...aids_map], i)} >
                                {vowel}
                            </button>
                        )
                    }
                </div>
                <div className="flex gap-2">
                    {
                        phonetics.split('').map((phoneme, i) =>
                            <button key={i}
                                onClick={() => current_aid = current_aid + phoneme} >
                                {phoneme}
                            </button>
                        )
                    }
                </div>
                <button className="absolute text-red-700 m-44 right-96"
                    onClick={() => current_aid = 'x'} >
                    X
                </button>
            </div>
            <button className="absolute px-4 py-1 text-xl rounded-md shadow-lg right-44 bottom-96 m-52 hover:bg-slate-400 bg-slate-200 active:bg-slate-800 active:text-white"
                onClick={() => get_next(index)}>
                Next
            </button>
            <button className="absolute right-0 px-4 py-1 m-32 text-xl rounded-md shadow-lg active:bg-slate-800 active:text-white mr-96 bottom-96 hover:bg-slate-400 bg-slate-200"
                onClick={() => save()}>
                Save
            </button>
            <Download_button file={phonetic_aids} file_name='phonetic_aids.json'>
                Download
            </Download_button>
        </>
    )

    function update_phonetic_aids(aids, map, i) {
        if (current_aid) {
            if (current_aid === "ˈ") {
                map[i] === hidden ? map[i] = accent
                    : map[i] === phoneme ? map[i] = accent_phoneme
                        : map[i] = map[i]
                set_aids_map(map)
                current_aid = ''
            } else {
                map[i] = phoneme
                aids[i] = current_aid
                set_aids_map(map)
                set_aids(aids)
                current_aid = ''
            }
        } else {
            aids[i] ? aids[i] = ''
                : aids[i] = word[i]
            map[i] = hidden
            set_aids_map(map)
            set_aids(aids)
        }
    }

    function get_next() {
        const { phonetics, word } = get_phonetics(index)
        index++
        if (phonetics) {
            set_phonetics(phonetics)
            set_word(word)
            set_aids([...word])
            set_aids_map([...word].map(() => 0))
        }
        else {
            console.log('no phonetics avalible for: ', word)
            get_next(index)
        }
    }

    function get_phonetics(index) {
        if (index >= words.length) {
            return { phonetics: '--', word: '--FIN--' }
        }
        else {
            const word = words[index]
            let phonetics = ''
            const ipaDict = ownDict[word]['pronunciation']
            if (ipaDict) {
                'US' in ipaDict ? phonetics = ipaDict['US']
                    :
                    'IPA' in ipaDict ? phonetics = ipaDict['IPA']
                        :
                        'UK' in ipaDict && (phonetics = ipaDict['UK'])

                phonetics && (phonetics = phonetics.split(',')[0].replace(/[\/\[\]]/gi, ''))
            }

            return { phonetics, word }
        }
    }

    function save() {
        phonetic_aids[word] = {}
        phonetic_aids[word]['aids'] = aids
        phonetic_aids[word]['map'] = aids_map
    }
}

export default Phonetic_aids_editor