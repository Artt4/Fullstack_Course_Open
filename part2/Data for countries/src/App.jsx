import { useState, useEffect } from "react";
import countryService from "./services/countries";
import Countries from "./components/Countries";
import Filter from "./components/Filter";

const App = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [allCountries, setAllCountries] = useState([]);

  const countryOnChange = (event) => {
    console.log(event.target.value);
    setSearchQuery(event.target.value);
  };

  useEffect(() => {
    countryService
      .getAll()
      .then((initialCountries) => setAllCountries(initialCountries));
  }, []);

  const filteredCountries = allCountries.filter((country) =>
    country.name.common.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div>
      <div>
        <Filter value={searchQuery} onChange={countryOnChange} />
        <Countries
          countries={filteredCountries}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />
      </div>
    </div>
  );
};

export default App;
