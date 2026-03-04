import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

export default function CountryDetail() {
  const { code } = useParams();
  const [country, setCountry] = useState(null);

  useEffect(() => {
    const fetchCountry = async () => {
      const res = await fetch(
        `https://restcountries.com/v3.1/alpha/${code.toUpperCase()}`
      );
      const data = await res.json();

      setCountry(data[0]);
    };

    if (code) fetchCountry();
  }, [code]);

  if (!country) return <p>Ачаалж байна...</p>;

  return (
    <div>
      <Link to="/">← Буцах</Link>

      <h1>{country.name.common}</h1>

      <img src={country.flags.png} width="300" />

      <p>Нийслэл: {country.capital?.[0]}</p>
      <p>Хүн ам: {country.population.toLocaleString()}</p>
      <p>Бүс: {country.region}</p>
    </div>
  );
}