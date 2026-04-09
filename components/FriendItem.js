import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';

const FriendItem = ({ friend, onSelect, isSelected }) => {
  return (
    <View style={[styles.friendRow, isSelected && styles.selectedRow]}>
      <Image source={{ uri: friend.image }} style={styles.avatar} />
      <View style={{ flex: 1 }}>
        <Text style={styles.friendName}>{friend.name}</Text>
        {friend.balance < 0 && <Text style={styles.redText}>You owe {friend.name} ${Math.abs(friend.balance)}</Text>}
        {friend.balance > 0 && <Text style={styles.greenText}>{friend.name} owes you ${friend.balance}</Text>}
        {friend.balance === 0 && <Text style={styles.grayText}>{friend.name} and you are even</Text>}
      </View>
      <TouchableOpacity style={styles.selectBtn} onPress={() => onSelect(isSelected ? null : friend)}>
        <Text style={styles.btnText}>{isSelected ? "Close" : "Select"}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  friendRow: { flexDirection: 'row', alignItems: 'center', padding: 12, borderRadius: 8, marginBottom: 10 },
  selectedRow: { backgroundColor: '#fff4e6' },
  avatar: { width: 48, height: 48, borderRadius: 24, marginRight: 15 },
  friendName: { fontWeight: 'bold', fontSize: 16 },
  redText: { color: '#e03131' },
  greenText: { color: '#099268' },
  grayText: { color: '#495057' },
  selectBtn: { backgroundColor: '#fd7e14', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 5 },
  btnText: { fontWeight: '600' }
});

export default FriendItem;