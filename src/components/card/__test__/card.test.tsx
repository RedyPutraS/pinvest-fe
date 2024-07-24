import { render, screen } from "@testing-library/react";
import Image from "next/image";
import { Card, CardBody, CardImage } from "../";

describe("Card", () => {
  it("renders card", () => {
    render(
      <Card>
        <p>Card</p>
      </Card>
    );

    const card = screen.getByTestId("card");
    expect(card).toHaveClass("rounded overflow-hidden");
  });

  it("renders card with custom class", () => {
    render(
      <Card className="overflow-auto rounded-xl">
        <p>Card</p>
      </Card>
    );

    const card = screen.getByTestId("card");
    expect(card).not.toHaveClass("rounded overflow-hidden");
    expect(card).toHaveClass("rounded-xl overflow-auto");
  });
});

describe("Integration Card", () => {
  it("renders card integrated with other components", () => {
    render(
      <Card>
        <CardImage>
          <Image
            src="/temp-assets/article-thumbnail.png"
            alt="Article 1"
            fill
          />
        </CardImage>
        <CardBody>
          <p className="mt-4 text-2xl font-bold">Title</p>
          <p className="mt-4 text-neutral-400">Description</p>
        </CardBody>
      </Card>
    );

    const image = screen.getByAltText("Article 1");
    expect(image).toBeInTheDocument();

    const title = screen.getByText("Title");
    expect(title).toBeInTheDocument();

    const description = screen.getByText("Description");
    expect(description).toBeInTheDocument();

    const cardBody = screen.getByTestId("card-body");
    expect(cardBody).toBeInTheDocument();

    const cardImage = screen.getByTestId("card-image");
    expect(cardImage).toBeInTheDocument();

    const card = screen.getByTestId("card");
    expect(card).toBeInTheDocument();
  });
});
