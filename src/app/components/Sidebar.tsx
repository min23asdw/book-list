// components/Sidebar.tsx

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../store/store';
import { selectSidebars } from '../store/selectors';
import { fetchSidebarContent } from '../store/slice/sidebarSlice';

const Sidebar: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const data = useSelector(selectSidebars);
  const content = data.content;
  const status = data.status;
  const error = data.error;

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchSidebarContent());
    }
  }, [dispatch, status]);

  return (
    <div className="p-6 bg-gray-100  rounded-lg  ">
      {status === 'loading' && (
        <div className="flex justify-center items-center h-full">
          <p className="text-lg font-semibold text-gray-600">Loading...</p>
        </div>
      )}
      {status === 'failed' && (
        <div className="flex justify-center items-center h-full">
          <p className="text-lg font-semibold text-red-600">Error: {error}</p>
        </div>
      )}
      {status === 'succeeded' && (
        <div className="container mx-auto px-4">
          {content.length > 0 ? (
            <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {content.map((item) => (
                <li key={item.post_url} className="p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                  <a href={item.post_url} target="_blank" rel="noopener noreferrer">
                    <img src={item.image_url[0]} alt={item.name} className="w-full h-48 object-cover rounded-t-lg" />
                    <h2 className="text-xl font-bold text-gray-800 mt-2">{item.name}</h2>
                  </a>
                </li>
              ))}
            </ul>
          ) : (
            <div className="flex justify-center items-center h-full">
              <p className="text-lg font-semibold text-gray-600">No sidebar content available</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Sidebar;
