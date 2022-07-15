import './App.css';
import DatePicker from './components/DatePicker';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <span>
        Nous sommes le {new Date().toLocaleString('default', {weekday:'long', day:'2-digit' ,month:'long', year:'numeric'})}
        <br/>  
        Au chargement de cette page il était {new Date().toLocaleString('default', {hour:'2-digit', minute:'2-digit', hourCycle:'h12'})}
        </span>
      <DatePicker />
      </header>
    </div>
  );
}

export default App;
