import React, { useState } from 'react';
import { StyleSheet, Text, View, FlatList, TextInput, TouchableOpacity } from 'react-native';
import FriendItem from './FriendItem'; // Pošto su u istom folderu, ide samo ./

const FriendList = ({ friends, onSelectFriend, selectedFriend, onAddFriend }) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [name, setName] = useState('');
  const [image, setImage] = useState('https://i.pravatar.cc/48');

  const handleAdd = () => {
    if (!name) return;
    const id = Math.floor(Math.random() * 1000000);
    onAddFriend({ id, name, image: `${image}?u=${id}`, balance: 0 });
    setName('');
    setShowAddForm(false);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={friends}
        scrollEnabled={false}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <FriendItem 
            friend={item} 
            onSelect={onSelectFriend} 
            isSelected={selectedFriend?.id === item.id} 
          />
        )}
      />
      {showAddForm && (
        <View style={styles.formCard}>
          <Text style={styles.formTitle}>Add new friend</Text>
          <View style={styles.inputGroup}><Text>👫 Name:</Text><TextInput style={styles.input} value={name} onChangeText={setName} /></View>
          <View style={styles.inputGroup}><Text>🖼️ Image:</Text><TextInput style={styles.input} value={image} onChangeText={setImage} /></View>
          <TouchableOpacity style={styles.actionBtn} onPress={handleAdd}><Text style={styles.btnText}>ADD FRIEND</Text></TouchableOpacity>
        </View>
      )}
      <TouchableOpacity style={styles.toggleBtn} onPress={() => setShowAddForm(!showAddForm)}>
        <Text style={styles.btnText}>{showAddForm ? "CLOSE" : "ADD FRIEND"}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  formCard: { backgroundColor: '#fff4e6', padding: 15, borderRadius: 10, marginVertical: 10 },
  formTitle: { fontWeight: 'bold', marginBottom: 10, fontSize: 16 },
  inputGroup: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
  input: { backgroundColor: '#fff', borderWidth: 1, borderColor: '#ccc', width: '60%', padding: 5 },
  toggleBtn: { backgroundColor: '#fd7e14', padding: 12, borderRadius: 5, alignItems: 'center', marginTop: 10 },
  actionBtn: { backgroundColor: '#fd7e14', padding: 10, borderRadius: 5, alignItems: 'center' },
  btnText: { fontWeight: 'bold' }
});

export default FriendList;