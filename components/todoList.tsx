import { FlatList } from 'react-native';
import TaskItem from './todoItem';

import type { Task } from '../types';

export default function TaskList({ tasks, onToggle }: { tasks: Task[]; onToggle: (id: string) => void }) {
  return (
    <FlatList
      data={tasks}
      keyExtractor={(task) => task.id}
      renderItem={({ item }) => (
        <TaskItem task={item} onPress={() => onToggle(item.id)} />
      )}
    />
  );
}