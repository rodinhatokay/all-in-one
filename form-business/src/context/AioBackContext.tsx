import React, { createContext, useMemo } from "react";
import { AioBackClient } from "../clients/AioBackClient";
import axiosApp from "../clients/api";

export const AioBackContext = createContext<AioBackClient | null>(null);

export const AioBackContextProvider: React.FC<{
	children: React.ReactNode;
}> = ({ children }) => {
	const client = useMemo(() => new AioBackClient(axiosApp), []);
	return (
		<AioBackContext.Provider value={client}>{children}</AioBackContext.Provider>
	);
};

export const useAioBackClient = (): AioBackClient => {
	const AioBackClient = React.useContext(AioBackContext);
	if (!AioBackClient) {
		throw new Error(
			"useAioBackClient must be used within a AioBackContextProvider"
		);
	}
	return AioBackClient;
};
