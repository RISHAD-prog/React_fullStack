
import { useLoaderData } from 'react-router-dom'
import './App.css'
import { useState } from 'react';
import AvailableCoffees from './components/pages/AvailableCoffees/AvailableCoffees';

function App() {
  const loadedcoffees = useLoaderData();
  const [coffees, setCoffees] = useState(loadedcoffees);

  return (
    <div className='m-20'>
      <h1 className='text-6xl text-center my-20 text-purple-600'>Hot Hot Cold Coffee: {coffees.length}</h1>
      <div className='grid md:grid-cols-2 gap-4'>
        {
          coffees.map(coffee => <AvailableCoffees
            key={coffee._id}
            coffee={coffee}
            coffees={coffees}
            setCoffees={setCoffees}
          ></AvailableCoffees>)
        }
      </div>
    </div>
  )
}

export default App
