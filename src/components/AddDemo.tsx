import React, { useState, ChangeEvent, FormEvent } from 'react';
import { useDispatch } from 'react-redux';
import { addDemo } from '../slices/demosSlice';
import { AppDispatch } from '../store';

const AddDemo: React.FC = () => {
  const [name, setName] = useState('');
  const dispatch = useDispatch<AppDispatch>();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (name.trim()) {
      await dispatch(addDemo(name));
      setName('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <input
        type="text"
        value={name}
        onChange={(e: ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
        className="border border-gray-300 p-2 rounded-md w-full"
        placeholder="Nome da Demo"
      />
      <button
        type="submit"
        className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600 mt-2"
      >
        Adicionar Demo
      </button>
    </form>
  );
};

export default AddDemo;
