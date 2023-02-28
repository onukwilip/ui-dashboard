import { fireEvent, render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Dashboard, { Header } from "../pages/Dashboard";

describe("Dashboard component test", () => {
  const MockDashboard = () => (
    <BrowserRouter>
      <Dashboard />
    </BrowserRouter>
  );
  const MockHeader = () => (
    <BrowserRouter>
      <Header />
    </BrowserRouter>
  );
  test("should render dashboard component", async () => {
    render(<MockDashboard />);
  });
  describe("Header component test", () => {
    test("should render Header component", () => {
      render(<MockHeader />);
    });

    test("should display logo", () => {
      render(<MockHeader />);
      const logoElement = screen.getByAltText(/logo/i);
      expect(logoElement).toBeInTheDocument();
    });

    test("should display search on desktop view", () => {
      render(<MockHeader />);
      const searchElement = screen.getByPlaceholderText(/Search for anything/i);
      expect(searchElement).toBeInTheDocument();
    });

    test("should display user profile on desktop view", () => {
      render(<MockHeader />);
      const profileImage = screen.getByAltText(/profile pic/i);
      const bellIcon = screen.getByTestId(/bell/i);
      const linkElement = screen.getByText(/Docs/i);
      expect(bellIcon).toBeInTheDocument();
      expect(linkElement).toBeInTheDocument();
      expect(profileImage).toBeInTheDocument();
    });

    test("should toogle Menu component on toogle icon click", async () => {
      render(<MockHeader />);
      const toogleIcon = screen.getByTestId(/showMenu/i);
      const queryMenuElement = screen.queryByTestId(/mobileMenu/i);
      expect(queryMenuElement).not.toBeInTheDocument();
      fireEvent.click(toogleIcon);
      const getMenuElement = screen.getByTestId(/mobileMenu/i);
      expect(getMenuElement).toBeInTheDocument();
      fireEvent.click(toogleIcon);
      setTimeout(() => {
        expect(getMenuElement).not.toBeInTheDocument();
      }, [1000 * 3]);
    });

    test("should hide Menu component on hide icon click", async () => {
      render(<MockHeader />);
      const showMenuIcon = screen.getByTestId(/showMenu/i);
      const queryMenuElement = screen.queryByTestId(/mobileMenu/i);
      expect(queryMenuElement).not.toBeInTheDocument();
      fireEvent.click(showMenuIcon);
      const getMenuElement = screen.getByTestId(/mobileMenu/i);
      expect(getMenuElement).toBeInTheDocument();

      const hideMenuIcon = screen.getByTestId(/hideMenu/i);
      fireEvent.click(hideMenuIcon);

      setTimeout(() => {
        expect(getMenuElement).not.toBeInTheDocument();
      }, [1000 * 3]);
    });

    test("should show Menu component and children on toogle icon click", async () => {
      render(<MockHeader />);
      const showMenuIcon = screen.getByTestId(/showMenu/i);
      const queryMenuElement = screen.queryByTestId(/mobileMenu/i);
      expect(queryMenuElement).not.toBeInTheDocument();
      fireEvent.click(showMenuIcon);
      const getMenuElement = screen.getByTestId(/mobileMenu/i);
      expect(getMenuElement).toBeInTheDocument();

      const hideMenuIcon = screen.getByTestId(/hideMenu/i);
      const searchContainer = screen.getByTestId(/mobileSearchContainer/i);
      const profileContainer = screen.getByTestId(/mobileProfileContainer/i);
      const menuContainer = screen.getByTestId("menu");

      expect(hideMenuIcon).toBeInTheDocument();
      expect(searchContainer).toBeInTheDocument();
      expect(profileContainer).toBeInTheDocument();
      expect(menuContainer).toBeInTheDocument();
    });

    // test("should not display toogle icon on desktop view", () => {
    //   render(<Header />);
    //   const toogleElement = screen.getByTestId(/showMenu/i);
    //   expect(toogleElement).not.toBeVisible();
    // });

    // test("should not display profile and search containers when screen width is less than 761px", () => {
    //   render(<Header />);
    //   window.innerWidth = 760;
    //   const searchContainer = screen.getByTestId(/searchContainer/i);
    //   const profileContainer = screen.getByTestId(/profileContainer/i);
    //   expect(searchContainer).not.toBeVisible();
    //   expect(profileContainer).not.toBeVisible();
    // });
  });
});
