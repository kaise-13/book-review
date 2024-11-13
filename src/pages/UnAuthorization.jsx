import { Link } from "react-router-dom";
import { Header } from "../components/header/Header";

export const UnAuthorization = () => {
    return (
        <>
          <Header />
          <h1>アクセス権限がありません</h1>
          <br />
          <Link to={"/"}>ホームへ戻る</Link>
        </>
    )
}