import { ChangeEvent, useContext, useState } from 'react';
import { graphSlice } from '../../redux/GraphQLSlice';
import { useAppDispatch, useAppSelector } from '../../redux/reduxHooks';
import { Button } from '@mui/material';
import { prettifyRequestQuery } from '../../utils/prettify';
import { LanguageContext } from '../../localization/LangContextProvider';
import { Localization } from '../../localization/Localization';

export const RequestSection = () => {
  const { language } = useContext(LanguageContext);
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
    setRequestQuery(prettifyRequestQuery(requestQuery));
  };

  return (
    <div className="editor request-section">
      <div className="request">
        <div className="request-response-title">
          {Localization[language].request}
        </div>
        <textarea
          className="request-area"
          value={requestQuery}
          onChange={handlerChange}
          onBlur={onBlurHandler}
        ></textarea>
      </div>
      <div className="prettify-button">
        <Button variant="contained" size="small" onClick={prettify}>
          {Localization[language].prettify}
        </Button>
      </div>
    </div>
  );
};
