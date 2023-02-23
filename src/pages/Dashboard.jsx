import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { Icon, Input } from "semantic-ui-react";
import Menu from "../components/Menu";
import { UsersTab, UserDetails } from "../components/UsersTab";
import css from "../styles/dashboard/Dashboard.module.scss";

const Header = () => {
  return (
    <>
      <div className={css.header}>
        <div className={css["logo-container"]}>
          <img
            src="https://www.lendsqr.com/assets/icons/header-logo.svg"
            alt="logo"
          />
        </div>
        <div className={css["search-container"]}>
          <Input
            className={css.search}
            action={{
              color: "blue",
              icon: "search",
            }}
            actionPosition="right"
            placeholder="Search for anything"
          />
        </div>
        <div className={css["profile-container"]}>
          <a href="#">Docs</a>
          <Icon name="bell outline" />
          <div className={css.profile}>
            <img
              src="https://images.unsplash.com/photo-1463453091185-61582044d556?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"
              alt="profile pic"
            />
            <em>Prince Onukwili</em>
            <Icon name="caret down" />
          </div>
        </div>
      </div>
    </>
  );
};

const Dashboard = () => {
  return (
    <section className={css.dashboard}>
      <Header />
      <div className={css.body}>
        <div className={css.left}>
          <Menu />
        </div>
        <div className={css.right}>
          <Routes>
            <Route path="users" element={<UsersTab />} />
            <Route path="user/:id" element={<UserDetails />} />
            <Route path="user" element={<Navigate to="/dashboard/users" />} />
            <Route path="*" element={<UsersTab />} />
          </Routes>
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
