import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { useCustomerList } from '../../hooks/useCustomerList';
// import ButtonPrimary from '../Buttons/ButtonPrimary';
import ButtonSecondary from '../Buttons/ButtonSecondary';
import TableHeaders from '../common/TableHeaders';

const CustomerActions = ({ customerId }) => {
  const navigate = useNavigate();

  const actions = [
    
    {
      text: 'Add Property',
      onClick: () => navigate(`/add-property/${customerId}`),
      // className: 'bg-green-500 hover:bg-green-600 text-white',
      component: ButtonSecondary,
    },
    {
      text: 'View Property',
      onClick: () => navigate(`/view-property/${customerId}`),
      // className: 'bg-blue-500 hover:bg-blue-600 text-white',
      component: ButtonSecondary,
    },
    {
      text: 'Edit Customer',
      onClick: () => navigate(`/edit-customer/${customerId}`),
      // className: 'bg-yellow-500 hover:bg-yellow-600 text-white',
      component: ButtonSecondary,
    },
    {
      text: 'Delete Customer',
      onClick: () => navigate(`/delete-customer/${customerId}`),
      // className: 'bg-red-500 hover:bg-red-600 text-white',
      component: ButtonSecondary,
    },
    {
      text: 'Add Inheritor',
      onClick: () => navigate(`/add-inheritor/${customerId}`),
      // className: 'bg-red-500 hover:bg-red-600 text-white',
      component: ButtonSecondary,
    },
    {
      text: 'View Inheritor',
      onClick: () => navigate(`/view-inheritor/${customerId}`),
      // className: 'bg-red-500 hover:bg-red-600 text-white',
      component: ButtonSecondary,
    },
    
    // Add more actions here
  ];

  return (
    <>
      {actions.map((action, index) => {
        const ActionComponent = action.component;
        return (
          <td key={index} className="py-2 px-4 border-b">
            <ActionComponent
              text={action.text}
              onClick={action.onClick}
              className={action.className}
            />
          </td>
        );
      })}
    </>
  );
};

CustomerActions.propTypes = {
  customerId: PropTypes.string.isRequired,
};

const CustomerList = ({ contractAddress }) => {
  const { customers, loading, error } = useCustomerList(contractAddress);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const headers = ["ID", "Name", "IC", "Contact No", "Address", "Actions"];

  return (
    <div className="max-w-4xl mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-5">Customer List</h2>
      {customers.length === 0 ? (
        <p>No customers found.</p>
      ) : (
        <table className="min-w-full bg-white border border-gray-300">
          <TableHeaders headers={headers} />
          <tbody>
            {customers.map((customer) => (
              <tr key={customer.id}>
                <td className="py-2 px-4 border-b">{customer.id}</td>
                <td className="py-2 px-4 border-b">{customer.name}</td>
                <td className="py-2 px-4 border-b">{customer.ic}</td>
                <td className="py-2 px-4 border-b">{customer.contactNo}</td>
                <td className="py-2 px-4 border-b">{customer.address}</td>
                <CustomerActions customerId={customer.id.toString()} />
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
