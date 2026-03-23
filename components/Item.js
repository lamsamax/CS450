function Item({ item, onToggle, onDelete }) {
  return (
    <div style={styles.item}>
      <span>{item.text}</span>

      <div style={styles.right}>
        <input
          type="checkbox"
          checked={item.completed}
          onChange={() => onToggle(item.id)}
        />

        <button
          onClick={() => onDelete(item.id)}
          style={styles.deleteBtn}
        >
          ✖
        </button>
      </div>
    </div>
  );
}

const styles = {
  item: {
    background: "#f7f9fc",
    color: "#333",
    padding: "12px",
    marginBottom: "10px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: "8px",
    transition: "0.2s",
  },
  right: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },
  deleteBtn: {
    background: "transparent",
    border: "none",
    color: "#999",
    opacity: 0.6,
    cursor: "pointer",
    fontSize: "14px",
  },
};

export default Item;