import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';

const SplitBillForm = ({ friend, onSplit }) => {
  const [bill, setBill] = useState('');
  const [myExpense, setMyExpense] = useState('');
  const [whoPaid, setWhoPaid] = useState('user');

  const friendExpense = bill ? bill - myExpense : 0;

  const handleSplit = () => {
    if (!bill || !myExpense) return;
    const balanceChange = whoPaid === 'user' ? Number(friendExpense) : -Number(myExpense);
    onSplit(balanceChange);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Split a bill with {friend.name}</Text>
      <View style={styles.row}><Text>💰 Bill value</Text><TextInput style={styles.input} keyboardType="numeric" value={bill.toString()} onChangeText={v => setBill(v)} /></View>
      <View style={styles.row}><Text>🧍 Your expense</Text><TextInput style={styles.input} keyboardType="numeric" value={myExpense.toString()} onChangeText={v => Number(v) <= bill && setMyExpense(v)} /></View>
      <View style={styles.row}><Text>👫 {friend.name}'s expense</Text><TextInput style={[styles.input, {backgroundColor: '#eee'}]} editable={false} value={friendExpense.toString()} /></View>
      <View style={styles.row}><Text>🤑 Who is paying?</Text>
        <View style={{ flexDirection: 'row', gap: 10 }}>
          <TouchableOpacity onPress={() => setWhoPaid('user')} style={[styles.choice, whoPaid === 'user' && styles.active]}><Text>You</Text></TouchableOpacity>
          <TouchableOpacity onPress={() => setWhoPaid('friend')} style={[styles.choice, whoPaid === 'friend' && styles.active]}><Text>{friend.name}</Text></TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity style={styles.splitBtn} onPress={handleSplit}><Text style={styles.btnText}>SPLIT BILL</Text></TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { backgroundColor: '#fff4e6', padding: 20, borderRadius: 10, marginTop: 20 },
  header: { fontSize: 18, fontWeight: 'bold', marginBottom: 20, textTransform: 'uppercase' },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 15 },
  input: { backgroundColor: '#fff', padding: 8, width: 80, textAlign: 'right', borderWidth: 1, borderColor: '#ccc' },
  choice: { padding: 8, borderWidth: 1, borderColor: '#ccc', borderRadius: 4 },
  active: { backgroundColor: '#fd7e14', borderColor: '#fd7e14' },
  splitBtn: { backgroundColor: '#fd7e14', padding: 12, borderRadius: 5, alignItems: 'center' },
  btnText: { fontWeight: 'bold' }
});

export default SplitBillForm;