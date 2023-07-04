import { useEffect, useState } from 'react';
import axios from 'axios';
import Counties from './components/Countries';

const App = () => {
  const [filter, setFilter] = useState('');
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    axios.get('https://studies.cs.helsinki.fi/restcountries/api/all').then((response) => {
      setCountries(response.data);
    });
  }, []);

  if (countries.length === 0) return null;

  const filteredCountries = countries.filter((country) => {
    return country.name.common.toLowerCase().includes(filter.toLowerCase());
  });

  return (
    <div>
      <div>
        find countries{' '}
        <input
          value={filter}
          onChange={({ target }) => {
            setFilter(target.value);
          }}
        />
        <Counties countries={filteredCountries} />
      </div>
    </div>
  );
};

export default App;
