import { useDispatch } from 'react-redux'
import { firstPage, nextPage, backPage } from "../Slices/pagenateSlice";
import { store } from '../store';
import './pageNate.css'

export const PageNate = () => {
    const dispatch = useDispatch();
    
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
                  <li className='page' onClick={goToFirstPage}>1ページ</li>
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