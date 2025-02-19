import React, { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faLinkedin, faInstagram } from '@fortawesome/free-brands-svg-icons';
import './App.css'; 
import logo from '../assests/Logo.png';
import anil from '../assests/anil.png';
import work from '../assests/workimage1.jpg';
import Blog from '../Components/blog';
import Plan from '../Components/plan';
import Login from '../Components/login';
import AI from '../Components/AI';
import CreateContract from '../Components/createcontract';
import { Routes, Route, Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import Home from '../Components/home';
import InvitationPage from '../Components/contractinvitation';
import ContractList from '../Components/contractlist';
import ContractCreatedList from '../Components/contractcreatedlist';
import ContractReceivedList from '../Components/contractreceivedlist';
import Invitation from '../Components/invitation';
import ReceivedContracts from '../Components/recivedcontracts';
import ContractDetail from '../Components/contractdetail';
import WorkFeed from '../Components/workfeed';
import WorkPost from '../Components/workpost';
import Attandence from '../Components/attandanceCalander';
import PaymentAcknowledgment from "./PaymentAcknowledgment";
import UpdateProfile from "./updateProfile";
import Contract from "./contract";
import PaymentHistory from "./paymenthistory";
const MainContent = () => {
  const shouldScrollToTopRef = useRef(true);
  const location = useLocation();
  const [menuActive, setMenuActive] = useState(false);

  useEffect(() => {
    if (shouldScrollToTopRef.current) {
      window.scrollTo(0, 0);
      shouldScrollToTopRef.current = false;
    }
  }, [location.pathname]);

  const toggleMenu = () => {
    setMenuActive(!menuActive);
  };

  const handleSmoothScroll = (e, targetId) => {
    e.preventDefault();
    const target = document.getElementById(targetId);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
      setMenuActive(false);
    }
  };

  return (
    <div>
      {/* Navbar */}
      <nav className="navbar">
        <div className="logo">
          <img src={logo} alt="logo" style={{ width: '100px', height: 'auto' }} /> {/* Adjust width as needed */}
        </div>
        <div className={`nav-links ${menuActive ? 'active' : ''}`}>
          <a href="#vision" onClick={(e) => handleSmoothScroll(e, 'vision')}>Vision</a>
          <a href="#contact" onClick={(e) => handleSmoothScroll(e, 'contact')}>Contact Us</a>
          <a href="#team" onClick={(e) => handleSmoothScroll(e, 'team')}>Team</a>
          <a href="#blog" onClick={(e) => handleSmoothScroll(e, 'blog')}>Blogs</a>
          <Link to="/login" className="login-button">Login</Link>
        </div>
        <div className="menu-toggle" onClick={toggleMenu}>☰</div>
      </nav>

      {/* Hero Section */}
      <section className="hero" id="about">
        <div className="hero-content">
          <h1>Simplify Your Work Payments with Work_Wallet</h1>
          <h3>Designed for unorganized work providers and seekers. Digitize your work by creating contracts, manage contracts and settle payments effortlessly.</h3>
          <a href="https://play.google.com/store/games?hl=en&pli=1" className="cta-button">
            <img src="https://play.google.com/intl/en_us/badges/images/generic/en_badge_web_generic.png" alt="Get it on Google Play" height="60" />
          </a>
          <span className="coming-soon-badge">Coming Soon</span>
        </div>
        <div className="hero-image">
          
        </div>
      </section>

      {/* Vision Section */}
      <section className="intro" id="vision">
        <div className="intro-content">
          <h2>Why Choose Work_Wallet?</h2>
          <ul id="lists">
            <li>Digitize your work payments by creating contracts.</li>
            <li>Manage workers and payments seamlessly.</li>
            <li>Analytics to track your work finances.</li>
          </ul>
        </div>
        <div className="intro-image">
          <img src={work} alt="Team collaboration" />
        </div>
      </section>
      <section className="blogs" id="blog">
        <div className="container">
          <h2>Blogs</h2>
          <div className="blog-grid">
            <div className="blog-card">
              <h3>About Unorganized Workforce in India</h3>
              <p>Explore the challenges faced by the unorganized workforce in India and how Work_Wallet is addressing them.</p>
              <Link to="/blog" className="read-more">Read More →</Link>
            </div>
            
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="team" id="team">
        <div className="container">
          <h2>Our Team</h2>
          <div className="team-grid">
            <div className="team-member">
              <img src={anil} alt="Team Member" />
              <h3>AnilkumarA Goud</h3>
              <p>CEO & Founder</p>
            </div>
          </div>
        </div>
      </section>
      <section className="plan" id="plan">
        <div className="container">
          <h2>Our Plans for the Future</h2>
          <div className="plan-content">
            <p>
              At Work_Wallet, we are committed to revolutionizing the way work payments are managed. Here are some of our future plans:
            </p>
            <ul>
              <li>Expand our platform to support more unorganized work providing industries.</li>
              <li>Integrate our work wallet data with Eshram platform to provide new features .</li>
              <li>Introduce advanced analytics for work providers and seekers using AI models.</li>
              <li>Launch a mobile app for seamless on-the-go access.</li>
              <li>Partner with financial institutions to offer integrated payment solutions.</li>
            </ul>
            <Link to="/plan" className="read-more">Learn More →</Link>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="contact" id="contact">
        <div className="container">
          <h2>Contact Us</h2>
          <div className="contact-grid">
            <div className="contact-info">
              <h3>Get in Touch</h3>
              <p>Have questions? We'd love to hear from you. Send us a message, and we'll respond as soon as possible.</p>
              <div className="contact-details">
                <p>Email: iamanilgoud@gmail.com</p>
                <p>Phone: +91 7032586708</p>
                <p>Address: Hyderabad, Telangana - India</p>
              </div>
            </div>
            <form className="contact-form">
              <input type="text" placeholder="Your Name" required />
              <input type="email" placeholder="Your Email" required />
              <textarea rows="4" placeholder="Your Message" required></textarea>
              <button type="submit">Send Message</button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer>
        <div className="footer-content">
          <div className="footer-section">
            <h3>About Us</h3>
            <p>Work Wallet is your comprehensive solution for managing work payments in the digital age.</p>
          </div>
          <div className="footer-section">
            <h3>Quick Links</h3>
            <ul>
              <li><a href="#vision">Vision</a></li>
              <li><a href="#contact">Contact</a></li>
              <li><a href="#team">Team</a></li>
              <li><a href="#blog">Blog</a></li>
            </ul>
          </div>
          <div className="footer-section">
            <h3>Contact</h3>
            <ul>
              <li>Email: iamanilgoud@gmail.com</li>
              <li>Phone: +91 7032586708</li>
              <li>Address: Hyderabad, Telangana - India</li>
            </ul>
          </div>
          <div className="footer-section">
            <h3>Follow Us</h3>
            <div className="social-icons">
              <a href="#"><FontAwesomeIcon icon={faFacebook} /></a>
              <a href="#"><FontAwesomeIcon icon={faTwitter} /></a>
              <a href="#"><FontAwesomeIcon icon={faLinkedin} /></a>
              <a href="#"><FontAwesomeIcon icon={faInstagram} /></a>
            </div>
          </div>
        </div>
        <div className="copyright">
          <p>&copy; 2024 Work Wallet. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<MainContent />} />
      <Route path="/blog" element={<Blog />} />
      <Route path="/plan" element={<Plan />} />
      <Route path="/login" element={<Login />} />
      <Route path="/home" element={<Home />} />
      <Route path="/AI" element={<AI />} />
      <Route path="/createcontract" element={<CreateContract />} />
      <Route path="/contract-invitation" element={<InvitationPage />} />
      <Route path="/Contract-list" element={<ContractList />} />
      <Route path="/contractcreated-list" element={<ContractCreatedList />} />
      <Route path="/contractreceiced-list" element={<ContractReceivedList />} />
      <Route path="/invitation" element={<Invitation />} />
      <Route path="/receivedcontracts" element={<ReceivedContracts />} />
      <Route path="/contractdetail/:contractId" element={<ContractDetail />} />
      <Route path="/workfeed" element={<WorkFeed />} />
      <Route path="/workpost" element={<WorkPost />} />
      <Route path="/attandence" element={<Attandence />} />
      <Route path="/payment" element={<PaymentAcknowledgment />} />
      <Route path="/updateprofile" element={<UpdateProfile />} />
      <Route path="/contract" element={<Contract />} />
      <Route path="/paymenthistory" element={<PaymentHistory />} />
      
    </Routes>
  );
};

export default App;