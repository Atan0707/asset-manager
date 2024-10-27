import PropTypes from 'prop-types';

const ButtonPrimary = ({text, className, onClick}) => {
  return (
    <button 
      className={`px-4 py-2 font-semibold rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 ${className}`} 
      onClick={onClick}
    >
      {text}
    </button>
  )
}

ButtonPrimary.propTypes = {
  text: PropTypes.string.isRequired,
  className: PropTypes.string,
  onClick: PropTypes.func,
};

export default ButtonPrimary
