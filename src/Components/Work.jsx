import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faLinkedin, faInstagram } from '@fortawesome/free-brands-svg-icons';
import './App.css'; 
import logo from '../assests/Logo.png'
import anil from '../assests/anil.png'
import work from '../assests/workimage1.jpg'
import workwallet from '../assests/workwallet.png'
import Blog from '../Components/blog'
import Plan from '../Components/plan'
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from 'react-router-dom';



const MainContent = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
const [menuActive, setMenuActive] = useState(false);

const toggleMenu = () => {
    setMenuActive(!menuActive);
};

const handleSmoothScroll = (e, targetId) => {
    e.preventDefault();
    const target = document.getElementById(targetId);
    if (target) {
    target.scrollIntoView({ behavior: 'smooth' });
      setMenuActive(false); // Close mobile menu if open
    }
};


return (
    <div>
    <nav className="navbar">
            <div className="logo">
                <img src={logo} alt='logo'/>
            </div>
        <div className={`nav-links ${menuActive ? 'active' : ''}`}>
        <a href="#vision" onClick={(e) => handleSmoothScroll(e, 'vision')}>Vision</a>
        <a href="#contact" onClick={(e) => handleSmoothScroll(e, 'contact')}>Contact us</a>
        <a href="#team" onClick={(e) => handleSmoothScroll(e, 'team')}>Team</a>
        <a href="#blog" onClick={(e) => handleSmoothScroll(e, 'blog')}>Blogs</a>
        </div>
        <div className="social-icons">
        <a href="#"><FontAwesomeIcon icon={faFacebook} /></a>
        <a href="#"><FontAwesomeIcon icon={faTwitter} /></a>
        </div>
        <div className="menu-toggle" onClick={toggleMenu}>☰</div>
    </nav>

    <section className="hero" id="about">
        <div className="hero-content">
        <h1>Don't you think you need an app for your work payments?</h1>
        <p>If you are an emplyee working in an organization or a company and don't give any work for others, sorry..f**k off from here. This is purely for unorganized work provider or work seeker.</p>
        <a href="https://play.google.com/store/games?hl=en&pli=1">
            <img src="https://play.google.com/intl/en_us/badges/images/generic/en_badge_web_generic.png" 
                alt="Get it on Google Play" height="60" />
        </a>
        </div>
        <div className="hero-image">
                <img className='image' src={workwallet} alt='workwallet'/>
        </div>
    </section>
    <section className="intro" id="vision">
        <div className="intro-content">
        <h2>Introducing Work Wallet</h2>
        <ul id='lists'>
            <h3>Your Digital Pocket for Effortless Work Payments</h3>
            <h3>Create work contracts, add workers and settle the payments</h3>
            <h3>For Worker: Organize your work, manage your income, and achieve financial stability with AI Assistance. </h3>
            <h3>For Work Provider: Organize your work, manage your work expenditure</h3>
            <h3>We are working on channelize the work payment for future India.</h3>
        </ul>
        </div>
        <div className="intro-image">
        <img src={work} alt="Team collaboration" />
        </div>
    </section>

    <section className="team" id="team">
        <div className="container">
        <h2>Our Team</h2>
        <div className="team-grid">
            <div className="team-member">
            <img src={anil} alt="Team Member" />
            <h3>Anilkumara Goud</h3>
            <p>CEO & Founder</p>
            </div>
        </div>
        </div>
    </section>

    <section className="contact" id="contact">
        <div className="container">
        <h2>Contact Us</h2>
        <div className="contact-grid">
            <div className="contact-info">
            <h3>Get in Touch</h3>
            <p>Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.</p>
            <div className="contact-details">
                <p>Email: iamanilgoud@gmail.com</p>
                <p>Phone: +91 7032586708</p>
                <p>Address: Hyderabad, Telangana - (India)</p>
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

    <Routes>
        <Route path="/" element={
          <>
            {/* Your existing sections */}
            <section className="blogs" id="blog">
              <div className="container">
                <h2>Blogs</h2>
                <div className="blog-grid">
                  <div className="blog-card">
                    <h3>About Unorganised work force in India</h3>
                    <p>Great problem of India</p>
                    <Link to="/blog" className="read-more">Read More →</Link>
                  </div>
                </div>
                <div className="blog-grid">
                  <div className="blog-card">
                    <h3>Our plans for future</h3>
                    
                    <Link to="/plan" className="read-more">Read More →</Link>
                  </div>
                </div>
              </div>
            </section>
            {/* Other sections... */}
          </>
        } />
        <Route path="/blog" element={<Blog />} />
      </Routes>

    <footer>
        <div className="footer-content">
        <div className="footer-section">
            <h3>About Us</h3>
            <p>Work Wallet is your comprehensive solution for managing work and finances in the digital age.</p>
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
            <li>Address: Hyderabad, Telangana-India</li>
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
        </Routes>
      
    );
  };
  
  export default App;

