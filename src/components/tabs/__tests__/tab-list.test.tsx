import { render, screen } from "@testing-library/react";
import { Tab, TabList } from "../index";

describe("TabList", () => {
  it("renders TabList with a single children", () => {
    render(
      <TabList>
        <Tab>One</Tab>
      </TabList>
    );

    const tab = screen.getAllByTestId("tab");
    expect(tab.length).toBe(1);
  });

  it("renders TabList with multiple children", () => {
    render(
      <TabList>
        <Tab>One</Tab>
        <Tab>Two</Tab>
        <Tab>Three</Tab>
        <Tab>Four</Tab>
      </TabList>
    );

    const tab = screen.getAllByTestId("tab");
    expect(tab.length).toBe(4);
  });

  it("renders TabList with multiple children with invalid children", () => {
    render(
      <TabList>
        <Tab>One</Tab>
        <Tab>Two</Tab>
        {null}
      </TabList>
    );

    const tab = screen.getAllByTestId("tab");
    expect(tab.length).toBe(2);
  });
});
