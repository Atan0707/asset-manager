// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

contract AssetManager {

    address public owner;
    address[] public admin;

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
        owner = msg.sender;
        customerIdCounter = 1; // Start IDs from 1 to avoid confusion with default 0
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner has access");
        _;
    }

    modifier onlyAdminOrOwner() {
        require(isAdmin(msg.sender) || msg.sender == owner, "Only owner or admin has access");
        _;
    }

    function isAdmin(address _addr) internal view returns (bool) {
        for (uint256 i = 0; i < admin.length; i++) {
            if (admin[i] == _addr) {
                return true;
            }
        }
        return false;
    }

    // Function to add an admin, only callable by the owner
    function addAdmin(address _admin) public onlyOwner {
        admin.push(_admin);
    }

    // Function to add customer data with an automatic ID, restricted to admin or owner
    function addCustomerData(
        string memory name, 
        string memory ic, 
        string memory contactNo, 
        string memory Address
    ) public onlyAdminOrOwner returns (uint256) {
        CustomerData memory newCustomer = CustomerData(name, ic, contactNo, Address);
        customers.push(newCustomer);

        uint256 newCustomerId = customerIdCounter; // Assign current counter value as the customer ID
        customerIdCounter++; // Increment the counter for the next customer

        return newCustomerId; // Return the newly generated customer ID
    }

    // Function to add properties for a customer by customerId, restricted to admin or owner
    function addCustomerProperty(
        uint256 customerId, 
        string memory title, 
        string memory details, 
        string memory gambar
    ) public onlyAdminOrOwner {
        require(customerId > 0 && customerId < customerIdCounter, "Invalid customer ID.");
        Properties memory newProperty = Properties(title, details, gambar);
        customerProperties[customerId].push(newProperty);
    }

    // Function to add an inheritor for a customer by customerId, restricted to admin or owner
    function addCustomerInheritor(
        uint256 customerId, 
        string memory name, 
        string memory ic, 
        string memory contactNo, 
        string memory Address
    ) public onlyAdminOrOwner {
        require(customerId > 0 && customerId < customerIdCounter, "Invalid customer ID.");
        Inheritor memory newInheritor = Inheritor(name, ic, contactNo, Address);
        customerInheritors[customerId].push(newInheritor);
    }
}
