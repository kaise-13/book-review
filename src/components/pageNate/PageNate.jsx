import { useDispatch } from 'react-redux'
import { useState, useEffect } from 'react';
import axios from 'axios';
import { url } from '../../const';
import { firstPage, nextPage, backPage, setPage } from "../../Slices/pagenateSlice";
import { store } from '../../store';
import './pageNate.css'
// import Pagination from '@mui/material/Pagination';
// import Stack from '@mui/material/Stack';
// import { useState } from 'react';


export const PageNate = () => {
    const dispatch = useDispatch();
    const [bookNum, setBookNum] = useState(0);

    useEffect(() => {
      const fetchBookCount = async () => {
          let count = 0;
          let offset = 0;
          const limit = 10; // APIは10件ずつ返すので、ここで設定します

          while (true) {
              try {
                  const response = await axios.get(`${url}/public/books?offset=${offset}`, {})

                  const books = response.data;

                  if (books.length === 0) break;

                  count += books.length;
                  offset += limit;

              } catch (error) {
                  console.error("Error fetching books:", error);
                  break;
              }
          }

          setBookNum(count);
      };

      // 初回レンダリング時に1回だけ実行
      fetchBookCount();
  }, []);
    
    // maxPageの取得メソッド
    

    // @mui使用時の実装
    // const [page, setPage] = useState(1);
    // const handlePageChange = (event, value) => {
    //   dispatch(setPage(value))
    // }
    // return (
    //   <>
    //     <Stack spacing={2}>
    //       <Pagination count={30} page={page} onChange={handlePageChange} />
    //     </Stack>
    //   </>
    // )


    // @mui不使用時の実装
    const goToFirstPage = () => {
      dispatch(firstPage())
    }
    const goToBackPage = () => {
      dispatch(backPage());
    }
    const goToNextPage = () => {
      dispatch(nextPage());
    }
    const goToThePage = (pageNum) => {
      dispatch(setPage(pageNum))
    }

    return (
        <>
          <footer>
            <ul className='pages'>
              {store.getState().pagenate.page !== 1 ?
                (
                  <>
                    <li className='page' onClick={goToFirstPage}>1</li>
                    <li className='page' onClick={goToBackPage}>前へ</li> 
                  </>
                )
                : <li className='page'>前へ</li>
              }
              <li className="page">{store.getState().pagenate.page}</li>
              <li className="page" onClick={goToNextPage}>次へ</li>
              <li className="page" onClick={() => goToThePage(Math.floor(bookNum / 10)+1)}>{Math.floor(bookNum / 10)+1}</li>
            </ul>
          </footer>
        </>
    )
}