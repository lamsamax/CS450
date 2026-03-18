import { View, Text, StyleSheet } from 'react-native';
import skills from '../skills.json';

export default function Skills() {
  return (
    <View style={styles.container}>
      {skills.map((item, index) => (
        <Text
          key={index}
          style={[styles.skill, { backgroundColor: item.color }]}
        >
          {item.skill}
        </Text>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: 15
  },
  skill: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20, // 🔥 rounded pills
    margin: 5,
    fontSize: 12,
    fontWeight: '500'
  }
});