import { Link } from "react-router-dom";
import "./styles.css";
import { useHistory } from "react-router-dom";
export function Topbar({ isToken, setIsToken }) {
  const history = useHistory();
  const Logout = () => {
    localStorage.setItem("token", "");
    setIsToken("");
    history.push("/");
  };
  return (
    <div className="Container">
      <nav
        className="navbar navbar-expand sticky-top navbar-dark "
        style={{ position: "fixed", width: "100%", backgroundColor: "black" }}
      >
        <div
          className="collapse navbar-collapse"
          id="navbarText"
          style={{
            display: "flex",
            justifyContent: "center",
            color: "white"
          }}
        >
          <div>
            <ul className="navbar-nav mr-auto">
              {isToken === "" ? (
                <>
                  <li className="nav-item ">
                    <Link
                      to="/"
                      className="nav-link active"
                      style={{ color: "white" }}
                    >
                      HOME
                    </Link>
                  </li>

                  <li className="nav-item ">
                    <Link
                      to="/about"
                      className="nav-link active"
                      style={{ color: "white" }}
                    >
                      ABOUT
                    </Link>
                  </li>
                  <li className="nav-item ">
                    <Link
                      to="/signup"
                      className="nav-link active"
                      style={{ color: "white" }}
                    >
                      SIGNUP
                    </Link>
                  </li>
                  <li className="nav-item ">
                    <Link
                      to="/login"
                      className="nav-link active"
                      style={{ color: "white" }}
                    >
                      LOGIN
                    </Link>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item ">
                    <Link
                      to="/"
                      className="nav-link active"
                      style={{ color: "white" }}
                    >
                      HOME
                    </Link>
                  </li>
                  <li className="nav-item ">
                    <Link
                      to="/about"
                      className="nav-link active"
                      style={{ color: "white" }}
                    >
                      ABOUT
                    </Link>
                  </li>

                  <li className="nav-item ">
                    <Link
                      to="/createblog"
                      className="nav-link active"
                      style={{ color: "white" }}
                    >
                      WRITE BLOG
                    </Link>
                  </li>
                  <button
                    style={{
                      backgroundColor: "black",
                      color: "white",
                      border: "none"
                    }}
                    onClick={Logout}
                    color="inherit"
                  >
                    LOGOUT
                  </button>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}
