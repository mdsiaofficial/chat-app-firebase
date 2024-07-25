import { useEffect } from "react";
import Chat from "./components/chat/Chat"
import Details from "./components/details/Details"
import List from "./components/list/List"
import Login from "./components/Login/Login";
import Notification from "./components/notification/Notification";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./lib/firebase";
import { useUserStore } from "./lib/userStore";

function App() {

  const { currentUser, isLoading, fetchUserInfo } = useUserStore();

  // const user = false;
  // const user = true;

  useEffect(() => {
    const unSub = onAuthStateChanged(auth, (user) => {
      console.log(user);
      fetchUserInfo(user?.uid)
    })
    return () => {
      unSub();
    };
  }, [fetchUserInfo]);

  console.log(currentUser);

  if (isLoading) return (<div className="loading p-12 text-4xl rounded-xl bg-slate-800 text-white">Loading...</div>);

  return (
    <>
      <div className='boxContainer  md:h-[90vh] md:w-[80vw] flex bg-opacity-90 backdrop-blur-2xl  border-white border rounded-lg'>

        {currentUser ? (
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
