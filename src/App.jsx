import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import AddCustomer from './components/Customer/addCustomer';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import AddProperty from './components/Property/addProperty';
import AssetManager from '../contract/AssetManager.json';
import UpdateCustomer from './components/Customer/updateCustomer';
import DeleteCustomer from './components/Customer/deleteCustomer';
import CustomerList from './components/Customer/customerList';
import ViewProperty from './components/Property/viewProperty';

function App() {
  const contractAddress = '0x5fbdb2315678afecb367f032d93f642f64180aa3'; // Replace with your actual contract address
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
            path="/add-property/:customerId" 
            element={<AddProperty contractAddress={contractAddress} />}
          />
          <Route 
            path="/edit-customer/:customerId" 
            element={<UpdateCustomer contractAddress={contractAddress} contractABI={contractABI} />}
          />
          <Route 
            path="/view-property/:customerId" 
            element={<ViewProperty contractAddress={contractAddress} />}
          />
          <Route 
            path="/delete-customer/:customerId" 
            element={<DeleteCustomer contractAddress={contractAddress} contractABI={contractABI} />}
          />
          <Route 
            path="/customer-list" 
            element={<CustomerList contractAddress={contractAddress} contractABI={contractABI} />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;