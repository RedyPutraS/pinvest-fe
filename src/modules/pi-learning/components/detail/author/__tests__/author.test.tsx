import { render, screen } from "@testing-library/react";
import Author from "..";

describe("render author", () => {
  it("should render author", () => {
    render(
      <Author
        author="Dian"
        publishedAt="2021-03-11 12:00:00"
        subcategory="Pendidikan"
      />
    );

    expect(screen.getByText("Dian")).toBeInTheDocument();
    expect(
      screen.getByText("Thursday, 11 March 2021, 12:00")
    ).toBeInTheDocument();
    expect(screen.getByText("Bagikan Artikel Ini")).toBeInTheDocument();
    expect(screen.getByText("Pendidikan")).toBeInTheDocument();
  });
});
