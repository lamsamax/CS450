import { Image, StyleSheet } from 'react-native';

export default function Avatar() {
  return (
    <Image
      source={{ uri: 'https://fls.ba/wp-content/uploads/2025/09/TD052AKUP-U07JKFHUU2G-e7ccaa89b585-512-1000x1060.png' }}
      style={styles.avatar}
    />
  );
}

const styles = StyleSheet.create({
  avatar: {
    width: 110,
    height: 110,
    borderRadius: 55,
    marginBottom: 15
  }
});