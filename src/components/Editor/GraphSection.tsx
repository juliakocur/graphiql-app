import { Button } from '@mui/material';
import { Prettify } from './Prettify';
import { GraphHeaders } from './GraphHeaders';
import { GraphVariables } from './GraphVariables';
import { RequestSection } from './RequestSection';
import { ResponseSection } from './ResponseSection';

export const GraphSection = () => {
  return (
    <>
      <div className="url-input">
        <Prettify />
        <input type="text" className="input-http"></input>
      </div>
      <div className="graph-container">
        <RequestSection />
        <div className="submit-button">
          <Button variant="contained" size="small" type="submit">
            ►
          </Button>
        </div>
        <ResponseSection />
      </div>
      <div className="variables-headers">
        <GraphHeaders />
        <GraphVariables />
      </div>
    </>
  );
};
