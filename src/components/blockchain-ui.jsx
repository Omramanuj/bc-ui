import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Alert, AlertDescription } from '@/components/ui/alert';

const EnergyDashboard = ({ contractAddress, contractABI }) => {
  const [plants, setPlants] = useState([]);
  const [generationData, setGenerationData] = useState([]);
  const [account, setAccount] = useState(null);
  const [isRegistering, setIsRegistering] = useState(false);
  const [txPending, setTxPending] = useState(false);
  const [error, setError] = useState('');
  
  // Form states
  const [plantName, setPlantName] = useState('');
  const [plantType, setPlantType] = useState('');
  const [energyAmount, setEnergyAmount] = useState('');
  const [carbonAmount, setCarbonAmount] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const contract = new ethers.Contract(contractAddress, contractABI, provider);
        
        // Get all registered plants
        const plantCount = await contract.getPlantCount();
        const plantsData = [];
        
        for (let i = 0; i < plantCount; i++) {
          const plantAddress = await contract.registeredPlants(i);
          const plant = await contract.plants(plantAddress);
          const history = await contract.getGenerationHistory(plantAddress);
          
          plantsData.push({
            address: plantAddress,
            name: plant.name,
            type: plant.plantType,
            history: history.map(record => ({
              timestamp: new Date(record.timestamp * 1000).toLocaleDateString(),
              energy: parseInt(record.energyGenerated),
              carbon: parseInt(record.carbonEmission)
            }))
          });
        }
        
        setPlants(plantsData);
        
        // Prepare data for charts
        const chartData = plantsData.map(plant => ({
          name: plant.name,
          energy: plant.history.reduce((sum, record) => sum + record.energy, 0),
          carbon: plant.history.reduce((sum, record) => sum + record.carbon, 0)
        }));
        
        setGenerationData(chartData);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Failed to fetch data from blockchain');
      }
    };
    
    fetchData();
  }, [contractAddress, contractABI, txPending]);
  
  const connectWallet = async () => {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      await provider.send("eth_requestAccounts", []);
      const signer = provider.getSigner();
      const address = await signer.getAddress();
      setAccount(address);
    } catch (error) {
      setError('Failed to connect wallet');
    }
  };

  const registerPlant = async (e) => {
    e.preventDefault();
    setTxPending(true);
    setError('');
    
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(contractAddress, contractABI, signer);
      
      const tx = await contract.registerPlant(plantName, plantType);
      await tx.wait();
      
      setPlantName('');
      setPlantType('');
      setIsRegistering(false);
    } catch (error) {
      setError('Failed to register plant');
    } finally {
      setTxPending(false);
    }
  };

  const submitGeneration = async (e) => {
    e.preventDefault();
    setTxPending(true);
    setError('');
    
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(contractAddress, contractABI, signer);
      
      const tx = await contract.recordGeneration(
        ethers.utils.parseUnits(energyAmount, "0"),
        ethers.utils.parseUnits(carbonAmount, "0")
      );
      await tx.wait();
      
      setEnergyAmount('');
      setCarbonAmount('');
    } catch (error) {
      setError('Failed to submit generation data');
    } finally {
      setTxPending(false);
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Energy Generation Dashboard</h1>
        {!account ? (
          <Button onClick={connectWallet}>Connect Wallet</Button>
        ) : (
          <div className="text-sm text-gray-500">
            Connected: {account.slice(0, 8)}...
          </div>
        )}
      </div>

      {error && (
        <Alert variant="destructive" className="mb-6">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      
      {account && (
        <Card className="p-6 mb-6">
          {!isRegistering ? (
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold">Submit Data</h2>
              <Button onClick={() => setIsRegistering(true)}>Register New Plant</Button>
            </div>
          ) : (
            <form onSubmit={registerPlant} className="space-y-4">
              <h2 className="text-xl font-semibold">Register New Plant</h2>
              <div className="grid grid-cols-2 gap-4">
                <Input
                  placeholder="Plant Name"
                  value={plantName}
                  onChange={(e) => setPlantName(e.target.value)}
                />
                <Input
                  placeholder="Plant Type (solar, wind, etc.)"
                  value={plantType}
                  onChange={(e) => setPlantType(e.target.value)}
                />
              </div>
              <div className="flex gap-4">
                <Button type="submit" disabled={txPending}>
                  {txPending ? 'Registering...' : 'Register Plant'}
                </Button>
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setIsRegistering(false)}
                >
                  Cancel
                </Button>
              </div>
            </form>
          )}

          {!isRegistering && (
            <form onSubmit={submitGeneration} className="mt-4 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <Input
                  type="number"
                  placeholder="Energy Generated (kWh)"
                  value={energyAmount}
                  onChange={(e) => setEnergyAmount(e.target.value)}
                />
                <Input
                  type="number"
                  placeholder="Carbon Emissions (kg CO2)"
                  value={carbonAmount}
                  onChange={(e) => setCarbonAmount(e.target.value)}
                />
              </div>
              <Button type="submit" disabled={txPending}>
                {txPending ? 'Submitting...' : 'Submit Generation Data'}
              </Button>
            </form>
          )}
        </Card>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Energy Generation by Plant</h2>
          <BarChart width={500} height={300} data={generationData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="energy" fill="#4CAF50" name="Energy (kWh)" />
          </BarChart>
        </Card>
        
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Carbon Emissions by Plant</h2>
          <BarChart width={500} height={300} data={generationData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="carbon" fill="#FF5252" name="Carbon (kg CO2)" />
          </BarChart>
        </Card>
      </div>
      
      <div className="mt-6">
        <h2 className="text-xl font-semibold mb-4">Registered Power Plants</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {plants.map(plant => (
            <Card key={plant.address} className="p-4">
              <h3 className="font-bold">{plant.name}</h3>
              <p className="text-gray-600">Type: {plant.type}</p>
              <p className="text-sm text-gray-500">Address: {plant.address.slice(0, 8)}...</p>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EnergyDashboard;