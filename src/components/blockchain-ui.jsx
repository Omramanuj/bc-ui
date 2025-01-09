import { useState } from 'react';
import { getContract } from '../config';

export default function AddPlant() {
  const [plantData, setPlantData] = useState({
    name: '',
    type: '',
    energy: '',
    carbon: ''
  });
  const [loading, setLoading] = useState(false);
const [error, setError] = useState('');
const [success, setSuccess] = useState('');

const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);
  setError('');
  setSuccess('');

  // Validate inputs
  if (!plantData.energy || !plantData.carbon) {
    setError('Energy and carbon values are required');
    setLoading(false);
    return;
  }

  // Convert to valid numbers
  const energyValue = Number(plantData.energy);
  const carbonValue = Number(plantData.carbon);

  if (isNaN(energyValue) || isNaN(carbonValue)) {
    setError('Energy and carbon must be valid numbers');
    setLoading(false);
    return;
  }

  try {
    console.log('Fetching contract...');
    const contract = await getContract();
  
    console.log('Registering plant...');
    const tx1 = await contract.registerPlant(plantData.name, plantData.type);
    await tx1.wait();
  
    console.log('Recording generation...');
    const tx2 = await contract.recordGeneration(energyValue, carbonValue);
    await tx2.wait();
  
    setSuccess('Plant registered successfully!');
  } catch (err) {
    console.error('Error during transaction:', err);
    setError(err.message || 'Transaction failed');
  }
  
};

  return (
    <form onSubmit={handleSubmit}>
      <input
        placeholder="Plant Name"
        onChange={e => setPlantData({...plantData, name: e.target.value})}
      />
      <input
        placeholder="Plant Type"
        onChange={e => setPlantData({...plantData, type: e.target.value})}
      />
      <input
        type="number"
        placeholder="Energy (kWh)"
        onChange={e => setPlantData({...plantData, energy: e.target.value})}
      />
      <input
        type="number"
        placeholder="Carbon Emission (kg)"
        onChange={e => setPlantData({...plantData, carbon: e.target.value})}
      />
      <button type="submit">Add Plant</button>
    </form>
  );
}