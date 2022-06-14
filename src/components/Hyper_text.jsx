import IPAword from "./IPAword";

const Hyper_text = ({ paragraphs = [] }) => {
    return (
        <>
            {paragraphs.map((p, i) => {
                return (
                    <div key={i}>
                        {p.map((word, i) => {
                            return (
                                <IPAword key={i} word={word} />
                            );
                        })}
                    </div>
                );
            })}
        </>
    )
}

export default Hyper_text