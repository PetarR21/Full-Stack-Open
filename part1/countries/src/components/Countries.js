import Country from './Country';
import CountryShow from './CountryShow';

const Countries = ({ countries }) => {
  if (countries.length === 0) return null;

  if (countries.length === 1) {
    return <Country country={countries[0]} />;
  }
  if (countries.length > 10) {
    return <div>Too many matches, specify another filter</div>;
  }
  return (
    <div>
      {countries.map((country) => {
        return <CountryShow key={country.name.common} country={country} />;
      })}
    </div>
  );
};

export default Countries;
