import './Editor.css';
import { Documentation } from './Documentation';
import { GraphSection } from './GraphSection';

const Editor = () => {
  return (
    <section className="graph">
      <div className="documentation">
        <Documentation />
      </div>
      <div className="graph-section">
        <GraphSection></GraphSection>
      </div>
    </section>
  );
};

export default Editor;
