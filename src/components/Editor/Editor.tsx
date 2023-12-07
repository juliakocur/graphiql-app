import './Editor.css';
import { Button } from '@mui/material';
import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import folder from '/folder.png';

const Editor = () => {
  return (
    <section className="graph">
      <div className="url-input">
        <div className="prettify-button">
          <Button variant="contained" size="small" type="submit">
            Prettify
          </Button>
        </div>
        <input type="text" className="input-http"></input>
      </div>
      <div className="graph-container">
        <div className="documentation"></div>
        <button className="doc-button">
          <img src={folder} alt="documentation" />
        </button>
        <div className="graph-content">
          <form className="editor">
            <div className="request">
              <div className="request-response-title">Request</div>
              <textarea name="query" className="request-area"></textarea>
            </div>
            <div className="submit-button">
              <Button variant="contained" size="small" type="submit">
                Submit
              </Button>
            </div>
            <div className="response">
              <div className="request-response-title">Response</div>
              <textarea name="query" className="response-area"></textarea>
            </div>
          </form>
        </div>
      </div>
      <div className="varuables-headers">
        <div className="varuables">
          <div>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography>Varuables</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <TextField fullWidth required type="text">
                  Text...
                </TextField>
              </AccordionDetails>
            </Accordion>
          </div>
        </div>
        <div className="headers">
          <div>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography>Headers</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <TextField fullWidth required type="text">
                  Text...
                </TextField>
              </AccordionDetails>
            </Accordion>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Editor;
