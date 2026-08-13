import { createRef } from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { Avatar } from "./Avatar";

describe("Avatar", () => {
  it("renders accessible initials when an image source is not provided", () => {
    render(<Avatar alt="김도니" size="lg" />);

    const avatar = screen.getByRole("img", { name: "김도니" });

    expect(avatar).toHaveTextContent("김도");
    expect(avatar.tagName).toBe("SPAN");
    expect(avatar.parentElement).toHaveAttribute("data-size", "lg");
  });

  it("uses the supplied image with its alternative text", () => {
    render(<Avatar alt="DDoni profile" src="https://example.com/ddoni.png" />);

    const image = screen.getByRole("img", { name: "DDoni profile" });

    expect(image.tagName).toBe("IMG");
    expect(image).toHaveAttribute("src", "https://example.com/ddoni.png");
  });

  it("shows the accessible fallback when the image cannot be loaded", () => {
    render(<Avatar alt="김도니" fallback="도니" src="https://example.com/missing.png" />);

    fireEvent.error(screen.getByRole("img", { name: "김도니" }));

    const fallback = screen.getByRole("img", { name: "김도니" });

    expect(fallback.tagName).toBe("SPAN");
    expect(fallback).toHaveTextContent("도니");
    expect(fallback.parentElement?.querySelector("img")).not.toBeInTheDocument();
  });

  it("tries a new image source after a previous source failed", () => {
    const { rerender } = render(<Avatar alt="DDoni" src="https://example.com/missing.png" />);

    fireEvent.error(screen.getByRole("img", { name: "DDoni" }));
    rerender(<Avatar alt="DDoni" src="https://example.com/profile.png" />);

    expect(screen.getByRole("img", { name: "DDoni" })).toHaveAttribute(
      "src",
      "https://example.com/profile.png",
    );
  });

  it("forwards native props, refs, and consumer class names", () => {
    const ref = createRef<HTMLSpanElement>();

    render(
      <Avatar
        ref={ref}
        alt="김도니"
        className="consumer-class"
        data-testid="avatar"
        title="프로젝트 소유자"
      />,
    );

    const avatar = screen.getByTestId("avatar");

    expect(ref.current).toBe(avatar);
    expect(avatar).toHaveClass("consumer-class");
    expect(avatar).toHaveAttribute("title", "프로젝트 소유자");
  });
});
