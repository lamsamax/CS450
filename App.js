import { useState } from "react";
import ItemList from "./components/ItemList";

function App() {
  const [items, setItems] = useState([]);
  const [input, setInput] = useState("");

  const addItem = () => {
    if (input.trim() === "") return;

    const newItem = {
      id: Date.now(),
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

  return (
    <div style={styles.container}>
      <div style={styles.appBox}>
        
        {/* Input Row */}
        <div style={styles.inputRow}>
          <input
            type="text"
            placeholder="new item"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addItem()}
            style={styles.input}
          />
          <button onClick={addItem} style={styles.addBtn}>
            ADD ITEM
          </button>
        </div>

        {/* Title */}
        <div style={styles.titleBox}>SHOPPING LIST</div>

        {/* List */}
        <ItemList
          items={items}
          onToggle={toggleItem}
          onDelete={(id) =>
            setItems(items.filter((item) => item.id !== id))
        }
      />
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    background: "linear-gradient(135deg, #74ebd5, #9face6)",
    fontFamily: "Arial",
  },
  appBox: {
    width: "350px",
    background: "white",
    padding: "25px",
    borderRadius: "15px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
  },
  inputRow: {
    display: "flex",
    gap: "10px",
    marginBottom: "20px",
  },
  input: {
    flex: 1,
    padding: "10px",
    borderRadius: "8px",
    border: "1px solid #ddd",
    outline: "none",
    fontSize: "14px",
  },
  addBtn: {
    background: "#4CAF50",
    color: "white",
    border: "none",
    padding: "10px 15px",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "bold",
    transition: "0.2s",
  },
  titleBox: {
    textAlign: "center",
    marginBottom: "15px",
    fontWeight: "bold",
    fontSize: "18px",
    color: "#333",
  },
};

export default App;