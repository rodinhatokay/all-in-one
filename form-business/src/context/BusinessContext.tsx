import React, { createContext, useMemo } from "react";
import { BusinessClient } from "../clients/BusinessClient";
import config from '../config';

export const BusinessContext = createContext<BusinessClient | null>(null);

const baseUrl = config.baseUrl
const authToken = config.authToken;

export const BusinessProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const client = useMemo(() => new BusinessClient(baseUrl, authToken), []);
  return (
    <BusinessContext.Provider value={client}>
      {children}
    </BusinessContext.Provider>
  );
};

export const useBusinessClient = (): BusinessClient => {
  const businessClient = React.useContext(BusinessContext);
  if (!businessClient) {
    throw new Error("useBusinessClient must be used within a BusinessProvider");
  }
  return businessClient;
};
