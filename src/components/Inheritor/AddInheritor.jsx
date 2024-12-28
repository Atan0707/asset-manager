import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import PropTypes from 'prop-types';
import { useContractSubmit } from '../../hooks/useContractSubmit';
import Form from '../Form/FormCustomer';
import ButtonPrimary from "../Buttons/ButtonPrimary";

const AddInheritor = ({ contractAddress }) => {
    const { customerId } = useParams();
    console.log("Received customerId:", customerId);
    const navigate = useNavigate();
    const [customerName, setCustomerName] = useState('');

    const fields = [
        { name: 'name', label: 'Name', type: 'text', required: true },
        { name: 'ic', label: 'IC', type: 'text', required: true },
        { name: 'contactNo', label: 'Contact No', type: 'text', required: true },
        { name: 'address', label: 'Address', type: 'textarea', required: true },
        { name: 'relationship', label: 'Relationship', type: 'text', required: true}
      ];
// 0123451123
    const handleContractSubmit = useContractSubmit(contractAddress);

    useEffect(() => {
        const fetchCustomerName = async () => {
            console.log("Fetching customer data for ID:", customerId);
            try {
                const customer = await handleContractSubmit('customers', customerId);
                console.log("Received customer data:", customer);
                setCustomerName(customer.name);
                console.log('Customer Name:', customer.name);
            } catch (error) {
                console.error('Error fetching customer name:', error);
                setCustomerName('Unknown');
            }
        };

        if (customerId) {
            fetchCustomerName();
        }
    }, [customerId, handleContractSubmit]);

    const handleSubmit = async (formData) => {
        const { name, ic, contactNo, address, relationship } = formData;
        const success = await handleContractSubmit('addCustomerInheritor', customerId, name, ic, contactNo, address, relationship);
    
        if (success) {
          alert('Customer added successfully!');
          console.log('')
        } else {
          alert('Failed to add customer. Please try again.');
        }
      };

  return (
    <div>
        <header>
            <h1>Add Inheritor for : {customerName}</h1>
        </header>
        <div className="form">
            <Form
            fields={fields}
            onSubmit={handleSubmit}
            submitButtonText="Add Customer"
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
  )
}

AddInheritor.propTypes = {
    contractAddress: PropTypes.string.isRequired,
}

export default AddInheritor