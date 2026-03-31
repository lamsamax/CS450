import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from "react-native";

export default function App() {
  const [items, setItems] = useState([]);
  const [input, setInput] = useState("");

  const addItem = () => {
    if (input.trim() === "") return;

    const newItem = {
      id: Date.now().toString(),
      text: input,
      completed: false,
    };

    setItems([...items, newItem]);
    setInput("");
  };

  const toggleItem = (id) => {
    setItems(
      items.map((item) =>
        item.id === id
          ? { ...item, completed: !item.completed }
          : item
      )
    );
  };

  const deleteItem = (id) => {
    setItems(items.filter((item) => item.id !== id));
  };

  return (
    <View style={styles.container}>
      <View style={styles.appBox}>
        
        {/* Input Row */}
        <View style={styles.inputRow}>
          <TextInput
            placeholder="new item"
            value={input}
            onChangeText={setInput}
            style={styles.input}
          />

          <TouchableOpacity onPress={addItem} style={styles.addBtn}>
            <Text style={styles.btnText}>ADD</Text>
          </TouchableOpacity>
        </View>

        {/* Title */}
        <Text style={styles.title}>SHOPPING LIST</Text>

        {/* List */}
        <FlatList
          data={items}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.itemRow}>
              <TouchableOpacity onPress={() => toggleItem(item.id)}>
                <Text
                  style={[
                    styles.itemText,
                    item.completed && styles.completed,
                  ]}
                >
                  {item.text}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => deleteItem(item.id)}>
                <Text style={styles.delete}>❌</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#9face6",
  },
  appBox: {
    width: "90%",
    backgroundColor: "white",
    padding: 20,
    borderRadius: 15,
    elevation: 5,
  },
  inputRow: {
    flexDirection: "row",
    marginBottom: 20,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 10,
  },
  addBtn: {
    backgroundColor: "#4CAF50",
    marginLeft: 10,
    paddingHorizontal: 15,
    justifyContent: "center",
    borderRadius: 8,
  },
  btnText: {
    color: "white",
    fontWeight: "bold",
  },
  title: {
    textAlign: "center",
    fontWeight: "bold",
    fontSize: 18,
    marginBottom: 15,
  },
  itemRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
  },
  itemText: {
    fontSize: 16,
  },
  completed: {
    textDecorationLine: "line-through",
    color: "gray",
  },
  delete: {
    fontSize: 18,
  },
});