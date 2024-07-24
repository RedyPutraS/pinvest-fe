import { render, screen } from "@testing-library/react";
import { TabContext, TabPanel, TabPanels } from "../index";

describe("TabPanels", () => {
  it("renders TabPanels with one child.", () => {
    render(
      <TabContext.Provider value={{ activeTab: 0, setActiveTab: jest.fn() }}>
        <TabPanels>
          <TabPanel>
            <p>Hello</p>
          </TabPanel>
        </TabPanels>
      </TabContext.Provider>
    );

    expect(screen.queryAllByTestId("tab-panel").length).toBe(1);
  });

  it("renders TabPanels when the active panel is not available (out of bounds).", () => {
    render(
      <TabContext.Provider value={{ activeTab: 2, setActiveTab: jest.fn() }}>
        <TabPanels>
          <TabPanel>
            <p>Hello</p>
          </TabPanel>
        </TabPanels>
      </TabContext.Provider>
    );

    expect(screen.queryByTestId("tab-panel")).not.toBeInTheDocument();
  });

  it("renders TabPanels with multiple child.", () => {
    render(
      <TabContext.Provider value={{ activeTab: 1, setActiveTab: jest.fn() }}>
        <TabPanels>
          <TabPanel>
            <p>Hello 1</p>
          </TabPanel>
          <TabPanel>
            <p>Hello 2</p>
          </TabPanel>
          <TabPanel>
            <p>Hello 3</p>
          </TabPanel>
        </TabPanels>
      </TabContext.Provider>
    );

    expect(screen.queryAllByTestId("tab-panel").length).toBe(1);

    expect(screen.queryByText("Hello 2")).toBeInTheDocument();
    expect(screen.queryByText("Hello 3")).not.toBeInTheDocument();
    expect(screen.queryByText("Hello 4")).not.toBeInTheDocument();
  });
});
