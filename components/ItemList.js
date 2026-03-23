import Item from "./Item";

function ItemList({ items, onToggle, onDelete }) {
  return (
    <div>
      {items.map((item) => (
        <Item
          key={item.id}
          item={item}
          onToggle={onToggle}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}

export default ItemList;