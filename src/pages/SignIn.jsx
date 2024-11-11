import React, { useState } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import { Navigate, useNavigate, Link } from "react-router-dom";
import { Header } from "../components/Header";
import { useDispatch, useSelector } from "react-redux";
import { signIn } from "../Slices/authSlice";
import { url } from "../const";
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';


export const SignIn = () => {
  const auth = useSelector((state) => state.auth.isSignIn);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState();
  const [, setCookie] = useCookies();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const onSignIn = () => {
    axios
      .post(`${url}/signin`, { email: email, password: password })
      .then((res) => {
        setCookie("token", res.data.token);
        dispatch(signIn());
        navigate("/");
      })
      .catch((err) => {
        setErrorMessage(`サインインに失敗しました。${err}`);
      });
  };

  if (auth)
    return (
      <>
        <Navigate to="/" />
      </>
    );

  return (
    <>
      <Header />
      <main className="signin">
        <h2>サインイン</h2>
        <p className="error-message">{errorMessage}</p>
        <form className="signin-form">
          <br />
          <TextField
            type="email"
            id="standard-basic"
            label="e-mail"
            variant="standard"
            onChange={handleEmailChange}
          />
          <br />
          <br />
          <TextField
            type="password"
            id="standard-basic"
            label="password"
            variant="standard"
            onChange={handlePasswordChange}
          />
          <br />
          <br />
          <br />
          <Button
            type="button"
            variant="contained"
            onClick={onSignIn}
          >
            サインイン
          </Button>
        </form>
        <br />
        <br />
        <Link to="/signup">アカウント新規作成</Link>
        <div>
          <br />
          <br />
          <Link to={`/`}>未ログイン</Link>
        </div>
      </main>
    </>
  );
};
