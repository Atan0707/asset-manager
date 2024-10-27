import { useNavigate } from 'react-router-dom';
import ButtonPrimary from '../components/Buttons/ButtonPrimary';
const Home = () => {
  const navigate = useNavigate();

  return (
    <div>
      <h1>This is homepage</h1>
      <div className="customer flex justify-center items-center">
        <ButtonPrimary text="Add Customer" className="bg-blue-500" onClick={() => navigate('/add-customer')} />
        <ButtonPrimary text="Edit Customer" className="bg-blue-500" onClick={() => navigate('/edit-customer')} />
        <ButtonPrimary text="Delete Customer" className="bg-blue-500" onClick={() => navigate('/delete-customer')} />
      </div>
    </div>
  )
}

export default Home
