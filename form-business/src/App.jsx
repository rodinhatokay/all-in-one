import "./App.css";
import BusinessForm from "./components/BusinessForm";
import { BusinessProvider } from "./context/BusinessContext";

function App() {
  return (
    <BusinessProvider>
      <BusinessForm />
    </BusinessProvider>
  );
}

export default App;
