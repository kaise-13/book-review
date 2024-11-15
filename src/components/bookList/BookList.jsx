import { Link } from "react-router-dom";
import "./bookList.css";

export const BookList = ({ auth, books }) => {
    return (
        <ul className="book-list__books">
            {books.map((book, key) => {
              return (
                <li key={key} className="book-list__book">
                  {auth ? (
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