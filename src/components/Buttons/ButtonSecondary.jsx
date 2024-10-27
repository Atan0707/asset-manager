import PropTypes from 'prop-types';

const ButtonPrimary = ({text, className, onClick}) => {
  return (
    <button 
      className={`bg-gray-300 hover:bg-gray-400 text-black px-4 py-2 font-semibold rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-opacity-75 ${className}`} 
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
