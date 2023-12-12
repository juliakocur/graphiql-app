import {
  Accordion,
  AccordionSummary,
  Typography,
  AccordionDetails,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useState, ChangeEvent, useContext } from 'react';
import { graphSlice } from '../../redux/GraphQLSlice';
import { useAppDispatch, useAppSelector } from '../../redux/reduxHooks';
import { LanguageContext } from '../../localization/LangContextProvider';
import { Localization } from '../../localization/Localization';

export const GraphVariables = () => {
  const { language } = useContext(LanguageContext);
  const { setVariables } = graphSlice.actions;
  const dispatch = useAppDispatch();
  const { variables } = useAppSelector((state) => state.graphReducer);

  const [variablesValue, setVariablesValue] = useState('');

  const handlerChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setVariablesValue(event.target.value);
  };

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
            <textarea
              className="variables-text"
              value={variablesValue}
              onChange={handlerChange}
              onBlur={onBlurHandler}
            />
          </AccordionDetails>
        </Accordion>
      </div>
    </div>
  );
};
