import { Button, FlatList, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { FIRESTORE_DB } from '../../firebaseConfig'
import { addDoc, collection, onSnapshot, updateDoc, deleteDoc, doc } from 'firebase/firestore'
import Ionicons from '@expo/vector-icons/Ionicons'
import { Entypo } from '@expo/vector-icons'

export interface Todo {
    title: string;
    done: boolean;
    id: string;
}

const List = ({ navigation }: any) => {

    const [todos, setTodos] = useState<Todo[]>([]);
    const [todo, setTodo] = useState('');

    useEffect(() => {

        const todoRef = collection(FIRESTORE_DB, 'todos');
        const subscriber = onSnapshot(todoRef, {
            next: (snapshot) => {
                const todos: Todo[] = [];
                snapshot.docs.forEach((doc) => {

                    todos.push({
                        id: doc.id,
                        ...doc.data()
                    } as Todo)
                });
                setTodos(todos)
            }
        })
        return () => subscriber();


    }, [])

    const addTodo = async () => {

        const doc = await addDoc(collection(FIRESTORE_DB, 'todos'), { title: todo, done: false })
        setTodo('');
    };


    const renderTodo = ({ item }: any) => {


        const ref = doc(FIRESTORE_DB, `todos/${item.id}`);
        const toggleDone = async () => {
            updateDoc(ref, { done: !item.done });
        }

        const deleteItem = async () => {
           deleteDoc(ref);
        }

        return (
            <ScrollView>
                <View style={styles.todoContainer}>
                    <TouchableOpacity onPress={toggleDone} style={styles.todo}>

                        {item.done && <Ionicons name='md-checkmark-circle' size={32} color="green" />}
                        {!item.done && <Entypo name='circle' size={32} color="black" />}

                        <Text style={styles.todoText}>{item.title}</Text>
                    </TouchableOpacity>
                <TouchableOpacity onPress={()=>navigation.navigate('Details')}>
                    <Text style={styles.touchableContainer} >
                    Go to detail
                    </Text>
                </TouchableOpacity >
                    <Ionicons name="trash-bin-outline" size={24} color="black" onPress={deleteItem} />
                </View>
            </ScrollView>
        )
    }

    return (
        <View style={styles.container}>
            <View style={styles.form}>
                <TextInput
                    style={styles.input}
                    placeholder='Add new todo'
                    onChangeText={(text: string) => setTodo(text)}
                    value={todo}
                />
                <Button onPress={addTodo} title="Add Todo" disabled={todo === ''} />
            </View>
            {todos.length > 0 && (
                <View>
                    <FlatList
                        data={todos}
                        renderItem={(item) => renderTodo(item)}
                        keyExtractor={(todo: Todo) => todo.id}
                    />
                </View>)}
        </View>
    )
}

export default List

const styles = StyleSheet.create({

    container: {
        marginTop: 20,
        marginHorizontal: 20,

    },

    form: {
        flexDirection: "row",
        alignItems: "center",

    },

    input: {
        flex: 1,
        height: 40,
        borderWidth: 1,
        borderRadius: 4,
        padding: 10,
        backgroundColor: "#fff",
       
    },

    todoContainer: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "white",
        padding: 10,
        marginVertical: 4,
    },
    todoText: {
        flex: 1,
        paddingHorizontal: 4,
    },

    todo: {
        flex: 1,
        flexDirection: "row",
        alignItems: "center",
    },

    touchableContainer:{

        color:"dodgerblue",
        marginRight:10,
    }

})