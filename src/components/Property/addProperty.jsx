import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import ButtonPrimary from '../Buttons/ButtonPrimary';
import { useContractSubmit } from '../../hooks/useContractSubmit';
import Input from '../common/Input';

const AddProperty = ({ contractAddress }) => {
    const { customerId } = useParams();
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [details, setDetails] = useState('');
    const [gambar, setGambar] = useState('');
    const [customerName, setCustomerName] = useState('');

    const handleContractSubmit = useContractSubmit(contractAddress);

    useEffect(() => {
        const fetchCustomerName = async () => {
            try {
                const customer = await handleContractSubmit('customers', customerId);
                setCustomerName(customer.name);
            } catch (error) {
                console.error('Error fetching customer name:', error);
                setCustomerName('Unknown');
            }
        };

        if (customerId) {
            fetchCustomerName();
        }
    }, [customerId, handleContractSubmit]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const success = await handleContractSubmit('addCustomerProperty', customerId, title, details, gambar);

        if (success) {
            alert('Property added successfully!');
            navigate('/customer-list');
        } else {
            alert('Failed to add property. Please try again.');
        }
    }

    return (
        <div className="max-w-md mx-auto mt-10">
            <h1 className="text-2xl font-bold mb-5">Add Property for Customer: {customerName || customerId}</h1>
            <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
                <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" />
                <Input value={details} onChange={(e) => setDetails(e.target.value)} placeholder="Details" />
                <Input value={gambar} onChange={(e) => setGambar(e.target.value)} placeholder="Gambar" />
                <ButtonPrimary text="Add Property" onClick={handleSubmit} />
            </form>
        </div>
    )
}

AddProperty.propTypes = {
    contractAddress: PropTypes.string.isRequired,
};

export default AddProperty;
