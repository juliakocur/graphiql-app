import { Button } from '@mui/material';
import { Prettify } from './Prettify';
import { GraphHeaders } from './GraphHeaders';
import { GraphVariables } from './GraphVariables';
import { RequestSection } from './RequestSection';
import { ResponseSection } from './ResponseSection';
import { useAppSelector } from '../../redux/reduxHooks';
import { UrlInput } from './UrlInput';
import { sendRequest } from '../../utils/graphqlRequests';

export const GraphSection = () => {
  const data = useAppSelector((state) => state.graphReducer);

  const clickHandler = () => {
    console.log(data);
    sendRequest(data.url, data.query, {}, JSON.parse(data.variables)).then(
      (data) => console.log(data)
    );
  };
  return (
    <>
      <div className="url-input">
        <Prettify />
        <UrlInput />
      </div>
      <div className="graph-container">
        <RequestSection />
        <div className="submit-button">
          <Button
            variant="contained"
            size="small"
            type="submit"
            onClick={clickHandler}
          >
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
