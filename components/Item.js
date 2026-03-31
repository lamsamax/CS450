import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

function Item({ item, onToggle, onDelete }) {
  return (
    <View style={styles.item}>
      <Text
        style={[
          styles.text,
          item.completed && styles.completed
        ]}
      >
        {item.text}
      </Text>

      <View style={styles.right}>
        <TouchableOpacity onPress={() => onToggle(item.id)}>
          <Text>{item.completed ? "☑️" : "⬜"}</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => onDelete(item.id)}>
          <Text style={styles.delete}>✖</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  item: {
    backgroundColor: "#f7f9fc",
    padding: 12,
    marginBottom: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 8,
  },
  right: {
    flexDirection: "row",
    alignItems: "center",
  },
  text: {
    color: "#333",
  },
  completed: {
    textDecorationLine: "line-through",
    color: "gray",
  },
  delete: {
    color: "#999",
    marginLeft: 10,
  },
});