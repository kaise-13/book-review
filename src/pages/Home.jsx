import React, { useState, useEffect } from "react";
import { useCookies } from "react-cookie";
import axios from "axios";
import { Header } from "../components/header/Header";
import { url } from "../const";
import "./home.css";
import { PageNate } from "../components/pageNate/PageNate";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useDispatch } from 'react-redux'
import { backPage } from "../Slices/pagenateSlice";
import { BookList } from "../components/bookList/BookList";

export const Home = () => {
  const [books, setBooks] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [user, setUser] = useState("");
  const [icon, setIcon] = useState("");
  const [cookies] = useCookies();
  const pageNum = useSelector((state) => state.pagenate.num);
  const auth = useSelector((state) => state.auth.isSignIn);

  const dispatch = useDispatch();
  const goToBackPage = () => {
    dispatch(backPage());
  }

  // ページ情報の取得（ページ更新毎）
  useEffect(() => {
    axios
      .get(`${url}/users`, {
        headers: {
          authorization: `Bearer ${cookies.token}`,
        },
      })
      // ログイン時
      .then((res) => {
        setUser(res.data.name + "さん");
        setIcon(res.data.iconUrl);
        fetchBooks(pageNum);
      })
      // 未ログイン時
      .catch((err) => {
        setErrorMessage(`ユーザー情報の取得に失敗しました。${err}`);
        fetchPublicBooks(pageNum);
      });

    const fetchBooks = (page) => {
      axios
        .get(`${url}/books?offset=${page}`, {
          headers: {
            authorization: `Bearer ${cookies.token}`,
          },
        })
        .then((res) => {
          if (res.data.length === 0 && page > 0) {
            // データが空の場合、dispatchでページを-1にして再取得
            goToBackPage();
          } else {
            setBooks(res.data);
            setErrorMessage("");
          }
        })
        .catch((err) => {
          setErrorMessage(`書籍の取得に失敗しました。${err}`);
        });
    };

    const fetchPublicBooks = (page) => {
      axios
        .get(`${url}/public/books?offset=${page}`, {})
        .then((res) => {
          if (res.data.length === 0 && page > 0) {
            // データが空の場合、dispatchでページを-1にして再取得
            goToBackPage();
          } else {
            setBooks(res.data);
            setErrorMessage("");
          }
        })
        .catch((err) => {
          setErrorMessage(`書籍の取得に失敗しました。${err}`);
        });
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageNum, dispatch]); // pageNumが変わるたびに再取得する

  return (
    <>
      <Header />
      <main className="book-list">
        <div>
          <h3>
            {auth ? (
              <>
                <p className="book-list__error-message">{errorMessage}</p>
                {icon && <img src={icon} alt="ユーザーアイコン" style={{ width: '50px', height: '50px', borderRadius: '50%' }} />}
                <br />
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
          <BookList auth={auth} books={books} />
          <div>
            {auth ? (<Link to={"/new"}>書籍登録</Link>) : (<></>)}
          </div>
          <br />
          <br />
          <PageNate setErrorMessage={setErrorMessage}/>
        </div>
      </main>
    </>
  );
};
