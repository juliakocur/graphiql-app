import './Welcome.css';
import nat from '/nat.jpg';
import ant from '/ant.jpg';
import jul from '/jul.jpg';

const Welcome = () => {
  return (
    <>
      <section className="welcome-container">
        <div className="welcome">
          <h1 className="welcome-header">GraphiQL</h1>
          <p className="welcome-text">
            GraphQL is a query language for your API, and a server-side runtime
            for executing queries using a type system you define for your data.
            GraphQL is not tied to any specific database or storage engine and
            is instead backed by your existing code and data.
          </p>
          <p className="welcome-text">
            As an alternative to REST, GraphQL lets developers construct
            requests that pull data from multiple data sources in a single API
            call. Additionally, GraphQL gives API maintainers the flexibility to
            add or deprecate fields without impacting existing queries.
            Developers can build APIs with whatever methods they prefer, and the
            GraphQL specification will ensure they function in predictable ways
            to clients.
          </p>
          <div className="welcome-cards">
            <div className="card">
              <div className="card-title">Project</div>
              <p className="card-text">
                This application provides access to GraphQL for authorized
                users. We tried to create an easy-to-use open source data
                manipulation product for building web-oriented software
                interfaces.
              </p>
            </div>
            <div className="card">
              <div className="card-title">Course</div>
              <p className="card-text">
                This project was completed as part of the React course from
                RSSchool. The course provides theoretical and practical
                knowledge sufficient to start working on the React framework.
              </p>
            </div>
            <div className="card">
              <div className="card-title">Developers</div>
              <ul className="developers-list">
                <li className="developer">
                  <img src={nat} alt="developer" />
                  Natalia Oreshkova
                </li>
                <li className="developer">
                  <img src={ant} alt="developer" />
                  Anton Belski
                </li>
                <li className="developer">
                  <img src={jul} alt="developer" />
                  Julia Kocur
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
