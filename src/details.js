import { useHistory, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { ListComment } from "./listcomment";

export function Detail({ author }) {
  let { _id } = useParams();
  const [rec, SetRec] = useState({});
  const [comment, setComment] = useState("");
  const [disable, setDisable] = useState(false);
  function GetBlogData(_id) {
    fetch(`https://pk-myblog.herokuapp.com/blog/${_id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": localStorage.getItem("usertoken")
      }
    })
      .then((data) => data.json())
      .then((data) => SetRec(data));
  }

  useEffect(() => {
    GetBlogData(_id);
  }, []);

  function Deleteblog(_id) {
    fetch(`https://pk-myblog.herokuapp.com/blog/${_id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": localStorage.getItem("usertoken")
      }
    })
      .then((data) => data.json())
      .then((data) => history.push("/"));
  }

  function Comment(title) {
    setDisable(true);
    if (comment) {
      fetch("https://pk-myblog.herokuapp.com/addcomment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ comment, username: author, title })
      })
        .then((data) => data.json())
        .then((data) => {
          alert(data.message);
          setComment("");
          setDisable(false);
        });
    } else {
      alert("enter the field");
      setDisable(false);
    }
  }
  const history = useHistory();
  return (
    <div className="container">
      {rec._id ? (
        <>
          <img className="detailpic" src={rec.src} alt="" />
          {author === rec.author ? (
            <div className="icons">
              <i
                className="fa fa-pencil"
                aria-hidden="true"
                style={{ color: "green" }}
                onClick={() => history.push(`/editblog/${rec._id}`)}
              ></i>
              <i
                className="fa fa-trash"
                aria-hidden="true"
                onClick={() => Deleteblog(rec._id)}
                style={{ color: "red" }}
              ></i>
            </div>
          ) : (
            ""
          )}

          <h4 className="heading">{rec.title}</h4>
          <div className="subheading">
            <span>
              {" "}
              Author:<b>{rec.author}</b>
            </span>
            <span>{rec.date}</span>
          </div>
          <br />
          <p>{rec.description}</p>
          <textarea
            className="create1"
            type="text"
            placeholder="Comments....."
            onChange={(e) => setComment(e.target.value)}
            value={comment}
            rows="3"
            width="100%"
          ></textarea>
          <button
            type="button"
            style={{ backgroundColor: "primary" }}
            onClick={() => Comment(rec.title)}
          >
            Post Comment
          </button>
          <ListComment title={rec.title} comment={comment} />
        </>
      ) : (
        ""
      )}
    </div>
  );
}
