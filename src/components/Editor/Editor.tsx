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
import { useState } from 'react';

const Editor = () => {
  interface Idata {
    key: string;
    value: string;
  }
  const [data, setData] = useState<Idata[]>([{ key: '', value: '' }]);
  const handleChangeKey = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    index: number
  ) => {
    const newData = [...data];
    newData[index].key = e.target.value;
    setData(newData);
  };
  const handleChangeValue = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    index: number
  ) => {
    const newData = [...data];
    newData[index].value = e.target.value;
    setData(newData);
  };
  const handleClick = () => {
    setData([...data, { key: '', value: '' }]);
  };
  const handleDelete = (item: number) => {
    const newData = [...data];
    newData.splice(item, 1);
    setData(newData);
  };

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
      <div className="variables-headers">
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
        <div className="headers">
          {data.map((item, index) => {
            return (
              <div className="header-item" key={index}>
                <input type="checkbox" />
                <input
                  value={item.key}
                  onChange={(e) => handleChangeKey(e, index)}
                ></input>
                <input
                  value={item.value}
                  onChange={(e) => handleChangeValue(e, index)}
                ></input>
                <div
                  className="delete-button"
                  onClick={() => handleDelete(index)}
                >
                  <Button variant="contained" size="small" type="submit">
                    Delete
                  </Button>
                </div>
              </div>
            );
          })}
          <div className="add-button" onClick={handleClick}>
            <Button variant="contained" size="large" type="submit">
              + Add new Header
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Editor;
