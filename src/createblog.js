import { useState } from "react";
import { useHistory } from "react-router-dom";
export function CreateBlog({ author }) {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [src, setSrc] = useState("");
  const [description, setDescription] = useState("");
  const [disable, setDisable] = useState(false);
  const history = useHistory();

  function Create(event) {
    setDisable(true);
    if (title && category && src && description) {
      event.preventDefault();
      fetch("https://pk-myblog.herokuapp.com/addblog", {
        method: "POST",
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
          history.push("./");
        });
    } else {
      alert("enter the field");
      setDisable(false);
    }
  }

  return (
    <div className="container">
      <img className="detailpic" src={src === "" ? "" : src} alt="" />
      <form className="create">
        <div>
          {disable === false ? (
            <button
              type="button"
              class="btn btn-primary"
              style={{ margin: "5px", float: "right" }}
              onClick={Create}
            >
              PUBLISH
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
          value={category}
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
          onChange={(event) => setTitle(event.target.value)}
        />
        <input
          className="create1"
          type="text"
          placeholder="image url"
          size="100%"
          value={src}
          onChange={(event) => setSrc(event.target.value)}
        />
        <textarea
          className="create1"
          type="text"
          placeholder="Tell your Story....."
          rows="3"
          size="100%"
          onChange={(event) => setDescription(event.target.value)}
        ></textarea>
      </form>
    </div>
  );
}
