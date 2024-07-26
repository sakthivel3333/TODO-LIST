import React, { useState } from 'react';
import { HStack, Input, Button, useToast } from '@chakra-ui/react';
import { nanoid } from 'nanoid';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const AddTodo = ({ addTodo }) => {
  const [content, setContent] = useState('');
  const [dueDate, setDueDate] = useState(new Date());
  const toast = useToast();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!content.trim()) { // Trim whitespace and check for empty content
      toast({
        title: 'No content',
        status: 'error',
        duration: 2000,
        isClosable: true
      });
      return;
    }

    const todo = {
      id: nanoid(),
      body: content.trim(), // Trim whitespace from content
      dueDate: dueDate,
      completed: false
    };

    addTodo(todo);
    setContent('');
    setDueDate(new Date());

  };

  return (
    <form onSubmit={handleSubmit}>
      <HStack mt='8'>
        <Input
          variant='filled'
          placeholder='Enter your todo here'
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <DatePicker selected={dueDate} onChange={(date) => setDueDate(date)} />
        {/* <Select value={priority} onChange={(e) => setPriority(e.target.value)}>
          <option value='Low'>Low</option>
          <option value='Medium'>Medium</option>
          <option value='High'>High</option>
        </Select> */}
        <Button type='submit' colorScheme='cyan' px='8'>
          Add Todo
        </Button>
      </HStack>
    </form>
  );
};

export default AddTodo;
