import React, {useState, useEffect } from 'react';
import { ethers } from 'ethers';

const PowerPlantViewer = () => {
  const [form, setForm] = useState({
    plantName: '',
    plantType: '',
    carbonEmission: '',
    carbonCredits: '',
  });

  const contractABI = [
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "_plantName",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "_plantType",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "_carbonEmission",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "_carbonCredits",
          "type": "uint256"
        }
      ],
      "name": "addPlant",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": false,
          "internalType": "string",
          "name": "plantName",
          "type": "string"
        },
        {
          "indexed": false,
          "internalType": "string",
          "name": "plantType",
          "type": "string"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "carbonEmission",
          "type": "uint256"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "carbonCredits",
          "type": "uint256"
        }
      ],
      "name": "PlantAdded",
      "type": "event"
    },
    {
      "inputs": [],
      "name": "getTotalPlants",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "name": "plants",
      "outputs": [
        {
          "internalType": "string",
          "name": "plantName",
          "type": "string"
        },
        {
          "internalType": "string",
          "name": "plantType",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "carbonEmission",
          "type": "uint256"
        },
        {
          "internalType": "uint256",
          "name": "carbonCredits",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "viewAllPlants",
      "outputs": [
        {
          "components": [
            {
              "internalType": "string",
              "name": "plantName",
              "type": "string"
            },
            {
              "internalType": "string",
              "name": "plantType",
              "type": "string"
            },
            {
              "internalType": "uint256",
              "name": "carbonEmission",
              "type": "uint256"
            },
            {
              "internalType": "uint256",
              "name": "carbonCredits",
              "type": "uint256"
            }
          ],
          "internalType": "struct PowerPlantRegistry.PowerPlant[]",
          "name": "",
          "type": "tuple[]"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    }
  ];
  const contractAddress = "0xecd281580ff9fc34bf1836c0ff889c97d1281a39";

  const viewPlants = async () => {
    try {
      if (window.ethereum) {
        console.log(window.ethereum);
        const provider = new ethers.BrowserProvider(window.ethereum)
        const contract = new ethers.Contract(contractAddress, contractABI, provider);
        const allPlants = await contract.viewAllPlants();
        console.log("All Plants:", allPlants);
      } else {
        console.log("Please install MetaMask!");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const addPlant = async () => {
    try {
      if (window.ethereum) {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const contract = new ethers.Contract(contractAddress, contractABI, signer);

        // Convert the string numbers to BigInt
        const carbonEmissionBigInt = BigInt(form.carbonEmission);
        const carbonCreditsBigInt = BigInt(form.carbonCredits);

        const tx = await contract.addPlant(
          form.plantName,
          form.plantType,
          carbonEmissionBigInt,
          carbonCreditsBigInt
        );
        await tx.wait(); // Wait for transaction confirmation
        alert("Plant added successfully!");
      } else {
        alert("Please install MetaMask!");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error adding plant: " + error.message);
    }
  };
  
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <button onClick={viewPlants} style={{ padding: '10px', margin: '10px' }}>
        View All Plants
      </button>
      <div>
      <h2>Add Power Plant</h2>
      <form onSubmit={(e) => e.preventDefault()}>
        <input
          type="text"
          name="plantName"
          placeholder="Plant Name"
          value={form.plantName}
          onChange={handleChange}
          style={{ margin: '10px', padding: '5px' }}
        />
        <input
          type="text"
          name="plantType"
          placeholder="Plant Type"
          value={form.plantType}
          onChange={handleChange}
          style={{ margin: '10px', padding: '5px' }}
        />
        <input
          type="number"
          name="carbonEmission"
          placeholder="Carbon Emission (tons)"
          value={form.carbonEmission}
          onChange={handleChange}
          style={{ margin: '10px', padding: '5px' }}
        />
        <input
          type="number"
          name="carbonCredits"
          placeholder="Carbon Credits"
          value={form.carbonCredits}
          onChange={handleChange}
          style={{ margin: '10px', padding: '5px' }}
        />
        <button onClick={addPlant} style={{ padding: '10px', margin: '10px' }}>
          Add Plant
        </button>
      </form>
    </div>
    </div>
  );
};

export default PowerPlantViewer;