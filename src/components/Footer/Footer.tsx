import './footer.css';
import rs_school from '/rs_school.svg';
import git from '/git.png';

const Footer = () => {
  return (
    <footer>
      <div className="footer-container">
        <div className="rss-logo">
          <a href="https://rs.school/react/">
            <img src={rs_school} alt="rs-school" />
          </a>
        </div>
        <div className="year">2023</div>
        <div className="git-accounts">
          <a href="https://github.com/mracoon">
            <img src={git} alt="git-account" />
          </a>
          <a href="https://github.com/Belski-Anton">
            <img src={git} alt="git-account" />
          </a>
          <a href="https://github.com/juliakocur">
            <img src={git} alt="git-account" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
