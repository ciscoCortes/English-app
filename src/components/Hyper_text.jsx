import { useState } from "react";
import Hiperword from "./Hiperword";

const Hyper_text = ({ paragraphs = [] }) => {
    const [highlighted, set_highlighted] = useState()
    paragraphs = paragraphs.map(p => p.reduce((acc, sentence) => [...acc, ' ', ...sentence], []))
    return (
        <>
            {paragraphs.map((p, i) => {
                return (
                    <div key={i}>
                        {p.reduce((acc, word, i) => {
                            word.match(/\W/) ? acc.push(word)
                                :
                                word ?
                                    acc.push(<Hiperword key={i} word={word} highlighted={highlighted} set_highlighted={set_highlighted} />)
                                    :
                                    acc.push(<br key={i} />)
                            return acc
                        }, [])}
                    </div>
                );
            })}
        </>
    )
}

export default Hyper_text