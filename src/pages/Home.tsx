import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

export const Home = () => {
	const [tasks, setTasks] = useState<Task[]>([]);

	const handleAddTask = (newTaskTitle: string) => {
		const randomIntFromTime = new Date().getTime();

		const newTask: Task = { id: randomIntFromTime, title: newTaskTitle, done: false };

		setTasks((prevTasks) => [...prevTasks, newTask]);
	};

	const handleToggleTaskDone = (id: number) => {
		const updatedTasks = tasks.map((task) => (task.id === id ? { ...task, done: !task.done } : task));

		setTasks(updatedTasks);
	};

	const handleRemoveTask = (id: number) => {
		setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
	};

	return (
		<View style={styles.container}>
			<Header tasksCounter={tasks.length} />

			<TodoInput addTask={handleAddTask} />

			<TasksList tasks={tasks} toggleTaskDone={handleToggleTaskDone} removeTask={handleRemoveTask} />
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#EBEBEB',
	},
});
