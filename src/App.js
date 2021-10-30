import "./styles.css";
import { Topbar } from "./topbar";
import { Switch, Route } from "react-router-dom";
import { Home } from "./home";
import { Detail } from "./details";
import { CreateBlog } from "./createblog";
import { EditBlog } from "./editblog";
import Signup from "./signup";
import Login from "./login";
import ForgetPassword from "./forgetpassword";
import ResetPassword from "./resetpassword";
import { useState } from "react";
import { About } from "./about";
export default function App() {
  const tkn = !localStorage.getItem("token") && "";
  const [isToken, setIsToken] = useState(tkn);
  const [author, setAuthor] = useState("");
  return (
    <div className="App">
      <Topbar isToken={isToken} setIsToken={setIsToken} />
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>

        <Route path="/createblog">
          <CreateBlog author={author} />
        </Route>

        <Route path="/signup">
          <Signup />
        </Route>

        <Route path="/login">
          <Login setIsToken={setIsToken} setAuthor={setAuthor} />
        </Route>

        <Route path="/forgetpassword">
          <ForgetPassword />
        </Route>
        <Route path="/about">
          <About />
        </Route>
        <Route path="/editblog/:_id">
          <EditBlog author={author} />
        </Route>
        <Route path="/details/:_id">
          <Detail author={author} />
        </Route>
        <Route exact path="/password-reset/:id/:token">
          <ResetPassword />
        </Route>
      </Switch>
    </div>
  );
}
