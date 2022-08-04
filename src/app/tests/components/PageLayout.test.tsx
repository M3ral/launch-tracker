import { render, screen } from "@testing-library/react";
import {
  PageLayout,
  PageLayoutProps,
} from "../../components/PageLayout/PageLayout";

const mockProps: PageLayoutProps = {
  header: <h1>Welcome to my app</h1>,
  content: <h2>Example heading for the content area</h2>,
};

describe("components/PageLayout", () => {
  it("should have all the required props rendered", () => {
    render(<PageLayout {...mockProps} />);
    expect(screen.getByLabelText("header-section")).toBeInTheDocument();
    expect(screen.getByLabelText("content-section")).toBeInTheDocument();
  });
});
