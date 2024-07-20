// components/RoomList.tsx

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../store/store";
import { selectRooms } from "../store/selectors";
import { fetchRooms } from "../store/slice/roomSlice";
// import { fetchRooms } from '../store/roomSlice';

const RoomList: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();

  const data = useSelector(selectRooms);

  const rooms = data.rooms;
  const status = data.status;
  const error = data.error;

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchRooms());
    }
  }, [dispatch, status]);

  return (
    <div className="p-4 overflow-x-scroll ">
      {status === "loading" && (
        <div className="flex justify-center items-center w-full h-[200px]">
          <p className="text-lg font-semibold text-gray-600">Loading...</p>
        </div>
      )}
      {status === "failed" && (
        <div className="flex justify-center items-center w-full h-[200px]">
          <p className="text-lg font-semibold text-red-600">Error: {error}</p>
        </div>
      )}
      {status === "succeeded" && (
        <div className="">
          {rooms.length > 0 ? (
            <ul className="flex space-x-4">
              {rooms.map((room) => (
                <li
                  key={room.id}
                  className="p-2 bg-slate-200 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300   "
                >
                  <a
                    href={room.link_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block"
                  >
                    {/* <img
                      src={room.room_icon_url}
                      alt={room.name}
                      className="mx-auto h-8 w-8 object-cover rounded-t-lg"
                    /> */}
                    <div className="p-2  w-[110px]">
                      <h2 className="text-sm font-semibold text-gray-800 text-center">
                        {room.name}
                      </h2>
                      {/* <p className="text-gray-600 text-sm text-center">
                        {room.description}
                      </p> */}
                    </div>
                  </a>
                </li>
              ))}
            </ul>
          ) : (
            <div className="flex justify-center items-center w-full">
              <p className="text-lg font-semibold text-gray-600">
                No rooms available
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default RoomList;
