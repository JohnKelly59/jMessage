import React from "react";
import { ChatEngine } from "react-chat-engine";
import "./app.css";

import LoginForm from "./LoginForm";

function App() {
  const logout = () => {
    localStorage.setItem("username", "");
    localStorage.setItem("password", "");
    window.location.reload();
  };

  if (!localStorage.getItem("username")) return <LoginForm />;
  return (
    <div className="App">
      <ChatEngine
        height="100vh"
        projectID="32fde4d8-043c-4ba6-9fd8-23f295031d61"
        userName={localStorage.getItem("username")}
        userSecret={localStorage.getItem("password")}
      />
      <div className="row">
        <div className="col">
          <form action="../../post" method="post" className="form">
            <button className="w-100 btn btn-md btn-warning" type="submit">
              Connected?
            </button>
          </form>
        </div>
        <div className="col">
          <button
            className="w-100 btn btn-md btn-warning logout"
            onClick={logout}
          >
            Log Out
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
