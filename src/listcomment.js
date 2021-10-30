import { useState, useEffect } from "react";

export function ListComment({ title, comment }) {
  const [details, setDetails] = useState([]);
  function GetAll() {
    fetch(`https://pk-myblog.herokuapp.com/getcomment/${title}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": localStorage.getItem("usertoken")
      }
    })
      .then((data) => data.json())
      .then((result) => {
        setDetails(result);
      });
  }
  useEffect(() => {
    GetAll();
  }, [comment]);
  return (
    <div>
      {details.map((data) => (
        <div className="cards">
          <div className="card-header">{data.username}</div>
          <div className="card-body">
            <p className="card-text">{data.comment}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
