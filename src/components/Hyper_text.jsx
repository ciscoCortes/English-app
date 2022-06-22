import IPAword from "./IPAword";

const Hyper_text = ({ paragraphs = [] }) => {

    return (
        <>
            {paragraphs.map((p, i) => {
                return (
                    <div key={i}>
                        {p.reduce((acc, word, i) => {
                            word.match(/\W/) ?
                                acc.push(word)
                                :
                                word ?
                                    acc.push(<IPAword key={i} word={word} />)
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