import { Route, Routes } from "react-router-dom";
import CreateQr from "./pages/CreateQr";
import ScanQr from "./pages/ScanQr";
import Image from "./pages/Hero";

export default function App() {
  return (
   <Routes>
      <Route path = '/' element = {<CreateQr />} />
      <Route path ="/scan" element = {<ScanQr />} />
      <Route path ="/image" element = {<Image />} />
   </Routes>
  )
}
