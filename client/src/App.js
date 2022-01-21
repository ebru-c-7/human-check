import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import FormComponent from "./components/Form";

function App() {
  return (
    <div className="app">
      <header className="header">
        <h1>Are you human?</h1>
      </header>
      <div className="content">
        <FormComponent />
      </div>
    </div>
  );
}

export default App;
