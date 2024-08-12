import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import BookTimer from './BookTimer';

const Books = () => {
  const [books, setBooks] = useState([]);
  const [time, setTime] = useState(0);

  useEffect(() => {
    const fetchAllBooks = async () => {
      try {
        const res = await axios.get("http://localhost:8800/books/");
        setBooks(res.data);
        setTime(50)
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllBooks();
  }, []);


  // setTime(50)

  useEffect(() => {
    if (time > 0) {
        const timer = setInterval(() => {
            setTime(prevTime => prevTime - 1);
        }, 1000);


        <Link
                to={`/update/${1}`}
              ></Link>
      

        return () => clearInterval(timer);
    }
}, [time]);

  console.log(books);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8800/books/${id}`);
      window.location.reload()
    } catch (err) {
      console.log(err);
    }
  };
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
      setIsVisible(!isVisible);
  };

  return (

    
    <div>

              
     

      <button className="mt-5 p-4 bg-gray-900" onClick={toggleVisibility}>
                {isVisible ? 'Hide Banner' : 'Show Banner'}
        </button>
       {isVisible && (<div className="books">
        {books.map((book) => (
          
          <div   key={book.id} className="book">
            {/* <div> */}
            <img style={{ width: '400px'}} src={book.cover} alt="" />
            

            <BookTimer  id={book.id} t={book.time} />
            
           
            
            <a href={book.link} target="_blank" rel="noopener noreferrer">
                <button>Click me</button>
            </a>
         
            {/* <button className="delete" onClick={() => handleDelete(book.id)}>Delete</button> */}
            <button className="update">
              <Link
                to={`/update/${book.id}`}
                style={{ color: "inherit", textDecoration: "none" }}
              >
                Update
              </Link>
            </button>
          </div>
        ))}
      </div>)}

      <button className="addHome">
        <Link to="/add" style={{ color: "inherit", textDecoration: "none" }}>
          Add new book
        </Link>
      </button>
    </div>
  );
};

export default Books;
