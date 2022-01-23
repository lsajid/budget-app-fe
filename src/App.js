//dependencies
import { Routes, Route } from "react-router-dom";
//components
import NavBar from "./components/NavBar";
//pages
import Edit from "./pages/Edit";
// import Home from "./pages/Home";
import Index from "./pages/Index"
import New from "./pages/New";
import Show from "./pages/Show";
import Error from "./pages/Error";
//css
import './App.css';

function App() {
  return (
    <div className="back">
      <NavBar/>
      <main>
        <Routes>
            <Route path="/" element={<Index/>}/>
            {/* <Route path="/transactions" element={<Index/>}/> */}
            <Route path="/transactions/new" element={<New/>}/>
            <Route path="/transactions/:index" element={<Show/>}/>
            <Route path="/transactions/:index/edit" element={<Edit/>}/>
            <Route path="*" element={<Error/>}/>
        </Routes>
      </main>
    </div>
  );
}

export default App;