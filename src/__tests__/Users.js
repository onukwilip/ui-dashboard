import { fireEvent, render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import { UsersTab } from "../components/UsersTab";

describe("User component test", () => {
  const MockUserTab = () => (
    <BrowserRouter>
      <UsersTab />
    </BrowserRouter>
  );

  test("should render UserTab component", () => {
    render(<MockUserTab />);
    const userTab = screen.getByTestId("users");
    expect(userTab).toBeInTheDocument();
  });
});
