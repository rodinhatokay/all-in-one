import "./App.css";
import BusinessForm from "./components/BusinessForm";
import { AioBackContextProvider } from "./context/AioBackContext";
import { BasicTable } from "./components/TableView";
import { useState } from "react";

import { AppBar, Tabs, Tab } from "@material-ui/core";
function App() {
  const [currentTab, setCurrentTab] = useState(0);

  const handleTabChange = (event, newValue) => {
    setCurrentTab(newValue);
  };
  
  return (
    <>
      <AppBar position="static">
        <Tabs value={currentTab} onChange={handleTabChange}>
          <Tab label="Business Form" />
          <Tab label="Basic Table" />
        </Tabs>
      </AppBar>
      {currentTab === 0 && (
        <AioBackContextProvider>
          <BusinessForm />
        </AioBackContextProvider>
      )}
      {currentTab === 1 && (
        <AioBackContextProvider>
          <BasicTable />
        </AioBackContextProvider>
      )}
    </>
  );
}

export default App;
