import Form from "../components/Form/FormCustomer"
import { useContractSubmit } from "../hooks/useContractSubmit"
import AssetManagerABI from '../../contract/AssetManager.json';
import PropTypes from 'prop-types';
import { ethers } from 'ethers';
import { useState, useEffect } from 'react';

const Customer = ({contractAddress}) => {
    const [error, setError] = useState(null);
    const [customerName, setCustomerName] = useState('');
    const [loading, setLoading] = useState(true);
    const [ic, setIC] = useState('');
    const [found , setFound] = useState(false);
    const [customerID, setCustomerID] = useState('')
    const [inheritors, setInheritors] = useState([]);


    // const fields = [
    //     { name: 'ic', label: 'IC', type: 'text', required: true }
    //   ];
    
    //   const handleSubmit = async (formData) => {
    //     const { ic } = formData;
    //     console.log(ic)
    //   };

    const handleSubmit = async (e) => {
        e.preventDefault();
        fetchCustomerData();
    }

    //   const handleContractSubmit = useContractSubmit(contractAddress);

      const fetchInheritors = async () => {
        try {
            // const customerInheritors = await handleContractSubmit('getCustomerInheritors', customerID);
            // setInheritors(customerInheritors);
            const provider = new ethers.BrowserProvider(window.ethereum);
            const contract = new ethers.Contract(contractAddress, AssetManagerABI.abi, provider);
            const customerInheritors = await contract.getCustomerInheritors(customerID);
            console.log('Customer inheritors:', customerInheritors);
            setInheritors(customerInheritors);
        } catch (error) {
            console.error('Error fetching customer data:', error);
            setError('Failed to fetch customer data. Please try again.');
        }
    };

      const fetchCustomerData = async () => {
        try {
            const provider = new ethers.BrowserProvider(window.ethereum);
            const contract = new ethers.Contract(contractAddress, AssetManagerABI.abi, provider);
            console.log('Fetching customer count...');
            const customerCount = await contract.customerIdCounter();
            console.log('Customer count:', customerCount);

            // task 10.11.2024
            // - settlekan fetch customer data
            // dah fetch, pastu boleh show semua data macam properties and inheritor
            // pastu, buat page untuk inheritor
            let i = 0;
             do {
                console.log(`Fetching customer ${i}...`);
                try {
                    const customer = await contract.customers(i);
                    if (customer.ic === ic) {
                        setCustomerName(customer.name);
                        setCustomerID(i);
                        console.log('Customer ID:', customerID);
                        fetchInheritors();
                        console.log('Customer Name:', customer.name);
                        setFound(true);
                        break;
                    }
                } catch(customerError) {
                    console.error(`Error fetching customer ${i}:`, customerError);
                }
                i++;
            } while (!found && i < customerCount);
        }
        catch {
           console.error('Error fetching customer data:', error);
        }
        setLoading(false);
        if(!found) {
            setCustomerName("")
        }
      }

      useEffect(() => {

      })


      

  return (
    <div>
        <h1>Customer Page</h1>
        <div className="form">
            {/* <Form 
            fields={fields}
            onSubmit={handleSubmit}
            submitButtonText="Check"/> */}
            <form onSubmit={handleSubmit}>
                <label>
                    IC:
                    <input type="text" name="ic" onChange={(e) => setIC(e.target.value)} className="border-b-2"/>
                </label>
                <button type="submit">Check</button>
            </form>
        </div>
        {loading ? (
            // <p>Loading...</p>
            <></>
        ) : (
            <div>
                {/*  */}
                {found ? (
                    <>
                        <h2>Customer Name: {customerName}</h2>
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
                    </>
                ) : (
                    <p>No customer found</p>
                )}
            </div>
        )}
    </div>
  )
}

Customer.propTypes = {
    contractAddress: PropTypes.string.isRequired,
  };

export default Customer