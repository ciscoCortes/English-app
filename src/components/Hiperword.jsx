import React from 'react'

import words from '../ph_aids.json'
import data from '../wiki_data_trans.json'

const Hiperword = ({ word = '', phonetic_aids, aids_map, shoInfo = true, highlighted, set_highlighted }) => {

    if (!phonetic_aids) {
        const entry = word.toLocaleLowerCase()
        if (words[entry]) {
            phonetic_aids = [...words[entry].aids_arr]
            aids_map = [...words[entry].map]
        }
    }
    return (
        <div className="inline-block">
            {phonetic_aids &&
                <sub className="flex justify-between">
                    {phonetic_aids.map((e, i) => {
                        switch (aids_map[i]) {
                            case 1:  //phoneme
                                let color = 'text-green-900'
                                e === 'x' && (color = 'text-red-900')
                                return (
                                    <small className={color} key={i}>{e}</small>
                                )
                            case 2:  //accent
                                return (
                                    <span key={i}>
                                        <sub className='font-extrabold text-red-900' >'</sub>
                                        <small className='text-transparent' >{e}</small>
                                    </span>
                                )
                            case 3:  //accent + phoneme
                                return (
                                    <span key={i}>
                                        <small className='-mr-0.5 text-red-900'>'</small>
                                        <small className='text-green-900 '>{e}</small>
                                    </span>
                                )
                            default:
                                return (
                                    <small className='text-transparent mb-0.5' key={i}>{e}</small>
                                )
                        }
                    })
                    }
                </sub>
            }
            <button
                title={phonetic_aids}
                className={`font-light ${highlighted === word.toLocaleLowerCase() && 'font-medium'}`}
                onClick={() => shoInfo && showWordInfo(word)}
            >
                {word}
            </button>
        </div>
    )
    function showWordInfo() {
        set_highlighted && set_highlighted(word.toLocaleLowerCase())
        const info = data[word]['meanings'][0]['examples'][0]
        console.log(info);
    }
}

export default Hiperword