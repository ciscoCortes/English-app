import { Outlet } from "react-router-dom";


const Teacher_deck = () => {
  const words = ['this', 'that']
  return (
    <div className="flex flex-col items-center justify-center gap-4 text-2xl font-bold mt-52 mr-52">
      <Outlet words={words} />
    </div >
  )

}

export default Teacher_deck;
