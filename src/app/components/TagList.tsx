// components/TagList.tsx

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../store/store';
import { fetchTags } from '../store/slice/tagSlice';
// import { fetchTags } from '../store/tagSlice';

const TagList: React.FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const tags = useSelector((state: RootState) => state.tags.tags);
  const status = useSelector((state: RootState) => state.tags.status);
  const error = useSelector((state: RootState) => state.tags.error);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchTags());
    }

    console.log(tags)
  }, [dispatch, status]);

  return (
    <div>
      {status === 'loading' && <p>Loading...</p>}
      {status === 'failed' && <p>Error: {error}</p>}
      {status === 'succeeded' && (
        <ul>
           {Array.isArray(tags) && tags.map((tag) => (
            <li key={tag.slug}>
              <h2>{tag.name}</h2>
              <p>Pageviews: {tag.pageview}</p>
              <p>Topics: {tag.topic_count}</p>
              <p>Followers: {tag.follow_count}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TagList;
