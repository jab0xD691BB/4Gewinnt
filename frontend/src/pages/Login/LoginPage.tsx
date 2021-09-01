import React, { useRef, useState, ChangeEvent, useContext} from "react";
import { Button } from "./components/Button";
import { Input } from "./components/Input";
import { LoginMask, LoginMaskHolder, LogoHolder }  from "./LoginMask";
import {Logo} from "../../components/Logo";
import {
  authContext,
  LoginOptions,
} from "../../context/AuthenticationContext";
import { Link } from "react-router-dom";
import { UnauthenticatedLayout } from "../../components/UnauthenticatedLayout";


export const LoginPage = () => {
  const auth = useContext(authContext);
  const [values, setValues] = useState<LoginOptions>({
    email: "",
    password: "",
  });
  const [formError, setFormError] = useState<string | null>(null);
  const fieldDidChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  const onSubmitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormError(null);
    try {
      await auth.actions.login(values);
    } catch (e) {
      setFormError(e.message);
    }
  };
  return (
    <UnauthenticatedLayout>
      <LoginMaskHolder>
        <form onSubmit={onSubmitForm}>
          <LoginMask>
            <LogoHolder>
              <Logo />
            </LogoHolder>
            <p style={{ color: "#000", textAlign: "center" }}>{formError}</p>
            <Input
              name="email"
              type="email"
              label="Email"
              onChange={fieldDidChange}
              required
            />
            <Input
              name="password"
              label="Password"
              type="password"
              onChange={fieldDidChange}
              required
            />
            <Button type="submit">Log In</Button>
            <Link to="/register">Register</Link>
          </LoginMask>
        </form>
      </LoginMaskHolder>
    </UnauthenticatedLayout>
  );
};