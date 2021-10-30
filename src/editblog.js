import { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
export function EditBlog({ author }) {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [src, setSrc] = useState("");
  const [description, setDescription] = useState("");
  const [disable, setDisable] = useState(false);
  const history = useHistory();
  let { _id } = useParams();
  const [rec, SetRec] = useState({});
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

  function Update(event) {
    setDisable(true);
    if (title && category && src && description) {
      event.preventDefault();
      fetch(`https://pk-myblog.herokuapp.com/blog/${_id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ src, title, description, category, author })
      })
        .then((data) => data.json())
        .then((data) => {
          alert(data.message);
          setSrc("");
          setTitle("");
          setDescription("");
          setCategory("");
          setDisable(false);
          history.push("/");
        });
    } else {
      alert("enter the field");
      setDisable(false);
    }
  }

  return (
    <div className="container">
      {rec._id ? (
        <>
          <img className="detailpic" src={rec.src} alt="" />
          <form className="create">
            <div>
              {disable === false ? (
                <button
                  type="button"
                  class="btn btn-primary"
                  style={{ margin: "5px", float: "right" }}
                  onClick={Update}
                >
                  UPDATE
                </button>
              ) : (
                <div className="spinner-border text-danger" role="status"></div>
              )}
            </div>
            <label for="exampleFormControlSelect1">Select Category</label>
            <select
              className="form-control"
              id="exampleFormControlSelect1"
              onChange={(e) => setCategory(e.target.value)}
              defaultValue={rec.category}
            >
              <option>----------------------------- \/</option>
              <option>Music</option>
              <option>Sports</option>
              <option>Fashion</option>
              <option>Movies</option>
              <option>Tech</option>
            </select>
            <input
              className="create1"
              type="text"
              placeholder="Enter the title"
              size="100%"
              defaultValue={rec.title}
              onChange={(event) => setTitle(event.target.value)}
            />
            <input
              className="create1"
              type="text"
              placeholder="image url"
              size="100%"
              defaultValue={rec.src}
              onChange={(event) => setSrc(event.target.value)}
            />
            <textarea
              className="create1"
              type="text"
              placeholder="Tell your Story....."
              rows="3"
              size="100%"
              defaultValue={rec.description}
              onChange={(event) => setDescription(event.target.value)}
            ></textarea>
          </form>
        </>
      ) : (
        ""
      )}
    </div>
  );
}
