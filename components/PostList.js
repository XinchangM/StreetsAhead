import { View, Text,FlatList,StyleSheet} from 'react-native'
import React,{useState,useEffect} from 'react'
import { firestore, auth } from "../firebase/firebase-setup";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import PostItem from "./PostItem"
export default function PostList() {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(
        collection(firestore, "posts"),
        where("userId", "==", auth.currentUser.uid)
      ),
      (querySnapshot) => {
        if (querySnapshot.empty) {
          setPosts([]);
          return;
        }
        setPosts(
          querySnapshot.docs.map((snapDoc) => {
            let data = snapDoc.data();
            data = { ...data, key: snapDoc.id };
            return data;
          })
        );
      },
      (err) => {
        console.log(err);
      }
    );
    return () => {
      unsubscribe();
    };
  }, []);
  return (
    <View style={styles.postList}>
      <Text>PostList</Text>
      <FlatList
          data={posts}
          renderItem={({ item }) => {
            // console.log(item);
            return (
              <PostItem
                post={item}
                option={2}
               
              />
            );
          }}
         
        ></FlatList>
    </View>
  )
}
const styles = StyleSheet.create({
  postList: {
    flex: 1,
    padding: 20,
  },
});