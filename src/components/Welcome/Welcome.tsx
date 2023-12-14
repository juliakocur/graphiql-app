import './Welcome.css';
import nat from '/nat.jpg';
import ant from '/ant.jpg';
import jul from '/jul.jpg';
import { useContext } from 'react';
import { LanguageContext } from '../../localization/LangContextProvider';
import { Localization } from '../../localization/Localization';

const Welcome = () => {
  const { language } = useContext(LanguageContext);
  return (
    <>
      <section className="welcome-container">
        <div className="welcome">
          <h1 className="welcome-header">GraphQL</h1>
          <p className="welcome-text">
            {Localization[language]['welcome-text1']}
          </p>
          <p className="welcome-text">
            {Localization[language]['welcome-text2']}
          </p>
          <div className="welcome-cards">
            <div className="card">
              <div className="card-title">
                {Localization[language]['card-project'].title}
              </div>
              <p className="card-text">
                {Localization[language]['card-project'].text}
              </p>
            </div>
            <div className="card">
              <div className="card-title">
                {Localization[language]['card-course'].title}
              </div>
              <p className="card-text">
                {Localization[language]['card-course'].text}
              </p>
            </div>
            <div className="card">
              <div className="card-title">
                {Localization[language]['card-developers'].title}
              </div>
              <ul className="developers-list">
                <li className="developer">
                  <img src={nat} alt="developer" />
                  {Localization[language]['card-developers'].nat}
                </li>
                <li className="developer">
                  <img src={ant} alt="developer" />
                  {Localization[language]['card-developers'].ant}
                </li>
                <li className="developer">
                  <img src={jul} alt="developer" />
                  {Localization[language]['card-developers'].jul}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Welcome;
