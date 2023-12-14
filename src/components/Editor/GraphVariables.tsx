import {
  Accordion,
  AccordionSummary,
  Typography,
  AccordionDetails,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useState, useContext } from 'react';
import { graphSlice } from '../../redux/GraphQLSlice';
import { useAppDispatch, useAppSelector } from '../../redux/reduxHooks';
import { LanguageContext } from '../../localization/LangContextProvider';
import { Localization } from '../../localization/Localization';
import CodeMirror from '@uiw/react-codemirror';
import { graphql } from 'cm6-graphql';

export const GraphVariables = () => {
  const { language } = useContext(LanguageContext);
  const { setVariables } = graphSlice.actions;
  const dispatch = useAppDispatch();
  const { variables } = useAppSelector((state) => state.graphReducer);

  const [variablesValue, setVariablesValue] = useState('');

  const onBlurHandler = () => {
    if (variables !== variablesValue) {
      dispatch(setVariables(variablesValue));
    }
  };

  return (
    <div className="variables">
      <div>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography>{Localization[language].variables}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <CodeMirror
              className="variables-text"
              value={variablesValue}
              extensions={[graphql()]}
              onChange={(value) => {
                setVariablesValue(value);
                console.log(value);
              }}
              onBlur={onBlurHandler}
            />
          </AccordionDetails>
        </Accordion>
      </div>
    </div>
  );
};
