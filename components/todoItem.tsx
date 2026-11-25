import { Pressable, Text } from 'react-native';
import type { Task } from '../types';

export default function TaskItem({ task, onPress }: { task: Task; onPress: () => void }) {
  return (
    <Pressable
      onPress={onPress}
      style={{ padding: 12, borderBottomWidth: 1, borderColor: '#ddd' }}
    >
      <Text
        style={{
          textDecorationLine: task.done ? 'line-through' : 'none',
        }}
      >
        {task.done ? '✓ ' : '○ '}
        {task.text}
      </Text>
    </Pressable>
  );
}