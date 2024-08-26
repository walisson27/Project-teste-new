import React, { ChangeEvent, FormEvent, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store';
import { updateDemo, deleteDemo } from '../slices/demosSlice';

const PRELOADED_DEMO_IDS = [15, 13, 7, 5, 4];

const DemoList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const demos = useSelector((state: RootState) => state.demos.demos);
  const [editDemoId, setEditDemoId] = useState<number | null>(null);
  const [editName, setEditName] = useState('');

  const handleEditSubmit = async (e: FormEvent<HTMLFormElement>, demoId: number) => {
    e.preventDefault();
    if (editDemoId !== null) {
      await dispatch(updateDemo({ id: demoId, name: editName }));
      setEditDemoId(null);
    }
  };

  const handleDelete = async (demoId: number) => {
    if (PRELOADED_DEMO_IDS.includes(demoId)) {
      alert('Esta demo é pré-carregada e não pode ser deletada. Somente edição é permitida.');
      return;
    }
    await dispatch(deleteDemo(demoId));
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Demos</h2>
      <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {demos.map((demo) => (
          <li key={demo.id} className="flex flex-col items-center bg-gray-50 p-4 rounded-lg shadow">
            {editDemoId === demo.id ? (
              <form
                onSubmit={(e) => handleEditSubmit(e, demo.id)}
                className="flex flex-col items-center space-y-2 w-full"
              >
                <textarea
                  value={editName}
                  onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setEditName(e.target.value)}
                  className="border border-gray-300 p-2 rounded-md w-full"
                />
                <button
                  type="submit"
                  className="bg-green-500 text-white p-2 rounded-md hover:bg-green-600 w-full"
                >
                  Salvar
                </button>
              </form>
            ) : (
              <textarea
                readOnly
                className="border-none p-2 rounded-md w-full cursor-pointer hover:bg-gray-100"
                onDoubleClick={() => {
                  setEditDemoId(demo.id);
                  setEditName(demo.name);
                }}
              >
                {demo.name}
              </textarea>
            )}
            <button
              onClick={() => handleDelete(demo.id)}
              className="bg-red-500 text-white p-2 rounded-md hover:bg-red-600 transition duration-300 flex items-center space-x-2"
            >
              Deletar
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DemoList;
