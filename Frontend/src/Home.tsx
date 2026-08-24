import { useNavigate } from "react-router-dom";

function Home() {
  const nav=useNavigate();
  return (
    <div className="min-vh-100 bg-dark text-white">

      {/* Navbar */}
      <nav className="navbar navbar-expand-lg py-4">
        <div className="container">

          {/* Logo */}
          <a
            className="navbar-brand d-flex align-items-center gap-2 text-white fw-bold"
            href="#"
          >
            <span className="fs-3 text-primary">◈</span>

            <span className="fs-4">
              Intervexa
            </span>
          </a>

          {/* Login */}
          <button className="btn btn-outline-light px-4" onClick={()=>nav('/login')}>
            Login
          </button>

        </div>
      </nav>


      {/* Hero Section */}
      <section className="container p-4">

        <div className="row justify-content-center align-items-center min-vh-75">

          <div className="col-12 col-md-10 col-lg-8 text-center">

            {/* Badge */}
            <div className="d-inline-block border border-secondary rounded-pill px-3 py-2 mb-4">
              <span className="text-secondary">
                AI-Powered Interview Platform
              </span>
            </div>


            {/* Heading */}
            <h1 className="display-1 fw-bold mb-4">

              Practice Interviews

              <br />

              <span className="text-primary">
                with AI
              </span>

            </h1>


            {/* Description */}
            <p className="lead text-secondary mx-auto mb-5">
              Experience realistic technical interviews,
              adaptive questions, instant feedback, and
              personalized insights powered by AI.
            </p>


            {/* Buttons */}
            <div className="d-flex justify-content-center gap-3">

              <button className="btn btn-primary btn-lg px-4" onClick={()=>nav('/setup')}>
                Start Interview
              </button>

              <button className="btn btn-outline-light btn-lg px-4">
                Explore Features
              </button>

            </div>


          
          </div>

        </div>

      </section>

    </div>
  );
}

export default Home;