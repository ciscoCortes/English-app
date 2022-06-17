import IPAword from "./IPAword";

const Hyper_text = ({ paragraphs = [] }) => {

    let space = '9'

    return (
        <>
            {paragraphs.map((p, i) => {
                return (
                    <div key={i}>
                        {p.reduce((acc, word, i) => {
                            if (word.match(/\s/)) {
                                acc.push(word)
                            }
                            else {
                                acc.push(<IPAword key={i} word={word} />)
                            }
                            return acc
                        }, [])

                        }
                    </div>
                );
            })}
        </>
    )
}

export default Hyper_text