// components/TagList.tsx

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../store/store";
import { fetchTags } from "../store/slice/tagSlice";
import { selectTags } from "../store/selectors";
// import { fetchTags } from '../store/tagSlice';

const TagList: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();

  const data = useSelector(selectTags);

  const tags = data.tags;
  const status = data.status;
  const error = data.error;
  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchTags());
    }

    console.log(tags);
  }, [dispatch, status]);

  return (
    <div className=" bg-gray-100 items-center    p-6">
      {status === "loading" && (
        <div className="flex justify-center items-center w-full h-full">
          <p className="text-lg font-semibold text-gray-600">Loading...</p>
        </div>
      )}
      {status === "failed" && (
        <div className="flex justify-center items-center w-full h-full">
          <p className="text-lg font-semibold text-red-600">Error: {error}</p>
        </div>
      )}
      {status === "succeeded" && (
        <div className=" px-2 py-6">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">
            Trending Tags
          </h1>
          <div className="overflow-x-auto p-4">
                {Array.isArray(tags) && tags.length > 0 ? (
            <div className="flex flex-row space-x-4  ">
              {tags.map((tag) => (
                <div
                  key={tag.slug}
                  className="bg-white rounded-lg shadow p-2 px-6 flex flex-col w-full"
                >
                  <h2 className="text-lg font-semibold text-gray-800 mb-2  w-[200px]">
                    {tag.name}
                  </h2>
                  <div className="text-gray-600 text-sm">
                    <p className="flex items-center mb-1">
                       
                      Pageviews:{" "}
                      <span className="font-semibold text-gray-900 ml-1">
                        {tag.pageview}
                      </span>
                    </p>
                    <p className="flex items-center mb-1">
                    
                      Topics:{" "}
                      <span className="font-semibold text-gray-900 ml-1">
                        {tag.topic_count}
                      </span>
                    </p>
                    <p className="flex items-center">
                     
                      Followers:{" "}
                      <span className="font-semibold text-gray-900 ml-1">
                        {tag.follow_count}
                      </span>
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex justify-center items-center w-full h-full">
              <p className="text-lg font-semibold text-gray-600">
                No tags available
              </p>
            </div>
          )}
          </div>
      
        </div>
      )}
    </div>
  );
};

export default TagList;
