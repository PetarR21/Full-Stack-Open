import { useState } from 'react';
import CountryFull from './CountryFull';

const Country = ({ country }) => {
  const [show, setShow] = useState(false);

  if (show) {
    return <CountryFull country={country} setShow={setShow} />;
  }

  return (
    <div style={{ marginTop: 10  }}>
      {country.name.common}{' '}
      <button
        onClick={() => {
          setShow(!show);
        }}
      >
        show
      </button>
    </div>
  );
};

export default Country;
