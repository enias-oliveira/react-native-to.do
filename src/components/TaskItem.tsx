import React, { useState, useRef, useEffect } from 'react';
import { View, TouchableOpacity, Text, Image, StyleSheet, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/Feather';

import { Task } from './TasksList';

import trashIcon from '../assets/icons/trash/trash.png';
import pencilIcon from '../assets/icons/pencil/pencil.png';

interface TaskItemProps {
	item: Task;
	index: number;
	toggleTaskDone: (id: number) => void;
	removeTask: (id: number) => void;
	editTask: (id: number, taskNewTitle: string) => void;
}

const TaskItem = ({ item, index, toggleTaskDone, removeTask, editTask }: TaskItemProps) => {
	const [isEditing, setIsEditing] = useState(false);
	const [taskTitle, setTaskTitle] = useState(item.title);

	const textInputRef = useRef<TextInput>(null);

	const handleStartEditing = () => setIsEditing(true);

	const handleCancelEditing = () => {
		setTaskTitle(item.title);
		setIsEditing(false);
	};

	const handleSubmitEditing = () => {
		editTask(item.id, taskTitle);
		setIsEditing(false);
	};

	useEffect(() => {
		if (textInputRef.current && isEditing) {
			textInputRef.current.focus();
		} else if (textInputRef.current) {
			textInputRef.current.blur();
		}
	}, [isEditing]);

	return (
		<View style={styles.container}>
			<View>
				<TouchableOpacity
					testID={`button-${index}`}
					activeOpacity={0.7}
					style={styles.taskButton}
					onPress={() => toggleTaskDone(item.id)}
				>
					<View testID={`marker-${index}`} style={item.done ? styles.taskMarkerDone : styles.taskMarker}>
						{item.done && <Icon name='check' size={12} color='#FFF' />}
					</View>

					<TextInput
						ref={textInputRef}
						value={taskTitle}
						onChangeText={setTaskTitle}
						editable={isEditing}
						onSubmitEditing={handleSubmitEditing}
						style={item.done ? styles.taskTextDone : styles.taskText}
					/>
				</TouchableOpacity>
			</View>

			<View style={styles.iconsContainer}>
				{isEditing ? (
					<TouchableOpacity onPress={() => handleCancelEditing()}>
						<Icon name='x' size={24} color='#b2b2b2' />
					</TouchableOpacity>
				) : (
					<TouchableOpacity onPress={() => handleStartEditing()}>
						<Image source={pencilIcon} />
					</TouchableOpacity>
				)}

				<View style={styles.iconsDivider} />

				<TouchableOpacity testID={`trash-${index}`} onPress={() => removeTask(item.id)} disabled={isEditing}>
					<Image source={trashIcon} style={{ opacity: isEditing ? 0.2 : 1 }} />
				</TouchableOpacity>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
	},
	taskButton: {
		flex: 1,
		paddingHorizontal: 24,
		marginBottom: 4,
		borderRadius: 4,
		flexDirection: 'row',
		alignItems: 'center',
	},
	taskMarker: {
		height: 16,
		width: 16,
		borderRadius: 4,
		borderWidth: 1,
		borderColor: '#B2B2B2',
		marginRight: 15,
		alignItems: 'center',
		justifyContent: 'center',
	},
	taskText: {
		color: '#666',
		fontFamily: 'Inter-Medium',
	},
	taskMarkerDone: {
		height: 16,
		width: 16,
		borderRadius: 4,
		backgroundColor: '#1DB863',
		marginRight: 15,
		alignItems: 'center',
		justifyContent: 'center',
	},
	taskTextDone: {
		color: '#1DB863',
		textDecorationLine: 'line-through',
		fontFamily: 'Inter-Medium',
	},
	iconsDivider: { width: 1, height: 24, backgroundColor: 'rgba(196,196,196,0.24)', marginHorizontal: 12 },
	iconsContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		paddingLeft: 12,
		paddingRight: 24,
	},
});

export default TaskItem;
