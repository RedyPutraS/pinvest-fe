import React from "react";

type ActiveTabContextType = {
  activeTab: string;
  setActiveTab: (value: string) => void;
};

// Provide a default value for the context
const defaultActiveTabContextValue: ActiveTabContextType = {
  activeTab: "",
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setActiveTab: () => {},
};

export const ActiveTabContext = React.createContext<ActiveTabContextType>(
  defaultActiveTabContextValue
);
