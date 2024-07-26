import React, { useState, useEffect } from 'react';
import { VStack, IconButton, Box, Heading, useColorMode, Input, Select, HStack } from '@chakra-ui/react';
import { FaSun, FaMoon } from "react-icons/fa";
import TodoList from './components/TodoList';
import AddTodo from './components/AddTodo';

function App() {
  const [todos, setTodos] = useState(() => JSON.parse(localStorage.getItem('todos')) || []);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('All');

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  function deleteTodo(id) {
    const newTodos = todos.filter((todo) => {
      return todo.id !== id;
    });

    setTodos(newTodos);
  }

  function addTodo(todo) {
    setTodos([...todos, todo]);
  }

  function editTodo(id, updatedText, updatedDueDate, updatedPriority) {
    const updatedTodos = todos.map(todo => 
      todo.id === id ? { ...todo, body: updatedText, dueDate: updatedDueDate, priority: updatedPriority } : todo
    );
    setTodos(updatedTodos);
  }

  function toggleComplete(id) {
    const updatedTodos = todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    );
    setTodos(updatedTodos);
  }

  const filteredTodos = todos.filter(todo => {
    if (filter === 'Completed') return todo.completed;
    if (filter === 'Incomplete') return !todo.completed;
    return true;
  }).filter(todo => todo.body.toLowerCase().includes(searchTerm.toLowerCase()));

  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <VStack p='4'>
      <IconButton 
        icon={colorMode === 'light' ? <FaSun /> : <FaMoon />} 
        isRound={true} 
        size='lg' 
        alignSelf='flex-end' 
        onClick={toggleColorMode} 
      />
      <Box>
        <Heading 
          mb='8' 
          fontWeight='extrabold' 
          size='2xl' 
          bgGradient='linear(to-r, cyan.400, purple.400, pink.400)' 
          bgClip='text'
        >
          Todo Application
        </Heading>
      </Box>
      <HStack 
        mb='4' 
        w='100%' 
        maxW={{ base: '90vw', sm: '80vw', lg: '50vw', xl: '40vw' }} 
        spacing='4'
        flexDirection={{ base: 'column', md: 'row' }}
      >
        <Input
          placeholder='Search todos...'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Select 
          value={filter} 
          onChange={(e) => setFilter(e.target.value)} 
          flexShrink={0}
          w={{ base: '100%', md: '200px' }}
        >
          <option value='All'>All</option>
          <option value='Completed'>Completed</option>
          <option value='Incomplete'>Incomplete</option>
        </Select>
      </HStack>
      <TodoList todos={filteredTodos} deleteTodo={deleteTodo} editTodo={editTodo} toggleComplete={toggleComplete} />
      <AddTodo addTodo={addTodo} />
    </VStack>
  );
}

export default App;
