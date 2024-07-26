import React, { useState } from 'react';
import { VStack, StackDivider, HStack, Text, Spacer, IconButton, Badge, Input, Checkbox } from '@chakra-ui/react';
import { FaTrash, FaEdit, FaSave } from "react-icons/fa";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const TodoList = ({ todos, deleteTodo, editTodo, toggleComplete }) => {
  const [editId, setEditId] = useState(null);
  const [editText, setEditText] = useState('');
  const [editDueDate, setEditDueDate] = useState(new Date());
  const handleEdit = (id, body, dueDate, priority) => {
    setEditId(id);
    setEditText(body);
    setEditDueDate(new Date(dueDate));
  };

  const handleSave = () => {
    if (editText.trim()) { // Check if edited text is not empty
      editTodo(editId, editText, editDueDate); // Call editTodo with updated text
      setEditId(null);
      setEditText('');
    }
  };

  if (!todos.length) {
    return (
      <Badge colorScheme='cyan' p='4' borderRadius='lg'>
        No Todos, yay!!!
      </Badge>
    );
  }

  return (
    <VStack divider={<StackDivider />} borderWidth='2px' borderColor='gray.100' borderRadius='lg' padding='4' w='100%' maxW={{ base: '90vw', sm: '80vw', lg: '50vw', xl: '40vw' }} alignItems='stretch'>
      {todos.map(todo => (
        <HStack key={todo.id}>
          <Checkbox isChecked={todo.completed} onChange={() => toggleComplete(todo.id)} />
          {editId === todo.id ? (
            <>
              <Input value={editText} onChange={(e) => setEditText(e.target.value)} />
              <DatePicker selected={editDueDate} onChange={(date) => setEditDueDate(date)} />
              {/* <Select value={editPriority} onChange={(e) => setEditPriority(e.target.value)}>
                <option value='Low'>Low</option>
                <option value='Medium'>Medium</option>
                <option value='High'>High</option>
              </Select> */}
              <IconButton icon={<FaSave />} isRound onClick={handleSave} />
            </>
          ) : (
            <>
              <Text as={todo.completed ? 's' : 'span'}>{todo.body}</Text>
              <Text>{new Date(todo.dueDate).toLocaleDateString()}</Text>
              <Text>{todo.priority}</Text>
              <Spacer />
              <IconButton icon={<FaEdit />} isRound onClick={() => handleEdit(todo.id, todo.body, todo.dueDate, todo.priority)} />
              <IconButton icon={<FaTrash />} isRound onClick={() => deleteTodo(todo.id)} />
            </>
          )}
        </HStack>
      ))}
    </VStack>
  );
}

export default TodoList;
