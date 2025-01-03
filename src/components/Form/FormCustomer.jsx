import React from 'react';
import PropTypes from 'prop-types';
// import ButtonSecondary from '../Buttons/ButtonSecondary';

const FormCustomer = ({ fields, onSubmit, submitButtonText }) => {
  const [formData, setFormData] = React.useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {fields.map((field) => (
        <div key={field.name}>
          <label htmlFor={field.name} className="block mb-1">{field.label}:</label>
          {field.type === 'textarea' ? (
            <textarea
              id={field.name}
              name={field.name}
              value={formData[field.name] || ''}
              onChange={handleChange}
              required={field.required}
              className="w-full px-3 py-2 border rounded"
            />
          ) : (
            <input
              type={field.type}
              id={field.name}
              name={field.name}
              value={formData[field.name] || ''}
              onChange={handleChange}
              required={field.required}
              className="w-full px-3 py-2 border rounded"
            />
          )}
        </div>
      ))}
      <button type="submit" className="bg-gray-300 hover:bg-gray-400 text-black px-4 py-2 font-semibold rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-opacity-75">
        {submitButtonText}
      </button>
    
    </form>
  );
};

FormCustomer.propTypes = {
  fields: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired,
    required: PropTypes.bool,
  })).isRequired,
  onSubmit: PropTypes.func.isRequired,
  submitButtonText: PropTypes.string.isRequired,
};

export default FormCustomer;