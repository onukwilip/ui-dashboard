import { AnimatePresence, motion } from "framer-motion";
import React, { useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { Icon, Input } from "semantic-ui-react";
import Menu from "../components/Menu";
import { UsersTab, UserDetails } from "../components/UsersTab";
import css from "../styles/dashboard/Dashboard.module.scss";

const MobileMenu = ({ toogleMenu }) => {
  const variants = {
    initial: {
      // opacity: 0.5,
      x: -100,
    },
    animate: {
      // opacity: 1,
      x: 0,
    },
    exit: {
      // opacity: 0,
      x: -1000,
    },
  };
  return (
    <motion.div
      variants={variants}
      initial="initial"
      animate="animate"
      exit="exit"
      className={css["mobile-menu"]}
    >
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

        <div
          className={css["icon-container"]}
          onClick={(e) => toogleMenu((prev) => !prev)}
        >
          <i className="fa-solid fa-xmark"></i>
        </div>
      </div>
      <div className={css["profile-container"]}>
        <div className={css.profile}>
          <img
            src="https://images.unsplash.com/photo-1463453091185-61582044d556?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80"
            alt="profile pic"
          />
          <em>Prince Onukwili</em>
          <Icon name="caret down" />
        </div>
        <a href="#">Docs</a>
        <Icon name="bell outline" />
      </div>
      <Menu />
    </motion.div>
  );
};

const Header = () => {
  const [showmenu, setShowmenu] = useState(false);

  return (
    <>
      <AnimatePresence>
        {showmenu && <MobileMenu toogleMenu={setShowmenu} />}
      </AnimatePresence>

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
        <div
          className={css["icon-container"]}
          onClick={(e) => setShowmenu((prev) => !prev)}
        >
          <i className="fa-solid fa-bars-progress"></i>
        </div>
      </div>
    </>
  );
};

const Dashboard = () => {
  return (
    <section className={css.dashboard} data-testId="dashboard">
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
