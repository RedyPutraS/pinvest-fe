import { createContext, useEffect, useState } from "react";

type Props = {
  children: React.ReactNode;
  initActiveTab?: number;
  onChangeTab?: (activeTab: number) => void;
};

export const TabContext = createContext<{
  activeTab: number;
  setActiveTab: ((index: number) => void) | null;
}>({ activeTab: 0, setActiveTab: null });

export const Tabs = ({ children, initActiveTab, onChangeTab }: Props) => {
  const [activeTab, setActiveTab] = useState(initActiveTab ?? 0);

  const handleChangeActiveTab = (activeTab: number) => {
    setActiveTab(activeTab);
    onChangeTab?.(activeTab);
  };

  useEffect(() => {
    if (initActiveTab) {
      setActiveTab(initActiveTab);
    }
  }, [initActiveTab]);

  return (
    <TabContext.Provider
      value={{ activeTab, setActiveTab: handleChangeActiveTab }}
    >
      {children}
    </TabContext.Provider>
  );
};
