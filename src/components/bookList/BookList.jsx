import { Link } from "react-router-dom";
import "./bookList.css";

export const BookList = (props) => {
    return (
        <ul className="book-list__books">
            {props.books.map((book, key) => {
              return (
                <li key={key} className="book-list__book">
                  {props.auth ? (
                    <Link to={`/detail/${book.id}`}>
                    {book.title}
                    <br />
                    </Link>
                  ) : (
                    <Link to={`/unAuthorization`}>
                    {book.title}
                    <br />
                    </Link>
                  )}
                </li>
              );
            })}
          </ul>
    )
}