import { View } from 'react-native';
import Item from './Item';

function ItemList({ items, onToggle, onDelete }) {
  return (
    <View>
      {items.map((item) => (
        <Item
          key={item.id}
          item={item}
          onToggle={onToggle}
          onDelete={onDelete}
        />
      ))}
    </View>
  );
}

export default ItemList;