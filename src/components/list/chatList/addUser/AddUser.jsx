import { avatar } from '../../../../assets/Images'
import './AddUser.css'
import { useState } from 'react'
// Create a reference to the cities collection
import { arrayUnion, collection, doc, getDocs, query, serverTimestamp, setDoc, updateDoc, where } from "firebase/firestore";
import { db } from '../../../../lib/firebase';
import { useUserStore } from '../../../../lib/userStore';



const AddUser = () => {

  const [user, setUser] = useState(null);
  const currentUser = useUserStore();

  const handleSearch = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const username = formData.get("username");

    try {
      const userRef = collection(db, "users");
      // Create a query against the collection.
      const q = query(userRef, where("username", "==", username));

      const querySnapShot = await getDocs(q);

      if (!querySnapShot.empty) {
        setUser(querySnapShot.docs[0].data());
      }

    } catch (error) {
      console.log(error)
    }
  }

  const handleAdd = async (e) => {

    e.preventDefault(); // Prevent form submission if present

    if (!currentUser || !currentUser.id || !user || !user.id) {
      console.error('Current user ID or user ID is undefined.');
      return;
    }

    const chatRef = collection(db, "chats");
    const userChatsRef = collection(db, "userChats");

    try {
      const newChatRef = doc(chatRef);
      await setDoc(newChatRef, {
        createdAt: serverTimestamp(),
        messages: [],
      });

      await updateDoc(doc(userChatsRef, user.id), {
        chats: arrayUnion({
          chatId: newChatRef.id,
          lastMessage: "",
          receiverId: currentUser.id,
          updatedAt: Date.now(),
        })
      });

      await updateDoc(doc(userChatsRef, currentUser.id), {
        chats: arrayUnion({
          chatId: newChatRef.id,
          lastMessage: "",
          receiverId: user.id,
          updatedAt: Date.now(),
        })
      });

      console.log(newChatRef.id);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className='addUser duration-700 transition-all'>
      <form action="" onSubmit={handleSearch}>

        <input type="text" placeholder='Username' name='username' className='p-2 border-2 border-gray-300 rounded-md flex-1 bg-gray-800 border-none outline-none' />
        <button className='p-2 bg-[#292929c4] hover:bg-[#47478096] border-none rounded-md cursor-pointer' type='submit'>Search</button>
      </form>

      {
        user && (
          <div className="user mt-12 flex items-center justify-between">
            <div className="detail flex items-center gap-5">
              <img src={user.avatar || avatar} alt="" className='w-12 h-12 rounded-xl' />
              <span>{user.username}</span>
            </div>
            <button className='p-2 bg-[#4d7e43c4] hover:bg-[#66d6b596] text-black border-none rounded-md cursor-pointer' onClick={handleAdd}>Add User</button>
          </div>)
      }
    </div>
  )
}

export default AddUser