import { useEffect, useState } from 'react';
import axios from 'axios';
import Filter from './components/Filter';
import Countries from './components/Countries';

const baseUrl = 'https://restcountries.com/v3.1/all';

const App = () => {
  const [countries, setCountries] = useState(null);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    axios.get(baseUrl).then((response) => {
      setCountries(response.data);
    });
  }, []);

  if (!countries) {
    return null;
  }

  return (
    <div style={{ padding: 10 }}>
      <Filter filter={filter} setFilter={setFilter} />
      <Countries countries={countries} filter={filter} />
    </div>
  );
};

export default App;
