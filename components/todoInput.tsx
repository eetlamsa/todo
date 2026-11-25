import { useState } from 'react';
import { View, TextInput, Button } from 'react-native';

export default function TaskInput({ onAdd }: { onAdd: (text: string) => void }) {
  const [text, setText] = useState('');

  function handleAdd() {
    onAdd(text);
    setText('');
  }

  return (
    <View style={{ flexDirection: 'row', marginBottom: 16 }}>
      <TextInput
        value={text}
        onChangeText={setText}
        placeholder="Kirjoita uusi tehtävä"
        style={{ flex: 1, borderWidth: 1, padding: 8, marginRight: 8 }}
      />
      <Button title="Lisää" onPress={handleAdd} />
    </View>
  );
}