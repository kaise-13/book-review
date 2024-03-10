import { useState } from "react";
import { useParams } from "react-router";
import { useEffect } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import { url } from "../const";
import { Header } from "../components/Header";
import "./bookDetail.css";
import { Link } from "react-router-dom";

export const BookDetail = () => {
  const { id } = useParams();
  const [cookies] = useCookies();
  const [isLoading, setIsLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [url1, setUrl] = useState("");
  const [detail, setDetail] = useState("");
  const [review, setReview] = useState("");
  const [isMine, setIsMine] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`${url}/books/${id}`, {
        headers: {
          authorization: `Bearer ${cookies.token}`,
        },
      })
      .then((res) => {
        axios
          .post(
            `${url}/logs`,
            { selectBookId: id },
            {
              headers: {
                authorization: `Bearer ${cookies.token}`,
              },
            }
          )
          // .catch((err) => {
          //   setErrorMessage(`ログの送信に失敗しました。${err}`);
          // });f
        setIsLoading(false);
        setTitle(res.data.title);
        setUrl(res.data.url);
        setDetail(res.data.detail);
        setReview(res.data.review);
        setIsMine(res.data.isMine);
      })
      .catch((err) => {
        setIsLoading(false);
        setErrorMessage(`書籍情報の取得に失敗しました。${err}`);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div>
        <Header />
        {isLoading ? (
          <div class="loader"></div>
        ) : (
          <>
            <h2>書籍名：{title}</h2>
            <p className="error-message">{errorMessage}</p>
            <div>
              <form>
                <label>タイトル：{title}</label>
                <br />
                <br />
                <label>url：{url1}</label>
                <br />
                <br />
                <label>詳細：{detail}</label>
                <br />
                <br />
                <label>レビュー：{review}</label>
                <br />
                <br />
              </form>
              {isMine ? (
                <Link to={`/edit/${id}`}>書籍編集</Link>
              ) : (
                <Link to={`/`}>編集不可</Link>
              )}
            </div>
          </>
        )}
      </div>
    </>
  );
};
