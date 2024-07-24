import { render, screen } from "@testing-library/react";
import { CardBody } from "../";

describe("Card Body", () => {
  it("renders card body", () => {
    render(
      <CardBody>
        <p>Card Body</p>
      </CardBody>
    );

    const child = screen.getByText("Card Body");
    expect(child).toBeInTheDocument();

    const card = screen.getByTestId("card-body");
    expect(card).toHaveClass("p-4");
  });

  it("renders card body with custom class", () => {
    render(
      <CardBody className="p-2 text-black">
        <p>Hello World</p>
      </CardBody>
    );
    const card = screen.getByTestId("card-body");
    expect(card).toHaveClass("text-black");
    expect(card).toHaveClass("p-2");
    // p-4 is merged with p-2
    expect(card).not.toHaveClass("p-4");
  });
});
