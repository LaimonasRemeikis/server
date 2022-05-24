import Back from "./components/Back";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Front from "./components/Front";


function App() {
    return(
        <BrowserRouter>
        <Routes>
        <Route path="/" element={<Front show="all"/>} />
        <Route path="/leaf" element={<Front show="Leaf"/>} />
        <Route path="/spike" element={<Front show="Spike"/>} />
        <Route path="/palm" element={<Front show="Palm"/>} />
        <Route path="/admin" element={<Back/>}></Route>
        </Routes>
        </BrowserRouter>
    )
}
export default App;