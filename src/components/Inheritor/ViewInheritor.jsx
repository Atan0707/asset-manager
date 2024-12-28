import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import ButtonPrimary from '../Buttons/ButtonPrimary';
import { useContractSubmit } from '../../hooks/useContractSubmit';

const ViewInheritor = ({ contractAddress }) => {
    const { customerId } = useParams();
    const navigate = useNavigate();
    const [customerName, setCustomerName] = useState('');
    const [inheritors, setInheritors] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const handleContractSubmit = useContractSubmit(contractAddress);

    useEffect(() => {
        const fetchCustomerData = async () => {
            try {
                const customer = await handleContractSubmit('customers', customerId);
                setCustomerName(customer.name);

                const customerInheritors = await handleContractSubmit('getCustomerInheritors', customerId);
                setInheritors(customerInheritors);
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
            <h1 className="text-2xl font-bold mb-5">Inheritors for Customer: {customerName}</h1>
            {inheritors.length === 0 ? (
                <p>No inheritors found for this customer.</p>
            ) : (
                <table className="min-w-full bg-white border border-gray-300">
                    <thead>
                        <tr>
                            <th className="py-2 px-4 border-b">Name</th>
                            <th className="py-2 px-4 border-b">Relationship</th>
                            <th className="py-2 px-4 border-b">Contact</th>
                        </tr>
                    </thead>
                    <tbody>
                        {inheritors.map((inheritor, index) => (
                            <tr key={index}>
                                <td className="py-2 px-4 border-b">{inheritor.name}</td>
                                <td className="py-2 px-4 border-b">{inheritor.relationship}</td>
                                <td className="py-2 px-4 border-b">{inheritor.contactNo}</td>
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

ViewInheritor.propTypes = {
    contractAddress: PropTypes.string.isRequired,
};

export default ViewInheritor;