import { View, Text, StyleSheet } from 'react-native';

export default function Bio() {
  return (
    <View style={styles.container}>
      <Text style={styles.name}>Lamija Imamovic</Text>
      <Text style={styles.bio}>
        Computer Science student passionate about AI, technology and travel.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center'
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold'
  },
  bio: {
    textAlign: 'center',
    color: '#555',
    marginTop: 8
  }
});