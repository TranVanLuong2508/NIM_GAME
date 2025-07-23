import { Route, Routes } from "react-router-dom";
import HomePage from '@/containers/Home/HomePage'
import NimGame3D from "@/3d/scenes/NimGame3D";


const App = () => {
  return (
    <>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/gamePVE' element={< NimGame3D />} />
      </Routes>
    </>
  )
}
export default App
