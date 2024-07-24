import { act, render, screen } from "@testing-library/react";
import { Tab, TabList, TabPanel, TabPanels, Tabs } from "../index";

describe("Tabs", () => {
  it("Should render tabs", () => {
    render(
      <Tabs>
        <TabList>
          <Tab>Tab 1</Tab>
          <Tab>Tab 2</Tab>
          <Tab>Tab 3</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>Panel 1</TabPanel>
          <TabPanel>Panel 2</TabPanel>
          <TabPanel>Panel 3</TabPanel>
        </TabPanels>
      </Tabs>
    );

    expect(screen.queryByText("Panel 1")).toBeInTheDocument();
    expect(screen.queryByText("Panel 2")).not.toBeInTheDocument();
    expect(screen.queryByText("Panel 3")).not.toBeInTheDocument();

    expect(screen.queryByText("Tab 1")).toBeInTheDocument();
    expect(screen.queryByText("Tab 2")).toBeInTheDocument();
    expect(screen.queryByText("Tab 3")).toBeInTheDocument();

    act(() => {
      screen.getByText("Tab 2").click();
    });

    expect(screen.queryByText("Panel 1")).not.toBeInTheDocument();
    expect(screen.queryByText("Panel 2")).toBeInTheDocument();
    expect(screen.queryByText("Panel 3")).not.toBeInTheDocument();
  });
});
