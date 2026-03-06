import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

export default function CountryDetail() {
  const { code } = useParams();
  const [country, setCountry] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCountry = async () => {
      try {
        const res = await fetch(
          `https://restcountries.com/v3.1/alpha/${code.toUpperCase()}?fields=name,flags,capital,population,region,subregion,languages,currencies,timezones,area,cca2`
        );

        if (!res.ok) {
          throw new Error(`Алдаа: ${res.status} - ${res.statusText}`);
        }

        const data = await res.json();
        setCountry(data[0] || data);
        setError(null);
      } catch (err) {
        console.error(err);
        setError(err.message);
        setCountry(null);
      }
    };

    if (code) fetchCountry();
  }, [code]);

  if (error) {
    return <p className="error">Алдаа гарлаа: {error}</p>;
  }

  if (!country) {
    return <p className="loading">Ачаалж байна...</p>;
  }

  return (
    <div className="detail-page">

      <Link to="/" className="back-btn">← Буцах</Link>

      <div className="detail-card">

        {/* FLAG ЗҮҮН ТАЛД */}
        {country.flags?.png && (
          <img
            src={country.flags.png}
            alt={`${country.name.common} flag`}
            className="flag"
          />
        )}

        {/* INFO БАРУУН ТАЛД */}
        <div className="info">

          <h1>{country.name?.common || "Нэр байхгүй"}</h1>

          <p><strong>Нийслэл:</strong> {country.capital?.[0] || "—"}</p>

          <p><strong>Хүн ам:</strong> {country.population?.toLocaleString() || "—"}</p>

          <p><strong>Бүс нутаг:</strong> {country.region || "—"}</p>

          <p><strong>Дэд бүс нутаг:</strong> {country.subregion || "—"}</p>

          <p><strong>Код:</strong> {country.cca2 || "—"}</p>

          <p>
            <strong>Хэл(нүүд):</strong>{" "}
            {country.languages
              ? Object.values(country.languages).join(", ")
              : "—"}
          </p>

          <p>
            <strong>Валют:</strong>{" "}
            {country.currencies
              ? Object.values(country.currencies)
                  .map((c) => `${c.name} (${c.symbol || "?"})`)
                  .join(", ")
              : "—"}
          </p>

          <p>
            <strong>Цагийн бүс:</strong>{" "}
            {country.timezones?.join(", ") || "—"}
          </p>

          <p>
            <strong>Газар нутгийн хэмжээ:</strong>{" "}
            {country.area?.toLocaleString() || "—"} км²
          </p>

        </div>

      </div>
    </div>
  );
}