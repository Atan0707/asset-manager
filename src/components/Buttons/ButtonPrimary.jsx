import PropTypes from 'prop-types';

const ButtonPrimary = ({text, clasName, onClick}) => {
  return (
    <div>
        <button className={`btn btn-primary rounded-md px-12 py-3 bg-primary ${clasName}`} onClick={onClick}>
            {text}
        </button>
    </div>
  )
}

ButtonPrimary.propTypes = {
  text: PropTypes.string.isRequired,
  clasName: PropTypes.string,
  onClick: PropTypes.func,
};

export default ButtonPrimary
