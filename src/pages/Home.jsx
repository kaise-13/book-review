import React, { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import axios from "axios";
import { Header } from "../components/Header";
import { url } from "../const";
import "./home.css";
import { PageNate } from "../components/PageNate";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export const Home = () => {
  const [books, setBooks] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [user, setUser] = useState("");
  const [cookies] = useCookies();
  const num = useSelector((state) => state.pagenate.num);
  const auth = useSelector((state) => state.auth.isSignIn);
  useEffect(() => {
    axios
      .get(`${url}/users`, {
        headers: {
          authorization: `Bearer ${cookies.token}`,
        },
      })
      .then((res) => {
        setUser(res.data.name + "さん");
        axios
          .get(`${url}/books?offset=${num}`, {
            headers: {
              authorization: `Bearer ${cookies.token}`,
            },
          })
          .then((res) => {
            setBooks(res.data);
          })
          .catch((err) => {
            setErrorMessage(`書籍の取得に失敗しました。${err}`);
          });
      })
      .catch((err) => {
        setErrorMessage(`ユーザー情報の取得に失敗しました。${err}`);
        axios
          .get(`${url}/public/books?offset=${num}`, {})
          .then((res) => {
            setBooks(res.data);
          })
          .catch((err) => {
            setErrorMessage(`書籍の取得に失敗しました。${err}`);
          });
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [num]);
  return (
    <>
      <Header />
      <main className="book-list">
        <div>
          <h3>
            {auth ? (
              <>
                <p className="book-list__error-message">{errorMessage}</p>
                <Link to={`/profile`}>{user}</Link>
              </>
            ) : (
              <div>未ログイン</div>
            )}
          </h3>
        </div>
        <div>
          <div className="book-list__header">
            <h2>書籍一覧</h2>
          </div>
          <ul className="book-list__books">
            {books.map((book, key) => {
              return (
                <li key={key} className="book-list__book">
                  <Link to={`/detail/${book.id}`}>
                    {book.title}
                    <br />
                  </Link>
                </li>
              );
            })}
          </ul>
          <div>
            <Link to={"/new"}>書籍登録</Link>
          </div>
          <PageNate />
        </div>
      </main>
    </>
  );
};
