
const Colors = () => {
    return (
        <div className="absolute bottom-5 left-5">
            <button className="p-3 m-2 text-xl text-white border bg-stone-400">
                gray stone-400
            </button>
            <button className="p-3 m-2 text-xl text-white bg-green-900 border">
                green green-900
            </button>
            <button className="p-3 m-2 text-xl text-white border bg-neutral-800">
                black neutral-800
            </button>
            <button className="p-3 m-2 text-xl border bg-stone-100">
                cloud stone-100
            </button>
            <button className="p-3 m-2 text-xl text-white bg-red-900 border">
                red red-900
            </button>
            <button className="p-3 m-2 text-xl text-white border bg-amber-500">
                orange amber-500
            </button>
            <button className="p-3 m-2 text-xl text-white bg-blue-400 border">
                blue blue-400
            </button>
        </div>
    )
}

const Develop = () => (
    <>
        <Colors />
    </>
)
export default Develop