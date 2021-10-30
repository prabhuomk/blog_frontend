import { useState } from "react";
import { useHistory } from "react-router-dom";
import "./styles.css";

export default function Signup() {
  const history = useHistory();

  const [username, setUsername] = useState("");

  const [disable, setDisable] = useState(false);
  const [email_id, setemail_id] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = () => {
    setDisable(true);
    if (
      !email_id.includes("@") ||
      !email_id.includes(".") ||
      email_id.length < 8
    ) {
      alert("email_id is not valid");
      setDisable(false);
    } else if (password.length < 5) {
      alert("password length should 5 or more");
      setDisable(false);
    } else if (email_id && password && username) {
      let headersList = {
        "Content-Type": "application/json"
      };
      fetch("https://pk-myblog.herokuapp.com/signup", {
        method: "POST",
        body: JSON.stringify({
          email_id,
          password,
          username
        }),
        headers: headersList
      })
        .then(function (response) {
          return response.json();
        })
        .then(function (data) {
          if (data.message && data.username) {
            alert(data.message);
            setUsername("");

            setDisable(false);
            setemail_id("");
            setPassword("");
            history.push("./login");
          } else {
            setDisable(false);

            alert(data.message);
          }
        });
    } else {
      alert("Please enter the fields");
      setDisable(false);
    }
  };
  return (
    <div className="container-md forget-password">
      <div className="row">
        <div className="col-md-12">
          <div className="panel panel-default">
            <div className="panel-body">
              <div className="text-center">
                <img
                  className="pic"
                  src="https://pic.onlinewebfonts.com/svg/img_221313.png"
                  alt="signup"
                  border="0"
                />
                <h2 className="text-center">Sign-Up</h2>
                <div autocomplete="off" className="form">
                  <br />
                  <div className="form-group">
                    <div className="input-group">
                      <input
                        placeholder="email_id "
                        className="form-control"
                        type="email_id"
                        value={email_id}
                        onChange={(e) => setemail_id(e.target.value)}
                      />
                    </div>
                    <br />
                    <div className="input-group">
                      <input
                        placeholder="user name"
                        className="form-control"
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                      />
                    </div>
                    <br />
                    <div className="input-group">
                      <input
                        placeholder="Password"
                        className="form-control"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="form-group">
                    {disable === false ? (
                      <input
                        className="btn btn-lg btn-primary btn-block"
                        value="Signup"
                        type="button"
                        onClick={handleSubmit}
                      />
                    ) : (
                      <div
                        className="spinner-border text-danger"
                        role="status"
                      ></div>
                    )}
                  </div>
                </div>
                Have an account ?
                <button
                  className="btn btn-success ml-4"
                  onClick={() => history.push("/login")}
                >
                  Login
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
