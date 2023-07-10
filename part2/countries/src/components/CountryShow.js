import { useState } from 'react';
import Country from './Country';

const CountryShow = ({ country }) => {
  const [show, setShow] = useState(false);

  if (!show) {
    return (
      <div>
        {country.name.common}
        <button onClick={() => setShow(!show)}>show</button>
      </div>
    );
  } else {
    return (
      <div>
        <button onClick={() => setShow(!show)}>hide</button>
        <Country country={country} />
      </div>
    );
  }
};

export default CountryShow;
