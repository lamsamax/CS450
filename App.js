import { View, StyleSheet } from 'react-native';
import Avatar from './components/avatar';
import Bio from './components/bio';
import Skills from './components/skills';

export default function App() {
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Avatar />
        <Bio />
        <Skills />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F2',
    justifyContent: 'center',
    alignItems: 'center'
  },
  card: {
    width: 300,
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 20,
    alignItems: 'center',

    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 10,

    elevation: 8
  }
});