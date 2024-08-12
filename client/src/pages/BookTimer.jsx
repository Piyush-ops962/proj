import React, { useState, useEffect } from 'react';
import axios from 'axios';

function BookTimer({ t,id }) {
    const [time, setTime] = useState(t);
    const handleDelete = async (id) => {
        try {
          await axios.delete(`http://localhost:8800/books/${id}`);
          window.location.reload()
        } catch (err) {
          console.log(err);
        }
      };

    useEffect(() => {
        if (time > 0) {
            const timer = setInterval(() => {
                setTime(prevTime => prevTime - 1);
            }, 1000);

            return () => clearInterval(timer);
        }
    }, [time]);
console.log (time);
    return (
        <div>
            <h2>Countdown Timer for Book ID:{id} </h2>
            <div>
                {time > 0 ? (
                    <h2>{Math.floor(time / 60)}:{('0' + (time % 60)).slice(-2)}</h2>
                ) : (
                    <h2>{handleDelete(id)}</h2>
                )}
            </div>
        </div>
    );
}

export default BookTimer;
