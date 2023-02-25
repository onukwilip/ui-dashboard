import React, { useEffect, useRef, useState } from "react";
import { Button, Form, Icon } from "semantic-ui-react";
import css from "../styles/login/Login.module.scss";
import svgImg from "../assets/img/undraw_wishes_icyp.svg";
import { useNavigate } from "react-router-dom";

// https://www.lendsqr.com/assets/icons/header-logo.svg

export const LoginForm = ({ onSubmit, tooglePasswordType }) => {
  const [passwordType, setPasswordType] = useState("password");
  const navigate = useNavigate();

  const tooglePassword = () => {
    if (tooglePasswordType)
      return tooglePasswordType(passwordType, setPasswordType);

    if (passwordType === "password") {
      setPasswordType("text");
    } else {
      setPasswordType("password");
    }
  };

  const submitHandler = () => {
    if (onSubmit) return onSubmit();
    navigate("/dashboard", { replace: true });
  };

  return (
    <>
      <div className={css["login-form"]}>
        <div className={css.heading}>
          <h2>Welcome!</h2>
          <p>Enter details to login</p>
        </div>
        <br />
        <br />
        <Form
          className={css.form}
          onSubmit={submitHandler}
          data-testid="loginForm"
        >
          <Form.Input
            placeholder="Enter email"
            icon="mail"
            iconPosition="left"
            type="email"
            required
          />
          <div className={css["password-container"]}>
            <div className={css["password-input"]}>
              <Form.Input
                placeholder="Enter password"
                icon="key"
                iconPosition="left"
                type={passwordType}
                minLength={8}
                required
              />
            </div>

            <div
              className={css.toogle}
              onClick={tooglePassword}
              data-testid="passwordToogle"
            >
              <Icon name={passwordType === "password" ? "eye" : "eye slash"} />
            </div>
          </div>

          <a href="#" className={css["forgot-password"]}>
            Forgotten password?
          </a>
          <br />
          <div className="actions">
            <Button animated="fade" className="my-button">
              <Button.Content visible>Log in</Button.Content>
              <Button.Content hidden>
                <Icon name="arrow right" />
              </Button.Content>
            </Button>
          </div>
        </Form>
      </div>
    </>
  );
};

const Login = () => {
  return (
    <section className={css.login}>
      <div className={css.left}>
        <div className={css["logo-container"]}>
          <img
            src="https://www.lendsqr.com/assets/icons/header-logo.svg"
            alt="logo"
          />
        </div>
        <div className={css["svg-container"]}>
          <img src={svgImg} alt="svg" />
        </div>
      </div>
      <div className={css.right}>
        <LoginForm />
      </div>
    </section>
  );
};

export default Login;
