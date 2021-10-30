import { useHistory } from "react-router-dom";
import { useState, useEffect } from "react";
export function Post({ search, setSearch }) {
  const history = useHistory();

  const [details, setDetails] = useState([]);

  function GetAll() {
    fetch("https://pk-myblog.herokuapp.com/listofblogs", {
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
  }, []);
  return (
    <div>
      <div>
        <input
          class="form-control mr-sm-2"
          type="search"
          placeholder="🔍Search by category or by author name"
          aria-label="Search"
          onChange={(event) => setSearch(event.target.value)}
        />
      </div>
      <div className="blog">
        {details
          .filter(
            (data) =>
              data.category.toLowerCase().includes(search.toLowerCase()) ||
              data.author.toLowerCase().includes(search.toLowerCase())
          )

          .map((data) => (
            <div className="card">
              <img src={data.src} className="card-img-top" alt="..." />
              <div className="card-body">
                <h4 className="card-title" style={{ textAlign: "center" }}>
                  {data.title}
                </h4>
                <div
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <h5
                    className="card-title"
                    style={{ cursor: "pointer" }}
                    onClick={() => setSearch(data.author)}
                  >
                    Author:{data.author}
                  </h5>
                  <h6 className="card-title">{data.date}</h6>
                </div>
                <p className="card-text">{data.description.slice(0, 200)}</p>

                <button
                  type="button"
                  onClick={() => history.push(`/details/${data._id}`)}
                >
                  View In Detail
                </button>
              </div>
            </div>
          ))}
        ;
      </div>
    </div>
  );
}
