import { ethers } from 'ethers';

export const CONTRACT_ABI = [
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "plantAddress",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "energy",
				"type": "uint256"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "carbon",
				"type": "uint256"
			}
		],
		"name": "GenerationRecorded",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "plantAddress",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "name",
				"type": "string"
			},
			{
				"indexed": false,
				"internalType": "string",
				"name": "plantType",
				"type": "string"
			}
		],
		"name": "PlantRegistered",
		"type": "event"
	},
	{
		"inputs": [],
		"name": "getAllPlants",
		"outputs": [
			{
				"components": [
					{
						"internalType": "string",
						"name": "name",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "plantType",
						"type": "string"
					},
					{
						"internalType": "address",
						"name": "owner",
						"type": "address"
					},
					{
						"components": [
							{
								"internalType": "uint256",
								"name": "timestamp",
								"type": "uint256"
							},
							{
								"internalType": "uint256",
								"name": "energyGenerated",
								"type": "uint256"
							},
							{
								"internalType": "uint256",
								"name": "carbonEmission",
								"type": "uint256"
							}
						],
						"internalType": "struct EnergyGeneration.GenerationRecord[]",
						"name": "records",
						"type": "tuple[]"
					}
				],
				"internalType": "struct EnergyGeneration.PlantWithEmissions[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getPlantCount",
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
				"internalType": "address",
				"name": "plantAddress",
				"type": "address"
			}
		],
		"name": "getPlantRecords",
		"outputs": [
			{
				"components": [
					{
						"internalType": "uint256",
						"name": "timestamp",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "energyGenerated",
						"type": "uint256"
					},
					{
						"internalType": "uint256",
						"name": "carbonEmission",
						"type": "uint256"
					}
				],
				"internalType": "struct EnergyGeneration.GenerationRecord[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "plants",
		"outputs": [
			{
				"internalType": "string",
				"name": "name",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "plantType",
				"type": "string"
			},
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_energyGenerated",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "_carbonEmission",
				"type": "uint256"
			}
		],
		"name": "recordGeneration",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "_name",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_plantType",
				"type": "string"
			}
		],
		"name": "registerPlant",
		"outputs": [],
		"stateMutability": "nonpayable",
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
		"name": "registeredPlants",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
];

export const CONTRACT_ADDRESS = "0x5FbDB2315678afecb367f032d93F642f64180aa3";

export const getContract = async () => {
  if (!window.ethereum) {
    throw new Error("Please install MetaMask");
  }

  try {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    
    const contract = new ethers.Contract(
      CONTRACT_ADDRESS,
      CONTRACT_ABI,
      signer
    );

    return contract;
  } catch (error) {
    console.error("Error getting contract:", error);
    throw error;
  }
};