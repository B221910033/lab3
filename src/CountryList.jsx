import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const ITEMS_PER_PAGE = 10;

export default function CountryList() {
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchCountries = async () => {
      const res = await fetch(
        "https://restcountries.com/v3.1/all?fields=name,cca2,flags,capital,population"
      );
      const data = await res.json();

      const sorted = data.sort((a, b) =>
        a.name.common.localeCompare(b.name.common)
      );

      setCountries(sorted);
      setFilteredCountries(sorted);
    };

    fetchCountries();
  }, []);

  useEffect(() => {
    const filtered = countries.filter((c) =>
      c.name.common.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setFilteredCountries(filtered);
    setCurrentPage(1);
  }, [searchTerm, countries]);

  const totalPages = Math.ceil(filteredCountries.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const visibleCountries = filteredCountries.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  return (
    <div>
      <input
        type="text"
        placeholder="Улсын нэрээр хайх..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full p-3 mb-6 border rounded-lg"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {visibleCountries.map((country) => (
          <Link
            key={country.cca2}
            to={`/country/${country.cca2.toUpperCase()}`}
            className="border rounded-lg overflow-hidden shadow hover:shadow-lg"
          >
            <img
              src={country.flags?.png}
              className="w-full h-40 object-cover"
            />
            <div className="p-4">
              <h2 className="text-xl font-semibold">
                {country.name.common}
              </h2>
              <p>Нийслэл: {country.capital?.[0] || "-"}</p>
              <p>Хүн ам: {country.population.toLocaleString()}</p>
            </div>
          </Link>
        ))}
      </div>

      <div className="flex justify-center mt-6 gap-2">
        <button onClick={() => setCurrentPage(currentPage - 1)}>
          Өмнөх
        </button>

        <span>{currentPage} / {totalPages}</span>

        <button onClick={() => setCurrentPage(currentPage + 1)}>
          Дараах
        </button>
      </div>
    </div>
  );
}