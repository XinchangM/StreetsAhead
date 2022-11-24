import {
  collection,
  addDoc,
  doc,
  getDoc,
  setDoc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
import { firestore,auth } from "./firebase-setup";

export async function saveUserInfo(userName) {

  try {
    const docRef = await addDoc(collection(firestore, "users"), {
      userId:auth.currentUser.uid,
      userName:userName
    });
  } catch (err) {
    console.log(err);
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




export async function deleteEventFromDB(key) {
  try {
    await deleteDoc(doc(firestore, "events", key));
  } catch (err) {
    console.log(err);
  }
}

export async function updateEvent(key,startTime,endTime,coordinate,performer,eventName) {
  try {
    const ref = doc(firestore, "events", key);
    await updateDoc(ref, {
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


export async function deletePostFromDB(key) {
  try {
    await deleteDoc(doc(firestore, "posts", key));
  } catch (err) {
    console.log(err);
  }
}