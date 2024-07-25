import { useEffect } from "react";
import Chat from "./components/chat/Chat"
import Details from "./components/details/Details"
import List from "./components/list/List"
import Login from "./components/Login/Login";
import Notification from "./components/notification/Notification";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./lib/firebase";

function App() {

  const user = false;
  // const user = true;

  useEffect(() => {
    const unSub = onAuthStateChanged(auth, (user) => {
      console.log(user);
    })
    return () => {
      unSub();
    };
  }, []);


  return (
    <>
      <div className='boxContainer flex bg-opacity-90 backdrop-blur-2xl  border-white border rounded-lg'>

        {user ? (
          <>
            <List />
            <Chat />
            <Details />
          </>
        ) : (
          <Login />
        )}

        <Notification/>

      </div>
    </>
  )
}

export default App
