import Pages from './Pages/Pages.jsx';
import { BrowserRouter } from "react-router-dom";
import Warning from './Components/Warning.jsx';
require('./App.css');

function App() {
  return (
    <div>
      <BrowserRouter>
      <Pages />
      <Warning />
      </BrowserRouter>
    </div>
    );
}

export default App;
