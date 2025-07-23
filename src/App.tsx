import { Route, Routes } from "react-router-dom";
import HomePage from '@/containers/Home/HomePage'
import GameRoomPVE from "@/containers/GameRoom/GameRoomPVE";


const App = () => {
  return (
    <>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/gamePVE' element={< GameRoomPVE />} />
      </Routes>
    </>
  )
}
export default App
