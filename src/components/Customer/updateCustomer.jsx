import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import Form from '../Form/FormCustomer'; // Assuming you have a Form component
import { useContractSubmit } from '../../hooks/useContractSubmit';
import ButtonPrimary from '../Buttons/ButtonPrimary';

const UpdateCustomer = ({ contractAddress }) => {
  const { customerId } = useParams();
  const navigate = useNavigate();
  const [customerData, setCustomerData] = useState({
    name: '',
    ic: '',
    contactNo: '',
    address: '',
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleContractSubmit = useContractSubmit(contractAddress);

  useEffect(() => {
    const fetchCustomerData = async () => {
      try {
        const customer = await handleContractSubmit('customers', customerId);
        setCustomerData({
          name: customer.name,
          ic: customer.ic,
          contactNo: customer.contactNo,
          address: customer.address,
        });
        setLoading(false);
      } catch (error) {
        console.error('Error fetching customer data:', error);
        setError('Failed to fetch customer data. Please try again.');
        setLoading(false);
      }
    };

    if (customerId) {
      fetchCustomerData();
    }
  }, [customerId, handleContractSubmit]);

  const handleSubmit = async (formData) => {
    const { name, ic, contactNo, address } = formData;
    const success = await handleContractSubmit('updateCustomerData', customerId, name, ic, contactNo, address);

    if (success) {
      alert('Customer updated successfully!');
      navigate('/customer-list');
    } else {
      alert('Failed to update customer. Please try again.');
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const fields = [
    { name: 'name', label: 'Name', type: 'text', required: true, value: customerData.name },
    { name: 'ic', label: 'IC', type: 'text', required: true, value: customerData.ic },
    { name: 'contactNo', label: 'Contact No', type: 'text', required: true, value: customerData.contactNo },
    { name: 'address', label: 'Address', type: 'textarea', required: true, value: customerData.address },
  ];

  return (
    <div className="max-w-md mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-5">Update Customer</h2>
      <div className="form">
        <Form
          fields={fields}
          onSubmit={handleSubmit}
          submitButtonText="Update Customer"
        />
      </div>
      
      <div className="back">
      <ButtonPrimary 
                text="Back to Customer List" 
                onClick={() => navigate('/customer-list')} 
                className="mt-4"
            />
      </div>
    </div>
  );
};

UpdateCustomer.propTypes = {
  contractAddress: PropTypes.string.isRequired,
};

export default UpdateCustomer;