import React from "react";
import css from "../styles/menu/Menu.module.scss";
import { NavLink } from "react-router-dom";
import { MenuClass } from "../utils/utils";
import { Icon } from "semantic-ui-react";

const Menu = () => {
  const menus = {
    customers: [
      new MenuClass("Users", "users icon", "/dashboard/users"),
      new MenuClass("Guarantors", "user icon", "/dashboard/guarantors"),
      new MenuClass("Loans", "fa-solid fa-sack-dollar", "/dashboard/loans"),
      new MenuClass("Decision models", "icon handshake", "/dashboard/decision"),
      new MenuClass("Savings", "fa-solid fa-piggy-bank", "/dashboard/savings"),
      new MenuClass(
        "Loan requests",
        "fa-solid fa-hand-holding-dollar",
        "/dashboard/loan-requests"
      ),
      new MenuClass(
        "Whitelist",
        "fa-solid fa-user-check",
        "/dashboard/whitelist"
      ),
      new MenuClass("Karma", "fa-solid fa-user-xmark", "/dashboard/karma"),
    ],
    businesses: [
      new MenuClass(
        "Organization",
        "briefcase icon",
        "/dashboard/organizations"
      ),
      new MenuClass(
        "Loan products",
        "fa-solid fa-hand-holding-dollar",
        "/dashboard/loan-products"
      ),
      new MenuClass(
        "Savings products",
        "fa-solid fa-piggy-bank",
        "/dashboard/savings-products"
      ),
      new MenuClass(
        "Fees and charges",
        "fa-solid fa-file-invoice",
        "/dashboard/fees-and-charges"
      ),
      new MenuClass(
        "Transactions",
        "fa-solid fa-money-check-dollar",
        "/dashboard/transactions"
      ),
      new MenuClass(
        "Services",
        "fa-solid fa-satellite-dish",
        "/dashboard/services"
      ),
      new MenuClass(
        "Service account",
        "fa-solid fa-user-gear",
        "/dashboard/service-account"
      ),
      new MenuClass(
        "Settlements",
        "fa-solid fa-scroll",
        "/dashboard/settlements"
      ),
      new MenuClass("Reports", "icon chart bar outline", "/dashboard/reports"),
    ],
    settings: [
      new MenuClass(
        "Preferences",
        "fa-solid fa-sliders",
        "/dashboard/preferences"
      ),
      new MenuClass(
        "Fees and pricing",
        "fa-solid fa-money-bill-wave",
        "/dashboard/fees-and-pricing"
      ),
      new MenuClass("Audit logs", "fa-solid fa-file-pdf", "/dashboard/audit"),
    ],
  };

  return (
    <>
      <section className={css.menu} data-testid="menu">
        <p className={css["drop-down"]}>
          <Icon name="briefcase" /> &nbsp;
          <em>
            Switch organization &nbsp;
            <Icon name="caret down" />
          </em>
        </p>
        <div className={css.tab}>
          <p>
            <Icon name="home"></Icon>
            <em>Dashboard</em>
          </p>
          <ul>
            {Object.entries(menus)?.map(([key, menu], i) => (
              <div className={css["each-list-container"]} key={key}>
                <em key={key} className={css.title}>
                  {key}
                </em>
                {menu?.map((eachItem, i2) => (
                  <NavLink
                    className={({ isActive }) =>
                      isActive
                        ? `${css["each-menu"]} ${css.active}`
                        : `${css["each-menu"]}`
                    }
                    to={eachItem?.slug}
                  >
                    <li>
                      <div>
                        <i className={eachItem?.icon}></i>
                      </div>
                      <div className={css["em-container"]}>
                        <em>{eachItem?.name}</em>
                      </div>
                    </li>
                  </NavLink>
                ))}
              </div>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
};

export default Menu;
