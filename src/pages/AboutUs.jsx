import React from 'react';

const AboutUs = () => {
  // Inline styles for full-screen layout
  const containerStyle = {
    width: '100vw',
    height: '100vh',
    padding: '40px',
    backgroundColor: '#f9f9f9',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    boxSizing: 'border-box',
  };

  const contentStyle = {
    width: '90%',
    maxWidth: '1200px',
    backgroundColor: '#ffffff',
    padding: '30px',
    borderRadius: '12px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    overflowY: 'auto',
    height: 'calc(100vh - 80px)',
  };

  const headingStyle = {
    color: '#333',
    marginBottom: '20px',
    textAlign: 'center',
  };

  const paragraphStyle = {
    fontSize: '18px',
    lineHeight: '1.8',
    color: '#555',
    marginBottom: '20px',
    textAlign: 'justify',
  };

  const listStyle = {
    listStyle: 'none',
    padding: '0',
    marginBottom: '20px',
  };

  const listItemStyle = {
    background: 'url(https://cdn-icons-png.flaticon.com/512/847/847969.png) no-repeat left center',
    paddingLeft: '40px',
    marginBottom: '10px',
    fontSize: '18px',
    color: '#555',
  };

  const linkStyle = {
    color: '#007bff',
    textDecoration: 'none',
  };

  return (
    <div style={containerStyle}>
      <div style={contentStyle}>
        <h1 style={headingStyle}>Welcome to SmartParkX</h1>
        <p style={paragraphStyle}>
          At <strong>SmartParkX</strong>, we are revolutionizing the way you park your vehicles by providing a
          cutting-edge smart parking system that makes parking seamless, efficient, and stress-free.
        </p>

        <h2 style={headingStyle}>Our Vision</h2>
        <p style={paragraphStyle}>
          We envision a world where parking is no longer a hassle. With SmartParkX, drivers can find available parking
          spots in real-time, reduce traffic congestion, and contribute to a greener, smarter city.
        </p>

        <h2 style={headingStyle}>Our Mission</h2>
        <p style={paragraphStyle}>
          Our mission is to improve urban mobility by delivering innovative parking solutions that enhance convenience,
          save time, and reduce the environmental impact of driving.
        </p>

        <h2 style={headingStyle}>Why Choose SmartParkX?</h2>
        <ul style={listStyle}>
          <li style={listItemStyle}>
            🚗 <strong>Real-Time Availability:</strong> Get real-time updates on available parking spots near you.
          </li>
          <li style={listItemStyle}>
            📱 <strong>User-Friendly App:</strong> Easily locate, reserve, and pay for parking through our mobile app.
          </li>
          <li style={listItemStyle}>
            🌱 <strong>Eco-Friendly:</strong> Reduce your carbon footprint by minimizing time spent looking for parking.
          </li>
          <li style={listItemStyle}>
            💳 <strong>Cashless Payments:</strong> Enjoy hassle-free, secure digital payments.
          </li>
          <li style={listItemStyle}>
            📊 <strong>Data Insights:</strong> Our system provides valuable insights for parking management and city planning.
          </li>
        </ul>

        <h2 style={headingStyle}>Meet the Team</h2>
        <p style={paragraphStyle}>
          Our team is made up of passionate innovators, technologists, and urban mobility experts. We are driven by a
          shared vision to transform parking and improve the way people navigate their cities.
        </p>

        <h2 style={headingStyle}>Contact Us</h2>
        <p style={paragraphStyle}>
          Got questions? We’d love to hear from you! Reach out to us at{' '}
          <a href="mailto:contact@smartparkx.com" style={linkStyle}>
            contact@smartparkx.com
          </a>{' '}
          or follow us on social media for the latest updates.
        </p>
      </div>
    </div>
  );
};

export default AboutUs;
