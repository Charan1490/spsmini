import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div style={styles.container}>
      {/* Navbar */}
      <nav style={styles.navbar}>
        <div style={styles.navLeft}>
          <div style={styles.logoPlaceholder}>LOGO</div>
          <Link to="/" style={styles.navLink}>Home</Link>
          <Link to="/about" style={styles.navLink}>About Us</Link>
          <Link to="/contact" style={styles.navLink}>Contact Us</Link>
        </div>
        <div style={styles.navRight}>
          <button onClick={toggleSidebar} style={styles.dashboardButton}>Dashboard</button>
          <Link to="/profile" style={styles.profileContainer}>
            <div style={styles.profilePlaceholder}>BH</div>
          </Link>
        </div>
      </nav>

      {/* Sidebar */}
      {isSidebarOpen && (
        <div style={styles.sidebar}>
          <Link to="/parking" style={styles.sidebarButton}>Parking</Link>
          <Link to="/reservation" style={styles.sidebarButton}>Reservation</Link>
          <Link to="/payment" style={styles.sidebarButton}>Payment</Link>
        </div>
      )}

      {/* Homepage Body */}
      <div style={styles.body}>
        <h2 style={styles.title}>Welcome to SmartParkX</h2>
        <p style={styles.description}>
          Find and reserve parking spots with ease. Manage your reservations and payments seamlessly.
        </p>

        {/* Dashboard Section */}
        <div style={styles.dashboardSection}>
          <Link to="/parking" style={styles.cardLink}>
            <div style={styles.dashboardCard}>
              <h3 style={styles.cardTitle}>Parking</h3>
              <p style={styles.cardDescription}>View available parking spots and manage your parking sessions.</p>
            </div>
          </Link>
          <Link to="/reservation" style={styles.cardLink}>
            <div style={styles.dashboardCard}>
              <h3 style={styles.cardTitle}>Reservation</h3>
              <p style={styles.cardDescription}>Reserve parking spots in advance for hassle-free parking.</p>
            </div>
          </Link>
          <Link to="/payment" style={styles.cardLink}>
            <div style={styles.dashboardCard}>
              <h3 style={styles.cardTitle}>Payment</h3>
              <p style={styles.cardDescription}>Easily pay for your parking sessions and manage transactions.</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

// Styles
const styles = {
  container: {
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#121212',
    color: '#fff',
    minHeight: '100vh',
  },
  navbar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '15px 50px',
    backgroundColor: '#1f1f1f',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.2)',
  },
  navLeft: {
    display: 'flex',
    alignItems: 'center',
  },
  logoPlaceholder: {
    width: '40px',
    height: '40px',
    backgroundColor: '#444',
    borderRadius: '50%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: '#fff',
    fontWeight: 'bold',
    fontSize: '14px',
    marginRight: '20px',
  },
  navLink: {
    color: '#fff',
    textDecoration: 'none',
    fontSize: '18px',
    marginRight: '15px',
    padding: '8px 16px',
    borderRadius: '5px',
    transition: 'background-color 0.3s',
  },
  navRight: {
    display: 'flex',
    alignItems: 'center',
  },
  dashboardButton: {
    color: '#fff',
    backgroundColor: '#004080',
    border: 'none',
    borderRadius: '5px',
    padding: '8px 16px',
    fontSize: '18px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
    marginRight: '10px',
  },
  profileContainer: {
    textDecoration: 'none',
  },
  profilePlaceholder: {
    width: '40px',
    height: '40px',
    backgroundColor: '#ff5722',
    borderRadius: '50%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: '#fff',
    fontWeight: 'bold',
    fontSize: '14px',
  },
  sidebar: {
    width: '250px',
    backgroundColor: '#1f1f1f',
    color: '#fff',
    padding: '20px',
    position: 'fixed',
    top: '0',
    left: '0',
    height: '100%',
    boxShadow: '2px 0 10px rgba(0, 0, 0, 0.2)',
    zIndex: 1000,
  },
  sidebarButton: {
    display: 'block',
    width: '100%',
    padding: '12px 20px',
    margin: '10px 0',
    backgroundColor: '#333',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    fontSize: '16px',
    fontWeight: 'bold',
    cursor: 'pointer',
    textAlign: 'left',
    transition: 'background-color 0.3s',
    textDecoration: 'none',
  },
  body: {
    padding: '50px 320px',
    backgroundColor: '#121212',
    minHeight: 'calc(100vh - 60px)',
  },
  title: {
    color: '#fff',
    fontSize: '32px',
    fontWeight: 'bold',
    marginBottom: '20px',
  },
  description: {
    fontSize: '18px',
    lineHeight: '1.6',
    color: '#ccc',
  },
  dashboardSection: {
    display: 'flex',
    justifyContent: 'space-around',
    marginTop: '30px',
  },
  dashboardCard: {
    backgroundColor: '#1f1f1f',
    color: '#fff',
    padding: '20px',
    borderRadius: '10px',
    width: '100%',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
    textAlign: 'center',
    transition: 'transform 0.3s, box-shadow 0.3s',
  },
  cardLink: {
    textDecoration: 'none',
    width: '30%',
  },
  cardTitle: {
    fontSize: '22px',
    fontWeight: 'bold',
    marginBottom: '10px',
  },
  cardDescription: {
    fontSize: '16px',
    color: '#ccc',
  },
};

export default Home;