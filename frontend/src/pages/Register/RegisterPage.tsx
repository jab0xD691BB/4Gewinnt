import React, { useRef, useState, ChangeEvent, useContext} from "react";
import { Button } from "./components/Button";
import { Input } from "./components/Input";
import { RegisterMask as RegisterMask, RegisterMaskHolder as RegisterMaskHolder, LogoHolder }  from "./RegisterMask";
import {Logo} from "../../components/Logo";
import {
  authContext,
  RegisterOptions,
} from "../../context/AuthenticationContext";
import { Link } from "react-router-dom";
import { UnauthenticatedLayout } from "../../components/UnauthenticatedLayout";


export const RegisterPage = () => {
  const auth = useContext(authContext);
  const [values, setValues] = useState<RegisterOptions>({
    name: "",
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
      await auth.actions.register(values);
    } catch (e) {
      setFormError(e.message);
    }
  };
  return (
    <UnauthenticatedLayout>
      <RegisterMaskHolder>
        <form onSubmit={onSubmitForm}>
          <RegisterMask>
            <LogoHolder>
              <Logo />
            </LogoHolder>
            <p style={{ color: "#000", textAlign: "center" }}>{formError}</p>
            <Input
              name="name"
              type="text"
              label="Name"
              onChange={fieldDidChange}
              required
            />
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
            <Button type="submit">Register</Button>
            <Link to="/login">Back to Login</Link>
          </RegisterMask>
        </form>
      </RegisterMaskHolder>
    </UnauthenticatedLayout>
  );
};