import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchDemos } from './slices/demosSlice';
import DemoList from './components/DemoList';
import AddDemo from './components/AddDemo';

const App: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchDemos());
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-blue-500 p-4 mb-4">
        <div className="container mx-auto">
          <h1 className="text-white text-xl"></h1>
        </div>
      </nav>
      <section className="container mx-auto max-w-4xl bg-white p-6 rounded-lg shadow-lg">
        <AddDemo />
        <DemoList />
      </section>
    </div>
  );
};

export default App;
