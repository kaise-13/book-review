import axios from "axios";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { url } from "../const";
import { Header } from "../components/Header";
import { useNavigate } from "react-router";

export const ModifyUser = () => {
    // const [defaultUserName, setDefaultUserName] = useState("");
    const [newUserName, setNewUserName] = useState("");
    // const [iconUrl, setIconUrl] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [cookies] = useCookies();
    const handleUserChange = (e) => setNewUserName(e.target.value)
    const navigate = useNavigate();


    useEffect(() => {
        axios
          .get(`${url}/users`, {
            headers: {
              authorization: `Bearer ${cookies.token}`,
            }
          })
          .then((res) => {
            setNewUserName(res.data.name);
            // setIconUrl(res.data.iconUrl);
          })
          .catch((err) => {
            setErrorMessage(`ユーザー情報の取得に失敗しました。${err}`);
          });
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const changeUserInfo = () => {
        const data = {
            name: newUserName
        }
        axios
          .put(`${url}/users`, data,{
            headers: {
              authorization: `Bearer ${cookies.token}`,
            }})
          .then((res) => {
            navigate('/');
          })
          .catch((err) => {
            setErrorMessage(`更新に失敗しました。${err}`);
          })
    }

    return (
        <>
          <div>
            <Header />
            <main className="book-list">
              <p className="book-list__error-message">{errorMessage}</p>
              <div>
                <div>
                  <h2>ユーザー情報更新</h2>
                </div>
                <span>ユーザー名</span>
                <br />
                <input 
                  onChange={handleUserChange}
                  value={newUserName} 
                />
              </div>
              <br />
              <div>
                <button onClick={changeUserInfo}>変更</button>
              </div>
            </main>
          </div>
        </>
    );
};