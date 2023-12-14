import { useContext, useState } from 'react';
import { graphSlice } from '../../redux/GraphQLSlice';
import { useAppDispatch, useAppSelector } from '../../redux/reduxHooks';
import { Button } from '@mui/material';
import { prettifyRequestQuery } from '../../utils/prettify';
import { LanguageContext } from '../../localization/LangContextProvider';
import { Localization } from '../../localization/Localization';
import CodeMirror from '@uiw/react-codemirror';
import { graphql } from 'cm6-graphql';

export const RequestSection = () => {
  const { language } = useContext(LanguageContext);
  const { setQuery } = graphSlice.actions;
  const dispatch = useAppDispatch();
  const { query } = useAppSelector((state) => state.graphReducer);

  const [requestQuery, setRequestQuery] = useState(query);

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
        <CodeMirror
          className="request-area"
          value={requestQuery}
          extensions={[graphql()]}
          onChange={(value) => {
            setRequestQuery(value);
          }}
          onBlur={onBlurHandler}
          editable={true}
          readOnly={false}
          autoFocus={true}
        />
      </div>
      <div className="prettify-button">
        <Button variant="contained" size="small" onClick={prettify}>
          {Localization[language].prettify}
        </Button>
      </div>
    </div>
  );
};
