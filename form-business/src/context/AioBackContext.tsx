import React, { createContext, useMemo } from "react";
import { AioBackClient } from "../clients/AioBackClient";
import config from '../config';

export const AioBackContext = createContext<AioBackClient | null>(null);

const baseUrl = config.baseUrl
const authToken = config.authToken;

export const AioBackContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const client = useMemo(() => new AioBackClient(baseUrl, authToken), []);
  return (
    <AioBackContext.Provider value={client}>
      {children}
    </AioBackContext.Provider>
  );
};

export const useAioBackClient = (): AioBackClient => {
  const AioBackClient = React.useContext(AioBackContext);
  if (!AioBackClient) {
    throw new Error("useAioBackClient must be used within a AioBackContextProvider");
  }
  return AioBackClient;
};
