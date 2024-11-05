import PropTypes from 'prop-types';

const TableHeaders = ({ headers }) => {
  return (
    <thead>
      <tr>
        {headers.map((header, index) => (
          <th key={index} className="py-2 px-4 border-b">{header}</th>
        ))}
      </tr>
    </thead>
  );
};

TableHeaders.propTypes = {
  headers: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default TableHeaders;