import { StyleSheet, Text, View} from 'react-native';
import Map from './src/screens/Map';

// Milestone
// This is a good start
export default function App() {
  return (
    <View style={styles.container}>
      <Map/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

});
