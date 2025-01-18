import React, { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faLinkedin, faInstagram } from '@fortawesome/free-brands-svg-icons';
import './App.css'; 
import logo from '../assests/Logo.png'
import anil from '../assests/anil.png'
import work from '../assests/workimage1.jpg'
import workwallet from '../assests/workwallet.png'
import worker from '../assests/worker.jpg'
import workprovider from '../assests/workprovider.jpg'
import Blog from '../Components/blog'
import Plan from '../Components/plan'
import Login from '../Components/login'
import AI from '../Components/AI'
import CreateContract from '../Components/createcontract'
import {  Routes, Route, Link } from 'react-router-dom';
import {useLocation} from 'react-router-dom';
import Home from '../Components/home';
import InvitationPage  from '../Components/contractinvitation';
import ContractDetails from '../Components/contractdetails';
import ContractList from '../Components/contractlist'
import ContractCreatedList from '../Components/contractcreatedlist'
import ContractReceivedList from '../Components/contractreceivedlist'




const MainContent = () => {
  
  const shouldScrollToTopRef = useRef(true);
  const location = useLocation(); 

  useEffect(() => {
    if (shouldScrollToTopRef.current) { 
      window.scrollTo(0, 0); 
      shouldScrollToTopRef.current = false; // Reset for subsequent renders
    }
  }, [location.pathname]);
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
        <Link to="/login" className="login-button">Login</Link>
        </div>
        
        <div className="menu-toggle" onClick={toggleMenu}>☰</div>
    </nav>

    <section className="hero" id="about">
        <div className="hero-content">
        <h1>Don't you think you need an app for your work payments?</h1>
        <h3>If you are an emplyee working in an organization or a company and don't give any work for others, sorry..get off from here. This is purely for unorganized work provider or work seeker.</h3>
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
        <h2>Introducing Work_Wallet</h2>
        <ul id='lists'>
            <h3>Your Digital Pocket for Effortless Work Payments</h3>
            <h3>Create work contracts, add workers and settle the payments</h3>
            <h3>We are working on channelizing the work payment for future India.</h3>
        </ul>
        </div>
        <div className="intro-image">
            <img 
              src={work} 
              alt="Team collaboration" 
              style={{
                width: '500px',
                height: '400px',
                objectFit: 'cover'
              }}
            />
          </div>
    </section>
    <section className="intro" id="vision">
        <div className="intro-content">
        <h2>Why work provider should use Work_Wallet?</h2>
        <ul id='lists'>
            <h3>To digitize your work providing capability, manage your workers, Analytics on your work payments</h3>
        </ul>
        </div>
        <div className="intro-image">
          <img 
            src={workprovider} 
            alt="Team collaboration" 
            style={{
              width: '500px',
              height: '400px',
              objectFit: 'cover'
            }}
          />
        </div>
    </section>
    <section className="intro" id="vision">
        <div className="intro-content">
        <h2>Why work seeker should use Work_Wallet?</h2>
        <ul id='lists'>
           
            <h3>To digitize your work nature, manage your work contracts, Analytics on your work payments </h3>
           
        </ul>
        </div>
        <div className="intro-image">
          <img 
            src={worker} 
            alt="Team collaboration" 
            style={{
              width: '500px',
              height: '400px',
              objectFit: 'cover'
            }}
          />
        </div>
    </section>

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
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/AI" element={<AI />} />
          <Route path="/createcontract" element={<CreateContract />} />
          <Route path="/contract-invitation" element={<InvitationPage/>}/>
          <Route path="/contract-details" element={<ContractDetails/>}/>
          <Route path="/Contract-list" element={<ContractList/>}/>
          <Route path="/contractcreated-list" element={<ContractCreatedList/>}/>
          <Route path="/contractreceiced-list" element={<ContractReceivedList/>}/>
        </Routes>
      
    );
  };
  
  export default App;

