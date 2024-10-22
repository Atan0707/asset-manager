// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

contract AssetManager {

    struct Properties {
        string title;
        string details;
        string gambar; // optional - using IPFS
    }

    struct CustomerData {
        string name;
        string ic;
        string contactNo;
        string Address;
    }

    struct Inheritor {
        string name;
        string ic;
        string contactNo;
        string Address;
    }

    Properties[] public properties;
    CustomerData[] public customers;
    Inheritor[] public inheritors;

    mapping(uint256 => Properties[]) public customerProperties;
    mapping(uint256 => Inheritor[]) public customerInheritors;

    uint256 public customerIdCounter; // Automatic customer ID counter

    constructor() {
        customerIdCounter = 1; // Start IDs from 1 to avoid confusion with default 0
    }

    // Function to add customer data with an automatic ID
    function addCustomerData(
        string memory name, 
        string memory ic, 
        string memory contactNo, 
        string memory Address
    ) public returns (uint256) {
        CustomerData memory newCustomer = CustomerData(name, ic, contactNo, Address);
        customers.push(newCustomer);

        uint256 newCustomerId = customerIdCounter; // Assign current counter value as the customer ID
        customerIdCounter++; // Increment the counter for the next customer

        return newCustomerId; // Return the newly generated customer ID
    }

    // Function to add properties for a customer by customerId
    function addCustomerProperty(
        uint256 customerId, 
        string memory title, 
        string memory details, 
        string memory gambar
    ) public {
        require(customerId > 0 && customerId < customerIdCounter, "Invalid customer ID.");
        Properties memory newProperty = Properties(title, details, gambar);
        customerProperties[customerId].push(newProperty);
    }

    // Function to add an inheritor for a customer by customerId
    function addCustomerInheritor(
        uint256 customerId, 
        string memory name, 
        string memory ic, 
        string memory contactNo, 
        string memory Address
    ) public {
        require(customerId > 0 && customerId < customerIdCounter, "Invalid customer ID.");
        Inheritor memory newInheritor = Inheritor(name, ic, contactNo, Address);
        customerInheritors[customerId].push(newInheritor);
    }
}
