import { GraphHeaders } from './GraphHeaders';
import { GraphVariables } from './GraphVariables';
import { UrlInput } from './UrlInput';
import EditorViewer from './EditorViewer';

export const GraphSection = () => {
  return (
    <>
      <div className="url-input">
        <UrlInput />
      </div>
      <EditorViewer />
      <div className="variables-headers">
        <GraphHeaders />
        <GraphVariables />
      </div>
    </>
  );
};
