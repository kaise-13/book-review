import { useCookies } from "react-cookie";
import { useSelector, useDispatch } from "react-redux/es/exports";
import { useNavigate } from "react-router-dom";
import { signOut } from "../../Slices/authSlice";
import { BackButon } from "./BackButton";
import "./header.css";
import Button from '@mui/material/Button';

export const Header = () => {
  const auth = useSelector((state) => state.auth.isSignIn);
  const [, , removeCookie] = useCookies();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSignOut = () => {
    dispatch(signOut());
    removeCookie("token");
    navigate("/signin");
  };
  const goToLogInPage = () => {
    navigate("/signin");
  };

  return (
    <header className="header">
      <h1>書籍レビュー</h1>
      <BackButon style={{ marginRight: '8px' }} />
      {auth ? (
        <Button onClick={handleSignOut} variant="outlined">
          サインアウト
        </Button>
      ) : (
        <Button onClick={goToLogInPage} variant="outlined">
          ログイン
        </Button>
      )}
      <br />
      <br />
    </header>
  );
};
