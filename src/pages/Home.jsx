import { useNavigate } from 'react-router-dom';
import ButtonPrimary from '../components/Buttons/ButtonPrimary';
const Home = () => {
  const navigate = useNavigate();

  return (
    <div>
      <h1>This is homepage</h1>
      <div className="customer flex justify-center items-center gap-4 mt-10">
        <ButtonPrimary text="Add Customer" onClick={() => navigate('/add-customer')} />
        <ButtonPrimary text="Customer List" onClick={() => navigate('/customer-list')} />
      </div>
    </div>
  )
}

export default Home
