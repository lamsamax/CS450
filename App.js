import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, SafeAreaView, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

// ISPRAVLJENE PUTANJE PREMA TVOJOJ SLICI:
import FriendList from './components/FriendList'; 
import SplitBillForm from './components/SplitBillForm'; 

const STORAGE_KEY = '@eat_n_split_data';

const initialData = [
  { id: 118836, name: "Clark", image: "https://i.pravatar.cc/48?u=118836", balance: -7 },
  { id: 933372, name: "Sarah", image: "https://i.pravatar.cc/48?u=933372", balance: 20 },
  { id: 499476, name: "Anthony", image: "https://i.pravatar.cc/48?u=499476", balance: 0 },
];

export default function App() {
  const [friends, setFriends] = useState([]);
  const [selectedFriend, setSelectedFriend] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const stored = await AsyncStorage.getItem(STORAGE_KEY);
        setFriends(stored ? JSON.parse(stored) : initialData);
      } catch (e) { console.error("Greška pri učitavanju", e); }
    };
    loadData();
  }, []);

  const saveAndSetFriends = async (newList) => {
    setFriends(newList);
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newList));
  };

  const handleAddFriend = (newFriend) => {
    saveAndSetFriends([...friends, newFriend]);
  };

  const handleSplit = (balanceChange) => {
    const newList = friends.map(f => 
      f.id === selectedFriend.id ? { ...f, balance: f.balance + balanceChange } : f
    );
    saveAndSetFriends(newList);
    setSelectedFriend(null);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.title}>Eat-n-Split</Text>
        <FriendList 
          friends={friends} 
          onSelectFriend={setSelectedFriend} 
          selectedFriend={selectedFriend}
          onAddFriend={handleAddFriend}
        />
        {selectedFriend && (
          <SplitBillForm 
            friend={selectedFriend} 
            onSplit={handleSplit} 
            key={selectedFriend.id} 
          />
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#fff' },
  container: { padding: 20 },
  title: { fontSize: 28, fontWeight: 'bold', marginVertical: 20, textAlign: 'left' }
});