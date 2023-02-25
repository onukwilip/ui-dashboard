import { fireEvent, render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Login, { LoginForm } from "../pages/Login";
import { tooglePasswordType } from "../utils/utils";

describe("Login Component test", () => {
  const MockLogin = () => (
    <BrowserRouter>
      <Login />
    </BrowserRouter>
  );

  const MockLoginForm = ({ onSubmit, tooglePasswordType }) => (
    <BrowserRouter>
      <LoginForm onSubmit={onSubmit} tooglePasswordType={tooglePasswordType} />
    </BrowserRouter>
  );

  it("logo should be in the DOM and be visible", () => {
    render(<MockLogin />);
    const imgElement = screen.getByAltText("logo");
    expect(imgElement).toBeVisible();
  });

  it("background image should be in the DOM", () => {
    render(<MockLogin />);
    const imgElement = screen.getByAltText("svg");
    expect(imgElement).toBeVisible();
  });

  describe("Login form", () => {
    test("should render email and password input", () => {
      render(<MockLogin />);

      const emailInput = screen.getByPlaceholderText("Enter email");
      const passwordInput = screen.getByPlaceholderText("Enter password");

      expect(emailInput).toBeRequired();
      expect(passwordInput).toBeRequired();
    });

    test("password type should change when see more is clicked", () => {
      render(<MockLogin />);

      const toogleElement = screen.getByTestId("passwordToogle");
      const passwordInput = screen.getByPlaceholderText("Enter password");

      fireEvent.click(toogleElement);

      expect(passwordInput).toHaveAttribute("type", "text");
    });

    test("toogle password type should be called when see more is clicked", () => {
      let passwordType = "password";
      const mockSetPasswordType = jest.fn((value) => {
        passwordType = value;
      });
      const mockTooglePassword = jest.fn(() =>
        tooglePasswordType(passwordType, mockSetPasswordType)
      );

      render(<MockLoginForm tooglePasswordType={mockTooglePassword} />);

      const toogleElement = screen.getByTestId("passwordToogle");

      fireEvent.click(toogleElement);

      expect(mockTooglePassword).toBeCalled();
      expect(mockSetPasswordType).toBeCalled();
      expect(passwordType).toBe("text");
    });

    test("form submit handler should be called on button click", () => {
      const mockSubmitHandler = jest.fn();
      render(<MockLoginForm onSubmit={mockSubmitHandler} />);

      const submitFormElement = screen.getByRole("button", { type: "submit" });

      fireEvent.click(submitFormElement);

      expect(mockSubmitHandler).toBeCalled();
    });
  });
});
