import Pages from './Pages/Pages.jsx';
import { BrowserRouter } from "react-router-dom";
import Navbar from './Components/Navbar.jsx';

require('./App.css');

function App() {
  return (
    <div>
      <BrowserRouter>
      <Navbar />
      <Pages />
      </BrowserRouter>
    </div>
    );
}

export default App;
