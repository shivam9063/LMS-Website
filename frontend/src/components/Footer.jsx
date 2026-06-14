import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/Edu.png";
import { 
  FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaYoutube, 
  FaEnvelope, FaPhone, FaMapMarkerAlt, FaArrowUp, FaHeart,
  FaGraduationCap, FaUsers, FaCertificate, FaRocket, FaPaperPlane
} from "react-icons/fa";
import { HiSparkles, HiLightBulb } from "react-icons/hi";
import { MdEmail } from "react-icons/md";
import { BsLightningFill } from "react-icons/bs";

const Footer = () => {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [showBackToTop, setShowBackToTop] = useState(false);
  const footerRef = useRef(null);

  // Intersection Observer for animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (footerRef.current) {
      observer.observe(footerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Back to top button visibility
  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    // Handle newsletter subscription
    console.log("Newsletter subscription:", email);
    setEmail("");
    // Add success notification here
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const socialLinks = [
    { icon: FaFacebook, url: "https://www.facebook.com/shivam.pathak.388277/", label: "Facebook", color: "hover:text-blue-500" },
    { icon: FaTwitter, url: "https://x.com/ShivamPath93725", label: "Twitter", color: "hover:text-blue-400" },
    { icon: FaInstagram, url: "https://www.instagram.com/shivampathak8106/", label: "Instagram", color: "hover:text-pink-500" },
    { icon: FaLinkedin, url: "https://www.linkedin.com/in/shivam9076/", label: "LinkedIn", color: "hover:text-blue-600" },
    { icon: FaYoutube, url: "https://youtube.com/@edulearn", label: "YouTube", color: "hover:text-red-500" }
  ];

  return (
    <footer ref={footerRef} className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-black text-gray-300 overflow-hidden">
      
      {/* Background Decorations */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-pulse delay-700"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-cyan-500/5 to-blue-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-16">
        
        {/* Main Footer Content */}
        <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <img 
                src={logo} 
                alt="Logo" 
                className="h-12 w-12 rounded-xl shadow-lg border-2 border-gray-700 hover:border-blue-500 transition-colors duration-300" 
              />
              <div>
                <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                  EduLearn
                </h2>
                <p className="text-sm text-gray-400">Learning Management System</p>
              </div>
            </div>
            
            <p className="text-gray-400 leading-relaxed mb-6 max-w-md">
              Transform your future with our AI-powered learning platform. Master new skills, 
              advance your career, and join thousands of successful learners worldwide.
            </p>

            {/* Newsletter Signup */}
            <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-700">
              <h4 className="text-white font-semibold mb-3 flex items-center gap-2">
                <MdEmail className="text-blue-400" />
                Stay Updated
              </h4>
              <form onSubmit={handleNewsletterSubmit} className="flex gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300"
                  required
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg cursor-pointer"
                >
                  <FaPaperPlane className="w-4 h-4" />
                </button>
              </form>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-bold text-lg mb-6 flex items-center gap-2">
              <FaRocket className="text-blue-400" />
              Quick Links
            </h3>
            <ul className="space-y-3 cursor-pointer">
              {[
                { name: "Home", path: "/" },
                { name: "All Courses", path: "/allcourses" },
                { name: "Login", path: "/login" },
                { name: "My Profile", path: "/profile" }
              ].map((link, index) => (
                <li key={index}>
                  <button
                    onClick={() => navigate(link.path)}
                    className="text-gray-400 hover:text-white hover:translate-x-2 transition-all duration-300 flex items-center gap-2 group cursor-pointer"
                  >
                    <span className="w-1 h-1 bg-blue-400 rounded-full group-hover:w-2 transition-all duration-300"></span>
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-white font-bold text-lg mb-6 flex items-center gap-2">
              <HiLightBulb className="text-yellow-400" />
              Categories
            </h3>
            <ul className="space-y-3">
              {[
                "Web Development",
                "AI/ML",
                "Data Science",
                "UI/UX Design",
                "Mobile Development",
                "Cybersecurity"
              ].map((category, index) => (
                <li key={index}>
                  <span className="text-gray-400 hover:text-white cursor-pointer hover:translate-x-2 transition-all duration-300 flex items-center gap-2 group">
                    <span className="w-1 h-1 bg-purple-400 rounded-full group-hover:w-2 transition-all duration-300"></span>
                    {category}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Stats Section */}
        <div className={`grid grid-cols-2 md:grid-cols-4 gap-6 mb-12 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {[
            { icon: FaUsers, value: "10K+", label: "Students", color: "text-blue-400" },
            { icon: FaGraduationCap, value: "150+", label: "Courses", color: "text-green-400" },
            { icon: FaCertificate, value: "50+", label: "Instructors", color: "text-purple-400" },
            { icon: HiSparkles, value: "4.9", label: "Rating", color: "text-yellow-400" }
          ].map((stat, index) => (
            <div key={index} className="text-center group">
              <div className={`w-16 h-16 mx-auto mb-3 bg-gray-800 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 cursor-pointer ${stat.color}`}>
                <stat.icon className="w-8 h-8" />
              </div>
              <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
              <div className="text-gray-400 text-sm">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Social Links & Contact */}
        <div className={`flex flex-col md:flex-row justify-between items-center gap-6 py-8 border-t border-gray-700 transition-all duration-1000 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          
          {/* Social Media */}
          <div className="flex items-center gap-4">
            <span className="text-gray-400 mr-2">Follow us:</span>
            {socialLinks.map((social, index) => (
              <a
                key={index}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center text-gray-400 ${social.color} transition-all duration-300 transform hover:scale-110 hover:rotate-12`}
                aria-label={social.label}
              >
                <social.icon className="w-5 h-5" />
              </a>
            ))}
          </div>

          {/* Contact Info */}
          <div className="flex items-center gap-6 text-sm text-gray-400">
            <div className="flex items-center gap-2">
              <FaEnvelope className="text-blue-400" />
              <span>shivam9076@gmail.com</span>
            </div>
            <div className="flex items-center gap-2">
              <FaPhone className="text-green-400" />
              <span>+91 9076985876</span>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="text-center py-6 border-t border-gray-700">
          <p className="text-gray-500 flex items-center justify-center gap-2">
            © {new Date().getFullYear()} EduLearn. Made with 
            <FaHeart className="text-red-500 animate-pulse" /> 
            for learners worldwide. All rights reserved.
          </p>
        </div>
      </div>

      {/* Back to Top Button */}
      {showBackToTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-300 z-50 cursor-pointer"
        >
          <FaArrowUp className="w-5 h-5" />
        </button>
      )}

      {/* Floating Elements */}
      <div className="absolute top-8 right-8 opacity-30">
        <BsLightningFill className="w-8 h-8 text-yellow-400 animate-bounce" />
      </div>
    </footer>
  );
};

export default Footer;
