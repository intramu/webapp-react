import logo from './logo.svg';
import './App.css';
import { Link } from 'react-router-dom';
import LoginButton from './components/LoginButton';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Welcome to the temporary landing page of Intramu<br />
          Please login to access the website.
        </p>
        <LoginButton />
        <Link to='/dashboard'>Dashboard</Link>
      </header>
    </div>
  );
}

export default App;
