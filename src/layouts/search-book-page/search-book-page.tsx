import { useEffect, useState } from 'react';
import Book from '../../models/book';
import { SpinnerLoading } from '../utils/spinner-loading';
import { SearchBook } from './conponents/search-book';
export const SearchBookPage = () => {
    const [books, setBooks] = useState<Book[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [httpError, setHttpError] = useState(null);

    useEffect(() => {
        const fetchBooks = async () => {
            const baseUrl: string = "http://localhost:8080/api/books";

            const url: string = `${baseUrl}?page=0&size=9`;

            const res = await fetch(url);

            if (!res.ok) {
                throw new Error('Something went wrong!');
            }

            const resJson = await res.json();

            const resData = resJson._embedded.books;

            const loadedBooks: Book[] = [];

            for (const key in resData) {
                loadedBooks.push({
                    id: resData[key].id,
                    title: resData[key].title,
                    author: resData[key].author,
                    description: resData[key].description,
                    copies: resData[key].copies,
                    copiesAvailable: resData[key].copiesAvailable,
                    category: resData[key].category,
                    img: resData[key].img
                });
            }

            setBooks(loadedBooks);
            setIsLoading(false);
        };
        fetchBooks().catch((error: any) => {
            setIsLoading(false);
            setHttpError(error.message);
        })
    }, []);

    if (isLoading) {
        return (
            <SpinnerLoading />
        );
    }

    if (httpError) {
        return (
            <div className='container m-5'>
                <p>{httpError}</p>
            </div>
        );
    }

    return (
        <div>
            <div className='container'>
                <div>
                    <div className='row mt-5'>
                        <div className='col-6'>
                            <div className='d-flex'>
                                <input className='form-control me-2' type='search' 
                                        placeholder='Search' aria-labelledby='Search' />
                                <button className='btn btn-outline-success'>
                                    Search
                                </button>
                            </div>
                        </div>
                        <div className='col-4'>
                            <div className='dropdown'>
                                <button className='btn btn-secondary dropdown-toggle' type='button'
                                    id='dropdownMenuButton1' data-bs-toggle='dropdown'
                                    aria-expanded='false'>
                                        Category
                                </button>
                                <ul className='dropdown-menu' aria-aria-labelledby='dropdownMenuButton1'>
                                    <li>
                                        <a className='dropdown-item' href='#'>
                                            All
                                        </a>
                                    </li>
                                    <li>
                                        <a className='dropdown-item' href='#'>
                                            Front End
                                        </a>
                                    </li>
                                    <li>
                                        <a className='dropdown-item' href='#'>
                                            Back End
                                        </a>
                                    </li>
                                    <li>
                                        <a className='dropdown-item' href='#'>
                                            Data
                                        </a>
                                    </li>
                                    <li>
                                        <a className='dropdown-item' href='#'>
                                            DevOps
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className='mt-3'>
                        <h5>Number of results: (22)</h5>
                    </div>
                    <p>
                        1 to 5 of 22 items:
                    </p>
                    {books.map(book => (
                        <SearchBook book= {book} key={book.id} />
                    ))}
                </div>
            </div>
        </div>
    );
}