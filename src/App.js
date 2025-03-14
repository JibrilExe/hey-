import logo from './heylogo.png';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Let's get marketing</h1>
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <main>
        <div>
          <h1>Image query</h1>
          <input type="text" id="titleInput" placeholder="Enter title here" />
        </div>
      </main>
    </div>
  );
}

export default App;
