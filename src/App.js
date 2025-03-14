import React from 'react';
import logo from './heylogo.png';
import './App.css';
import Form from './Form';

function App() {
  const keys = ['environment', 'position', 'stance']; // Form keys for prompt

  return (
    <div className="App">
      <header className="App-header">
        <h1>Let's get marketing</h1>
        <img src={logo} className="App-logo" alt="logo" style={{ width: '50%', height: '50%' }} />
      </header>
      <main>
        <div>
          <Form></Form>
        </div>
      </main>
    </div>
  );
}

export default App;
