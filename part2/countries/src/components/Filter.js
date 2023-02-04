const Filter = ({ filter, setFilter }) => {
  return (
    <div>
      find countries{' '}
      <input
        type='text'
        value={filter}
        onChange={({ target }) => {
          setFilter(target.value);
        }}
      />
    </div>
  );
};

export default Filter;
