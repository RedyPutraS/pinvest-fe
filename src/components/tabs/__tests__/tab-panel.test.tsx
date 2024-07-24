import { render, screen } from "@testing-library/react";
import { TabPanel } from "../index";

describe("TabPanel", () => {
  it("renders TabPanel", () => {
    render(
      <TabPanel>
        <p>Tab Panel</p>
        <button>OK</button>
      </TabPanel>
    );

    expect(screen.getByText("Tab Panel")).toBeInTheDocument();
    expect(screen.getByText("OK")).toBeInTheDocument();
  });
});
