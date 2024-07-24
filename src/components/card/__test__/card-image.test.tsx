import { render, screen } from "@testing-library/react";
import Image from "next/image";
import { CardImage } from "../";

describe("Card Image", () => {
  it("renders card image", () => {
    render(
      <CardImage>
        <Image src="/test.jpg" alt="test.jpg" fill />
      </CardImage>
    );

    const cardImage = screen.getByTestId("card-image");
    expect(cardImage).toHaveClass("aspect-video");

    const image = screen.getByAltText("test.jpg");
    expect(image).toBeInTheDocument();
  });
});
