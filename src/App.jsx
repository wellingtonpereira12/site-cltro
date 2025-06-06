import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import CreateAccount from './pages/CreateAccount';
import Download from './pages/Download';


export default function App() {
  return (
    <Router>
      <nav>
        <Link to="/">Home</Link>
        <Link to="/criar-conta">Crie sua conta</Link>
        <Link to="/download">Download</Link>
      </nav>
      <div className="content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/criar-conta" element={<CreateAccount />} />
          <Route path="/download" element={<Download />} />
        </Routes>
      </div>
    </Router>
  );
}
