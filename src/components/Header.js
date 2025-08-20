import React from 'react';

const Header = () => {
  return (
    <header style={styles.header}>
      <div style={styles.logo}>
        <h1>Fenix React</h1>
      </div>
      <nav style={styles.nav}>
        <a href="/" style={styles.link}>Главная</a>
        <a href="/about" style={styles.link}>О нас</a>
        <a href="/contact" style={styles.link}>Контакты</a>
      </nav>
    </header>
  );
};

const styles = {
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '20px',
    backgroundColor: '#282c34',
    color: 'white',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  },
  logo: {
    fontSize: '24px',
    fontWeight: 'bold',
  },
  nav: {
    display: 'flex',
    gap: '20px',
  },
  link: {
    textDecoration: 'none',
    color: 'white',
    padding: '8px 16px',
    borderRadius: '4px',
    transition: 'background-color 0.3s',
  }
};

export default Header;