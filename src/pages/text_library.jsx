import Hiper_text from '../components/Hyper_text'

const Text_library = () => {
    let p = [[['This',
        ' ',
        'is',
        ' ',
        'an',
        ' ',
        'example',
        ' ',
        'sentence',
        ',',
        ' ',
        'ok',
        '?']],
    [],
    [['And', ',', ' ', 'see', '!'],
    ['This',
        ' ',
        'is',
        ' ',
        'another',
        ' ',
        '(',
        'example',
        ' ',
        'sentence',
        ')',
        ',',
        ' ',
        'is',
        "n't",
        ' ',
        'more',
        '.']]]

    return (
        <div>
            <h1>Text_library</h1>
            <div>
                <Hiper_text paragraphs={p} />
            </div>
        </div>
    )
}

export default Text_library