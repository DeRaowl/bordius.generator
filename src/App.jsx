import { useState } from 'react';
import reactLogo from './assets/react.svg';
import './App.css';
import Box from './components/Box';

function App() {
  const [count, setCount] = useState(0);

  return (
    <main className="App">
      <h1 className="heading">Bordius Generator</h1>
      <Box />
    </main>
  );
}

export default App;
