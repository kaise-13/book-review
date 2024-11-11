import { useDispatch } from 'react-redux'
import { firstPage, nextPage, backPage } from "../Slices/pagenateSlice";
import { store } from '../store';
import './pageNate.css'
import Typography from '@mui/material/Typography';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { useState } from 'react';


export const PageNate = () => {
    const dispatch = useDispatch();
    
    // @mui使用時の実装
    // const [page, setPage] = useState(1);
    // const handlePageChange = (event, value) => {
    //   setPage(value);
    // }
    // return (
    //   <>
    //     <Stack spacing={2}>
    //       <Pagination count={10} page={page} onChange={handlePageChange} />
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

    return (
        <>
          <ul className='pages'>
            {store.getState().pagenate.page != 1 ?
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
          </ul>
        </>
    )
}