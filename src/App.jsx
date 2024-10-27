import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import AddCustomer from './components/Customer/addCustomer';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import AddProperty from './components/Property/addProperty';
import AssetManager from '../contract/AssetManager.json';
import UpdateCustomer from './components/Customer/updateCustomer';
import DeleteCustomer from './components/Customer/deleteCustomer';

function App() {
  const contractAddress = 'YOUR_CONTRACT_ADDRESS_HERE'; // Replace with your actual contract address
  const contractABI = AssetManager.abi;

  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route 
            path="/add-customer" 
            element={<AddCustomer contractAddress={contractAddress} contractABI={contractABI} />}
          />
          <Route 
            path="/add-property" 
            element={<AddProperty contractAddress={contractAddress} contractABI={contractABI} />}
          />
          <Route 
            path="/edit-customer" 
            element={<UpdateCustomer contractAddress={contractAddress} contractABI={contractABI} />}
          />
          <Route 
            path="/delete-customer" 
            element={<DeleteCustomer contractAddress={contractAddress} contractABI={contractABI} />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
