import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CountryList from "./CountryList";
import CountryDetail from "./CountryDetail";

function App() {
  return (
    <Router>
      <div className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-6 text-center">
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