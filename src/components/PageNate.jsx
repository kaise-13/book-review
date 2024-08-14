import { useDispatch } from 'react-redux'
import { nextPage, backPage } from "../pagenateSlice";
import { store } from '../store';
import './pageNate.css'

export const PageNate = () => {
    const dispatch = useDispatch();

    const goToBackPage = () => {
      dispatch(backPage());
    }
    const goToNextPage = () => {
      dispatch(nextPage());
    }

    return (
        <>
          <ul className='pages'>
            <li className='page' onClick={goToBackPage}>前へ</li>
            <li className="page">{store.getState().pagenate.page}</li>
            <li className="page" onClick={goToNextPage}>次へ</li>
          </ul>
        </>
    )
}