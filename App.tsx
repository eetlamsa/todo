import { StatusBar } from 'expo-status-bar';
import { Text, View } from 'react-native';
import { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import TaskInput from './components/todoInput';
import TaskList from './components/todoList';
import type { Task } from './types';
import styles from './mainscreenStyle';

const STORAGE_KEY = 'tasks';

export default function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    async function loadTasks() {
      try {
        const savedTasks = await AsyncStorage.getItem(STORAGE_KEY);
        const parsedTasks = savedTasks ? JSON.parse(savedTasks) : [];
        setTasks(Array.isArray(parsedTasks) ? parsedTasks : []);
      } catch (error) {
        console.error('Tehtävien lataaminen epäonnistui:', error);
      } finally {
        setLoaded(true);
      }
    }

    loadTasks();
  }, []);

  useEffect(() => {
    if (!loaded) return;

    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(tasks)).catch((error) => {
      console.error('Tehtävien tallentaminen epäonnistui:', error);
    });
  }, [tasks, loaded]);

  function addTask(text: string) {
    const trimmedText = text.trim();
    if (!trimmedText) return;

    setTasks((currentTasks) => [
      ...currentTasks,
      { id: `${Date.now()}`, text: trimmedText, done: false },
    ]);
  }

  function toggleTask(id: string) {
    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        task.id === id ? { ...task, done: !task.done } : task
      )
    );
  }

  return (
    <View style={styles.screen}>
      <StatusBar style="dark" />
      <Text style={styles.title}>Tehtävälista</Text>
      <TaskInput onAdd={addTask} />
      <TaskList tasks={tasks} onToggle={toggleTask} />
    </View>
  );
}

