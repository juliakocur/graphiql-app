import {
  Accordion,
  AccordionSummary,
  Typography,
  AccordionDetails,
  TextField,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

export const GraphVariables = () => {
  return (
    <div className="variables">
      <div>
        <Accordion>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography>Variables</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <TextField fullWidth required type="text">
              Text...
            </TextField>
          </AccordionDetails>
        </Accordion>
      </div>
    </div>
  );
};
