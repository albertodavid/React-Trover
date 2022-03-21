import Pages from './Pages/Pages.jsx';
import { BrowserRouter } from "react-router-dom";

require('./App.css');

function App() {
  return (
    <div>
      <BrowserRouter>
      <Pages />
      </BrowserRouter>
    </div>
    );
}

export default App;
