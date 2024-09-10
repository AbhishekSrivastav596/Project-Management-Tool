import React, { useState } from 'react';

const HomePage = () => {
  const [activeSection, setActiveSection] = useState('');

  const scrollToSection = (section) => {
    setActiveSection(section);
    document.getElementById(section).scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="homepage">
      <aside className="sidebar">
        <ul>
          <li onClick={() => scrollToSection('intro')}>Introduction</li>
          <li onClick={() => scrollToSection('features')}>Features</li>
          <li onClick={() => scrollToSection('collaboration')}>Collaboration</li>
          <li onClick={() => scrollToSection('analytics')}>Analytics</li>
          <li onClick={() => scrollToSection('cta')}>Get Started</li>
        </ul>
      </aside>

      <div className="content">
        <header className="hero-section" id="hero">
          <h1 className="hero-title">Welcome to the TaskVerse</h1>
          <h2>This tool will help you to manage your work.</h2>
          <h3 className="hero-h3"> A comprehensive platform designed to help teams collaborate, manage projects, and achieve their goals efficiently.<br/> Whether you're leading a project, working with a team, or tracking individual tasks, <br/> our tool offers everything you need to stay organized and productive.</h3>
          <h1 className="hero-title2">"Organize. Collaborate. Succeed."</h1>
        </header>

        <section className="intro-section" id="intro">
          <h2 className="section-heading">Introduction</h2>
          <p className="intro-text">
            Our tool is designed to simplify your project management process, allowing you to focus on what matters most.
          </p>
          <p className="intro-text">
            Whether you're managing a small team or leading a large organization, our platform offers features that enhance collaboration and productivity.
          </p>

          <p className="intro-text">The Project Management Tool is a web-based platform that enables project managers, team leaders, and members to plan, execute, and monitor tasks in an organized and structured way. With real-time updates, task assignment,  it helps you stay on top of your project’s progress from start to finish.</p>
        </section>

        <section className="features-section" id="features">
          <h2 className="section-heading">Features</h2>
          <p className="features-text">
            Task Management: Organize and track your tasks efficiently with an intuitive interface designed to simplify workflows.
          </p>
          <p className="features-text">
            Time Tracking: Monitor the time spent on each task and manage resources effectively to meet deadlines.
          </p>
        </section>

        <section className="collaboration-section" id="collaboration">
          <h2 className="section-heading">Collaboration</h2>
          <p className="collaboration-text">
            Real-Time Collaboration: Work with your team members in real-time, assign tasks, and communicate efficiently to achieve project goals.
          </p>
        </section>

        <section className="analytics-section" id="analytics">
          <h2 className="section-heading">Analytics & Reporting</h2>
          <p className="analytics-text">
            Gain insights into your project’s progress with comprehensive analytics, including task completion rates, deadlines, and resource allocation.
          </p>
        </section>

        <section className="cta-section" id="cta">
          <h2 className="cta-heading">Start Your Journey Now</h2>
          <p className="cta-text">Join thousands of teams using our tool to manage projects more efficiently. Sign up today!</p>
          {/* <button className="cta-button">Sign Up</button> */}
        </section>
      </div>
    </div>
  );
};

export default HomePage;
