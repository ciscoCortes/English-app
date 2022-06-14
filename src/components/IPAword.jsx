import React from 'react'

import words from '../phonetic_aids.json'

// classes = {
//     'article': 'artículo',
//     'preposition': 'preposición',
//     'adverb': 'adverbio',
//     'adjective': 'adjetivo',
//     'noun': 'sustantivo',
//     'conjunction': 'conjunción',
//     'determiner': 'adjetivo',
//     'pronoun': 'pronombre',
//     'verb': 'verbo',
//     'proper noun': 'sustantivo',
//     'numeral': 'sustantivo'
// }


const IPAword = ({ word = '',
    // phonetic_aids, 
    // aids_map, 
    shoInfo, className = '' }) => {

    const entry = word.toLocaleLowerCase()
    let phonetic_aids = []
    let aids_map = []
    if (words[entry]) {
        phonetic_aids = [...words[entry].phDict]
        aids_map = [...words[entry].map]
    }

    return (
        <div className="inline-block -mb-1 font-bold">
            {phonetic_aids &&
                <sub className="flex justify-between">
                    {phonetic_aids.map((e, i) => {
                        switch (aids_map[i]) {
                            case 1:
                                let color = 'text-green-900'
                                e === 'x' && (color = 'text-red-900')
                                return (
                                    <small className={color} key={i}>{e}</small>
                                )
                            case 2:
                                return (
                                    <span key={i}>
                                        <small className='font-bold text-red-900' >'</small>
                                        <small className='text-transparent' >{e}</small>
                                    </span>
                                )
                            case 3:
                                return (
                                    <span key={i}>
                                        <small className='-mr-0.5 font-bold text-red-900'>'</small>
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
                </sub>}
            <button
                className={`px-0.5 font-light ${className}`}
                onClick={() => shoInfo && showWordInfo()} >
                {word}</button>
        </div >
    )
    function showWordInfo() {
        console.log(word);
        return undefined
    }
}

export default IPAword