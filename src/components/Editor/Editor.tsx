import './Editor.css';
import { Documentation } from './Documentation';
import { GraphSection } from './GraphSection';
import ErrorAlert from '../Errors/ErrorAlert';

const Editor = () => {
  return (
    <section className="graph">
      <div className="documentation">
        <Documentation />
      </div>
      <div className="graph-section">
        <GraphSection></GraphSection>
      </div>
      <ErrorAlert />
    </section>
  );
};

export default Editor;
