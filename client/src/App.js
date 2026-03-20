import logo from './logo.svg';
import './App.css';

function App() {
  const navStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '1rem 2rem',
    backgroundColor: '#282c34',
    color: 'white',
    flexWrap: 'wrap',
    borderBottom: '1px solid #444'
  };

  const logoStyle = {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    margin: '0.5rem 0'
  };

  const navLinksStyle = {
    display: 'flex',
    gap: '1.5rem',
    listStyle: 'none',
    margin: 0,
    padding: 0,
    flexWrap: 'wrap'
  };

  const linkStyle = {
    color: 'white',
    textDecoration: 'none',
    cursor: 'pointer',
    fontSize: '1rem'
  };

  return (
    <div className="App">
      <nav style={navStyle}>
        <div style={logoStyle}>GymApp</div>
        <ul style={navLinksStyle}>
          <li><a style={linkStyle} href="#home">Home</a></li>
          <li><a style={linkStyle} href="#about">About</a></li>
          <li><a style={linkStyle} href="#contact">Contact</a></li>
        </ul>
      </nav>
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
