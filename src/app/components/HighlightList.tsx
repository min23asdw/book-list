// components/HighlightList.tsx

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../store/store";
import { fetchHighlights } from "../store/slice/hightlightSlice";
import { selectHightlight } from "../store/selectors";

const HighlightList: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const data = useSelector(selectHightlight);
  const highlights = data.highlights;
  const status = data.status;
  const error = data.error;
  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchHighlights());
    }
  }, [dispatch, status]);

  return (
    <div className="p-6 bg-gray-100 ">
      {status === "loading" && (
        <div className="flex justify-center items-center min-h-screen">
          <p className="text-xl font-semibold text-gray-600">Loading...</p>
        </div>
      )}
      {status === "failed" && (
        <div className="flex justify-center items-center min-h-screen">
          <p className="text-xl font-semibold text-red-600">Error: {error}</p>
        </div>
      )}
      {status === "succeeded" && (
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
            Highlights
          </h1>
          {highlights.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
              {highlights.map((highlight) => (
                <div
                  key={highlight.name}
                  className="relative bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden"
                >
                  <a
                    href={highlight.post_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block"
                  >
                    <img
                      src={highlight.image_url[0]} // Use the first image as a preview
                      alt={highlight.name}
                      className="w-full h-48 object-cover"
                    />
                    <div className="p-4">
                      <h2 className="text-lg font-semibold text-gray-800 mb-2">
                        {highlight.name}
                      </h2>
                      <p className="text-gray-600 text-sm">
                        {highlight.message}
                      </p>
                    </div>
                  </a>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex justify-center items-center min-h-screen">
              <p className="text-xl font-semibold text-gray-600">
                No highlights available
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default HighlightList;
