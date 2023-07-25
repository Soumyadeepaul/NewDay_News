import { useEffect, useState } from "react";
import UserContext from "./UserContext";
import App1_layer2 from "./App1_layer2";

function App1() {
  const [email1, setEmail1] = useState(false);
  useEffect(() => {
    //checking the local storage
    const loggedInUser = localStorage.getItem("email");
    //user is login
    if (loggedInUser) {
      //set the email1
      setEmail1(loggedInUser);
    }
  }, []);

  //dark mode
  const [mode, setMode] = useState("light");

  //toggleMode function used for dark mode button in NAVBAR
  const toggleMode = () => {
    if (mode === "light") {
      setMode("dark");
      document.body.style.backgroundColor = "grey";
    } else {
      setMode("light");
      document.body.style.backgroundColor = "#c3f1fa";
    }
  };

  return (
    //assigning globally the mode
    <UserContext.Provider value={mode}>
      <App1_layer2 toggleMode={toggleMode} mode={mode} email={email1} />
    </UserContext.Provider>
  );
}

export default App1;
