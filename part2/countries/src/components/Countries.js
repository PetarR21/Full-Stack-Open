import CountriesList from './CountriesList';
import CountryFull from './CountryFull';

const Countries = ({ countries, filter }) => {
  if (filter.trim() === '') {
    return null;
  }

  const countriesToShow = countries.filter((country) =>
    country.name.common.trim().toLowerCase().includes(filter.trim().toLowerCase())
  );

  if (countriesToShow.length === 0) {
    return <div>No match</div>;
  }

  if (countriesToShow.length > 10) {
    return <div>Too many matches, specify another filter</div>;
  } else {
    if (countriesToShow.length > 1) {
      return <CountriesList countries={countriesToShow} />;
    } else {
      return <CountryFull country={countriesToShow[0]} />;
    }
  }
};

export default Countries;
