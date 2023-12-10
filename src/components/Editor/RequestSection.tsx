import { ChangeEvent, useState } from 'react';
import { graphSlice } from '../../redux/GraphQLSlice';
import { useAppDispatch, useAppSelector } from '../../redux/reduxHooks';
import { Button } from '@mui/material';

export const RequestSection = () => {
  const { setQuery } = graphSlice.actions;
  const dispatch = useAppDispatch();
  const { query } = useAppSelector((state) => state.graphReducer);

  const [requestQuery, setRequestQuery] = useState(query);

  const handlerChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setRequestQuery(event.target.value);
  };
  const onBlurHandler = () => {
    if (query !== requestQuery) {
      dispatch(setQuery(requestQuery));
    }
  };

  const prettify = () => {
    setRequestQuery(JSON.stringify(JSON.parse(requestQuery), null, 2));
  };

  return (
    <div className="editor request-section">
      <div className="request">
        <div className="request-response-title">Request</div>
        <textarea
          className="request-area"
          value={requestQuery}
          onChange={handlerChange}
          onBlur={onBlurHandler}
        ></textarea>
      </div>
      <div className="prettify-button">
        <Button variant="contained" size="small" onClick={prettify}>
          Prettify
        </Button>
      </div>
    </div>
  );
};
