import axios from "axios";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { url } from "../const";
import { Header } from "../components/Header";
import { useNavigate } from "react-router";
import Compressor from "compressorjs";

export const ModifyUser = () => {
    // const [defaultUserName, setDefaultUserName] = useState("");
    const [newUserName, setNewUserName] = useState("");
    const [iconUrl, setIconUrl] = useState("");
    const [file, setFile] = useState(null)
    const [errorMessage, setErrorMessage] = useState("");
    const [cookies] = useCookies();
    const handleUserChange = (e) => setNewUserName(e.target.value)
    const handleFileChange = (e) => {
      const file = e.target.files[0]
      if(!file) {
        return;
      }
      setIconUrl(URL.createObjectURL(file));
      new Compressor(file, {
        quality: 0.6,
        maxHeight: 400,
        maxWidth: 400,
        success(compressedFile) {
            // FormDataにリサイズ後の画像を設定
            const formData = new FormData();
            formData.append("icon", compressedFile, compressedFile.name);
            setFile(formData);  // 圧縮したファイルをセット
        },
        error(err) {
            setErrorMessage(`画像の圧縮に失敗しました: ${err.message}`);
        }
    });
    }
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
            setIconUrl(res.data.iconUrl);
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

    const changeUserIcon = () => {
      axios
        .post(`${url}/uploads`, file, {
          headers: {
            Authorization: `Bearer ${cookies.token}`,
          }
        })
        .then((res) => {
          navigate('/');
        })
        .catch((err) => {
          setErrorMessage(`アイコンアップロードに失敗しました。 ${err}`);
        });
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
                <h3>ユーザー名</h3>
                <br />
                <input 
                  onChange={handleUserChange}
                  value={newUserName} 
                />
              </div>
              <br />
              <div>
                <button onClick={changeUserInfo}>ユーザー名変更</button>
              </div>
              <br />
              <br />
              <div>
                <h3>アイコン</h3>
                <br />
                {iconUrl && <img src={iconUrl} alt="プレビュー" style={{ width: '100px', height: '100px', borderRadius: '50%', marginBottom: '10px' }} />}
              </div>
              <br />
              <div>
                <input
                  type="file"
                  accept=".jpg, .png"
                  onChange={handleFileChange}
                />
                <br />
                <br />
                <button onClick={changeUserIcon}>アイコン変更</button>
              </div>
            </main>
          </div>
        </>
    );
};