import { render, screen } from "@testing-library/react";
import { Tab, TabContext } from "../index";

describe("Tab", () => {
  it("renders Tab when the tab is active", () => {
    const setActiveTab = jest.fn();
    render(
      <TabContext.Provider value={{ activeTab: 0, setActiveTab }}>
        <Tab index={0}>Tab 0</Tab>
      </TabContext.Provider>
    );

    const button = screen.getByText("Tab 0");
    expect(button.classList).toContain("text-sky-800");
    expect(button.classList).toContain("before:bg-sky-800");

    button.click();
    expect(setActiveTab).toHaveBeenCalledWith(0);
  });

  it("renders Tab when the tab is inactive", () => {
    const setActiveTab = jest.fn();

    render(
      <TabContext.Provider value={{ activeTab: 1, setActiveTab }}>
        <Tab index={0}>Tab 0</Tab>
        <Tab index={1}>Tab 1</Tab>
      </TabContext.Provider>
    );

    const button = screen.getByText("Tab 0");
    expect(button.classList).not.toContain("text-sky-800");
    expect(button.classList).not.toContain("before:bg-sky-800");

    expect(button.classList).toContain("text-neutral-400");
    expect(button.classList).toContain("before:border-transparent");

    button.click();
    expect(setActiveTab).toHaveBeenCalledWith(0);

    screen.getByText("Tab 1").click();
    expect(setActiveTab).toHaveBeenCalledWith(1);
  });
});
