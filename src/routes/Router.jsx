import { useSelector } from "react-redux";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { SignIn } from "../pages/SignIn";
import { SignUp } from "../pages/SignUp";
import { Home } from "../pages/Home";
import { ModifyUser } from "../pages/ModifyUser";
import { RegistBook } from "../pages/RegistBook";
import { BookDetail } from "../pages/BookDetail";
import { EditBook } from "../pages/EditBook";
import { NotFound } from "../pages/NotFound";
import { UnAuthorization } from "../pages/UnAuthorization";

export const Router = () => {
  const auth = useSelector((state) => state.auth.isSignIn);

  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/signin" element={<SignIn />} />
        <Route exact path="/signup" element={<SignUp />} />
        <Route exact path="/" element={<Home />} />
        <Route exact path="/unAuthorization" element={<UnAuthorization />} />
        {auth ? (
          <>
            <Route exact path="/profile" element={<ModifyUser />} />
            <Route exact path="/new" element={<RegistBook />} />
            <Route exact path="/detail/:id" element={<BookDetail />} />
            <Route exact path="/edit/:id" element={<EditBook />} />
          </>
        ) : (
          <>
            <Route path="*" element={<Navigate to="/signin" />} />
          </>
        )}
        <Route component={NotFound} />
      </Routes>
    </BrowserRouter>
  );
};
