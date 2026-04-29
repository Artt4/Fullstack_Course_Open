import Weather from "./Weather";

const Countries = ({ countries, searchQuery, setSearchQuery }) => {
  if (searchQuery === "") return null;
  if (countries.length > 10) {
    return <div>Too many matches, specify another filter</div>;
  }
  if (countries.length === 1) {
    const country = countries[0];
    return (
      <div>
        <h1>{country.name.common}</h1>
        <div>capital {country.capital}</div>
        <div>area {country.area}</div>

        <h2>languages:</h2>
        <ul>
          {Object.values(country.languages).map((lang) => (
            <li key={lang}>{lang}</li>
          ))}
        </ul>
        <img
          src={country.flags.png}
          alt={`Flag of ${country.name.common}`}
          width="150"
        />
        <Weather capital={country.capital[0]} />
      </div>
    );
  }

  return (
    <div>
      {countries.map((country) => (
        <div key={country.cca3}>
          {country.name.common}
          <button onClick={() => setSearchQuery(country.name.common)}>
            show
          </button>
        </div>
      ))}
    </div>
  );
};

export default Countries;
