import { useCookies } from "react-cookie"
import { Header } from "../components/Header"
import { useNavigate, useParams } from "react-router";
import { useEffect, useState } from "react";
import { url } from "../const";
import axios from "axios";

export const EditBook = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [cookies] = useCookies();
    const [title, setTitle] = useState("");
    const handleTitleChange = (e) => setTitle(e.target.value);
    const [url1, setUrl] = useState("");
    const handleUrlChange = (e) => setUrl(e.target.value);
    const [detail, setDetail] = useState("");
    const handleDetailChange = (e) => setDetail(e.target.value);
    const [review, setReview] = useState("");
    const handleReviewChange = (e) => setReview(e.target.value);
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        axios
            .get(`${url}/books/${id}`, {
              headers: {
                authorization: `Bearer ${cookies.token}`,
              },
            })
            .then((res) => {
              setTitle(res.data.title);
              setUrl(res.data.url);
              setDetail(res.data.detail);
              setReview(res.data.review);
            })
            .catch((err) => {
              setErrorMessage(`書籍の取得に失敗しました。${err}`)
            })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const editBook = () => {
        const data = {
            title: title,
            url: url,
            detail: detail,
            review: review,
        }

        axios
            .put(`${url}/books/${id}`, data, {
                headers: {
                    authorization: `Bearer ${cookies.token}`,
                },
            })
            .then((res) => {
                navigate(`/detail/${id}`);
            })
            .catch((err) => {
                setErrorMessage(`書籍の更新に失敗しました。${err}`)
            })
    }

    const deleteBook = () => {
        axios
            .delete(`${url}/books/${id}`,{
                headers: {
                    authorization: `Bearer ${cookies.token}`,
                },
            })
            .then((res) => {
                navigate('/');
            })
            .catch((err) => {
                setErrorMessage(`書籍の削除に失敗しました。${err}`)
            })
    }

    return (
        <div>
            <Header />
            <main>
                <h2>書籍編集</h2>
                <p>{errorMessage}</p>
                <form>
                    <label>タイトル</label>
                    <br />
                    <input onChange={handleTitleChange} value={title}></input>
                    <br />
                    <br />
                    <label>url</label>
                    <br />
                    <input onChange={handleUrlChange} value={url1}></input>
                    <br />
                    <label>詳細</label>
                    <br />
                    <input onChange={handleDetailChange} value={detail}></input>
                    <br />
                    <br />
                    <label>レビュー</label>
                    <br />
                    <input onChange={handleReviewChange} value={review}></input>
                </form>
                <br />
                    <button style={{ marginRight: '8px' }} onClick={editBook}>更新</button>
                    <button onClick={deleteBook}>削除</button>
            </main>
        </div>
    )
}