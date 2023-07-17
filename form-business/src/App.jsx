import "./App.css";
import BusinessForm from "./components/BusinessForm";
import { AioBackContextProvider } from "./context/AioBackContext";

function App() {
  return (
    <AioBackContextProvider>
      <BusinessForm />
    </AioBackContextProvider>
  );
}

export default App;
