import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function About() {
  const navigate = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem("auth-token")) {
      navigate("/signIn");
    }
    // eslint-disable-next-line
  });
  return (
    <div className="container">
      <div className="p-5 mb-4 bg-body-tertiary rounded-3">
        <div className="container-fluid py-5">
          <h1 className="display-5 fw-bold">
            iNotebook: Your Cloud-Based Notebook
          </h1>
          <p className="col-md-8 fs-4">
            Experience the power of seamless note-taking with iNotebook. Create,
            organize, and access your notes anytime, anywhere with our
            cloud-based platform. Designed for productivity and collaboration,
            iNotebook ensures that your ideas are always within reach.
          </p>
          <button className="btn btn-primary btn-lg" type="button">
            Get Started
          </button>
        </div>
      </div>
      <div className="row align-items-md-stretch">
        <div className="col-md-6">
          <div className="h-100 p-5 text-bg-dark rounded-3">
            <h2>Customize Your Experience</h2>
            <p>
              Tailor your notebook with various themes and color utilities.
              Whether you prefer a dark mode for late-night writing or a vibrant
              palette to keep you inspired, iNotebook adapts to your style.
            </p>
            <button className="btn btn-outline-light" type="button">
              Learn More
            </button>
          </div>
        </div>
        <div className="col-md-6">
          <div className="h-100 p-5 bg-body-tertiary border rounded-3">
            <h2>Stay Organized</h2>
            <p>
              Keep your notes well-organized with our intuitive tagging and
              folder system. iNotebook makes it easy to categorize and find your
              notes quickly, so you can focus on what matters most.
            </p>
            <button className="btn btn-outline-secondary" type="button">
              Discover Features
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
