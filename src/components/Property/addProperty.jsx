import { useState } from 'react'
import PropTypes from 'prop-types';
import ButtonPrimary from '../Buttons/ButtonPrimary';

import { useContractSubmit } from '../../hooks/useContractSubmit';
import Input from '../common/Input';

const AddProperty = ({ contractAddress, contractABI }) => {
    const [title, setTitle] = useState('');
    const [details, setDetails] = useState('');
    const [gambar, setGambar] = useState('');

    const handleContractSubmit = useContractSubmit(contractAddress);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const success = await handleContractSubmit('addProperty', title, details, gambar);

        if (success) {
            alert('Property added successfully!');
        } else {
            alert('Failed to add property. Please try again.');
        }

        setTitle('');
        setDetails('');
        setGambar('');
    }

    return (
        <div>
        <h1>Add Property</h1>
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
    contractABI: PropTypes.array.isRequired,
};

export default AddProperty
