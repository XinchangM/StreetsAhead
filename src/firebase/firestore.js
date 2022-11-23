import {
    collection,
    addDoc,
    deleteDoc,
    doc,
    setDoc,
    getDoc,
  } from "firebase/firestore";
  
  import { firestore, auth } from "./firebase-setup";
  
  export async function saveUserInfo(userName) {
    try {
        const docRef = await addDoc(collection(firestore, "users"), {
        userId:auth.currentUser.uid,
        userName:userName
      });
    } catch (err) {
      console.log("save user ", err);
    }
  }

  export async function getUser() {
    const docRef = doc(firestore, "users", auth.currentUser.uid);
    const docSnap = await getDoc(docRef);
  
    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
  
      return docSnap.data();
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
    }
  }
  export async function writeEventToDB({ startTime,endTime,coordinate,performer,eventName }) {
    try {
      const docRef = await addDoc(collection(firestore, "events"), {
        startTime:startTime,
        endTime:endTime,
        coordinate:coordinate,
        performer:performer,
        userId:auth.currentUser.uid,
        eventName:eventName
      });
    } catch (err) {
      console.log(err);
    }
  }
  
  export async function writePostToDB({mediaUri,postTime,linkedEventId,comment}) {
    try {
      const docRef = await addDoc(collection(firestore, "posts"), {
        mediaUri:mediaUri,
        postTime:postTime,
        userId:auth.currentUser.uid,
        linkedEventId :linkedEventId,
        comment:comment
      });
    } catch (err) {
      console.log(err);
    }
  }