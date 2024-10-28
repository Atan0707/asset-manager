import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import ButtonPrimary from '../Buttons/ButtonPrimary';
import { useContractSubmit } from '../../hooks/useContractSubmit';

const ViewProperty = ({ contractAddress }) => {
    const { customerId } = useParams();
    const navigate = useNavigate();
    const [customerName, setCustomerName] = useState('');
    const [properties, setProperties] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const handleContractSubmit = useContractSubmit(contractAddress);

    useEffect(() => {
        const fetchCustomerData = async () => {
            try {
                const customer = await handleContractSubmit('customers', customerId);
                setCustomerName(customer.name);

                const customerProperties = await handleContractSubmit('getCustomerProperties', customerId);
                setProperties(customerProperties);
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

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div className="max-w-4xl mx-auto mt-10">
            <h1 className="text-2xl font-bold mb-5">Properties for Customer: {customerName}</h1>
            {properties.length === 0 ? (
                <p>No properties found for this customer.</p>
            ) : (
                <table className="min-w-full bg-white border border-gray-300">
                    <thead>
                        <tr>
                            <th className="py-2 px-4 border-b">Title</th>
                            <th className="py-2 px-4 border-b">Details</th>
                            <th className="py-2 px-4 border-b">Gambar</th>
                        </tr>
                    </thead>
                    <tbody>
                        {properties.map((property, index) => (
                            <tr key={index}>
                                <td className="py-2 px-4 border-b">{property.title}</td>
                                <td className="py-2 px-4 border-b">{property.details}</td>
                                <td className="py-2 px-4 border-b">{property.gambar}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
            <ButtonPrimary 
                text="Back to Customer List" 
                onClick={() => navigate('/customer-list')} 
                className="mt-4"
            />
        </div>
    )
}

ViewProperty.propTypes = {
    contractAddress: PropTypes.string.isRequired,
};

export default ViewProperty;
