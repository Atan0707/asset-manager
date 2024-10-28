import PropTypes from 'prop-types';
import { useContractSubmit } from '../../hooks/useContractSubmit';
import Form from '../Form/FormCustomer';

const AddCustomer = ({ contractAddress }) => {
  const handleContractSubmit = useContractSubmit(contractAddress);

  const fields = [
    { name: 'name', label: 'Name', type: 'text', required: true },
    { name: 'ic', label: 'IC', type: 'text', required: true },
    { name: 'contactNo', label: 'Contact No', type: 'text', required: true },
    { name: 'address', label: 'Address', type: 'textarea', required: true },
  ];

  const handleSubmit = async (formData) => {
    const { name, ic, contactNo, address } = formData;
    const success = await handleContractSubmit('addCustomerData', name, ic, contactNo, address);

    if (success) {
      alert('Customer added successfully!');
      console.log('')
    } else {
      alert('Failed to add customer. Please try again.');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-5 ">Add Customer</h2>
      <Form
        fields={fields}
        onSubmit={handleSubmit}
        submitButtonText="Add Customer"
      />
    </div>
  );
};

AddCustomer.propTypes = {
  contractAddress: PropTypes.string.isRequired,
};

export default AddCustomer;
