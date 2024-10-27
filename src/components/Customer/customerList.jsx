import PropTypes from 'prop-types';
import { useCustomerList } from '../../hooks/useCustomerList';
import { useNavigate } from 'react-router-dom';
import ButtonPrimary from '../Buttons/ButtonPrimary';
import ButtonSecondary from '../Buttons/ButtonSecondary';

const CustomerList = ({ contractAddress }) => {
  const { customers, loading, error } = useCustomerList(contractAddress);
  const navigate = useNavigate();

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="max-w-4xl mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-5">Customer List</h2>
      {customers.length === 0 ? (
        <p>No customers found.</p>
      ) : (
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">ID</th>
              <th className="py-2 px-4 border-b">Name</th>
              <th className="py-2 px-4 border-b">IC</th>
              <th className="py-2 px-4 border-b">Contact No</th>
              <th className="py-2 px-4 border-b">Address</th>
              <th className="py-2 px-4 border-b">Add Property</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((customer) => (
              <tr key={customer.id}>
                <td className="py-2 px-4 border-b">{customer.id}</td>
                <td className="py-2 px-4 border-b">{customer.name}</td>
                <td className="py-2 px-4 border-b">{customer.ic}</td>
                <td className="py-2 px-4 border-b">{customer.contactNo}</td>
                <td className="py-2 px-4 border-b">{customer.address}</td>
                <td className="py-2 px-4 border-b">
                  <ButtonPrimary
                    text="Add Property"
                    onClick={() => navigate(`/add-property/${customer.id}`)}
                    className="bg-green-500 hover:bg-green-600 text-white"
                  />
                </td>
                <td className="py-2 px-4 border-b">
                  <ButtonSecondary
                    text="View Property"
                    onClick={() => navigate(`/view-property/${customer.id}`)}
                    className="bg-blue-500 hover:bg-blue-600 text-white"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

CustomerList.propTypes = {
  contractAddress: PropTypes.string.isRequired,
};

export default CustomerList;
