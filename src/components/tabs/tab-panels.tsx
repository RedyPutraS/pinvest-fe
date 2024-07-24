import { useContext } from "react";
import { TabContext } from "./tabs";

type Props = {
  children?: React.ReactNode | React.ReactNode[];
};

export const TabPanels = ({ children }: Props) => {
  const { activeTab } = useContext(TabContext);

  if (Array.isArray(children)) return <>{children?.[activeTab]}</>;
  if (activeTab <= 0) return <>{children}</>;

  return null;
};
