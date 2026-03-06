import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CountryList from "./CountryList";
import CountryDetail from "./CountryDetail";

function App() {
  return (
    <Router>
      <div className="container mx-auto p-2">
        <h1 className="text-5xl font-extrabold mb-4 text-right">
          Дэлхийн Улсууд
        </h1>

        <Routes>
          <Route path="/" element={<CountryList />} />
          <Route path="/country/:code" element={<CountryDetail />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;