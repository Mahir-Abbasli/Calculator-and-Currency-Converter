import Calculator from './features/calculator/Calculator';
import CurrencyConverter from './features/converter/CurrencyConverter';
import './App.css';

function App() {
  return (
    <div className="flex flex-col lg:flex-row h-screen  ">
      <div className="flex-1 bg-gray-200 p-4">
        <Calculator />
      </div>
      <div className="flex-1 bg-gray-300 flex items-center justify-center p-4">
        <CurrencyConverter />
      </div>
    </div>
  );
}

export default App;
