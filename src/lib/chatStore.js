import { doc, getDoc } from 'firebase/firestore';
import { create } from 'zustand'
import { db } from './firebase';

export const useChatStore = create((set) => ({
  chatId: null,
  user: null,
  isCurrentUserBlocked:false,
  isReceiverBlocked:false,
  isLoading: true,
  fetchUserInfo: async (uid) => {
    if (!uid) return set({ currentUser: null, isLoading: false });

    try {
      const docRef = doc(db, "users", uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        console.log("Document data:", docSnap.data());
        set({ currentUser: docSnap.data(), isLoading: false });
      } else {
        // docSnap.data() will be undefined in this case
        console.log("No such document!");
        set({ currentUser: null, isLoading: false });
      }


    } catch (error) {
      console.log(error)
      return set({ currentUser: null, isLoading: false });
    }
  }
}))