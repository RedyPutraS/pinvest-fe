type Props = {
  children?: React.ReactNode;
};

export const TabPanel = ({ children }: Props) => {
  return <div data-testid="tab-panel">{children}</div>;
};
