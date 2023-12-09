import { ChangeEvent, useState } from 'react';
import { graphSlice } from '../../redux/GraphQLSlice';
import { useAppDispatch, useAppSelector } from '../../redux/reduxHooks';

export const RequestSection = () => {
  const { setQuery } = graphSlice.actions;
  const dispatch = useAppDispatch();
  const { query } = useAppSelector((state) => state.graphReducer);

  const [requestQuery, setRequestQuery] = useState('');

  const handlerChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setRequestQuery(event.target.value);
  };
  const onBlurHandler = () => {
    if (query !== requestQuery) {
      dispatch(setQuery(requestQuery));
    }
  };

  return (
    <div className="editor request-section">
      <div className="request">
        <div className="request-response-title">Request</div>
        <textarea
          name="query"
          className="request-area"
          value={requestQuery}
          onChange={handlerChange}
          onBlur={onBlurHandler}
        ></textarea>
      </div>
    </div>
  );
};
