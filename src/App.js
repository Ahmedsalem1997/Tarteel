import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './views/Home/Home';
import Islamic from './views/Islamic/Islamic';
import MyRecords from './views/MyRecords/MyRecords';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="records" element={<MyRecords/>} />
        <Route path="islamic" element={<Islamic/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
