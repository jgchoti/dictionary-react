import Dictionary from "./Dictionary"
import Footer from "./Footer"
import './App.css';

function App() {
  return (
    <div className="App">
      <h1> English Dictionary </h1>
      <Dictionary defaultKeyword="Dictionary" />
      <Footer />
    </div>
  );
}

export default App;
