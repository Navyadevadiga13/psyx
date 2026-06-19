import React from "react";
import { FaBrain } from "react-icons/fa";
import { FiMail, FiPhone, FiMapPin } from "react-icons/fi";

function Footer() {
  return (
    <footer className="footer-compact" style={{
      background: 'rgba(10, 20, 15, 0.95)',
      borderTop: '1px solid rgba(25, 253, 145, 0.1)',
      padding: '1.5rem 5vw',
      marginTop: 'auto'
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '1.5rem',
        maxWidth: '1400px',
        margin: '0 auto'
      }}>
      

        {/* Middle: Copyright */}
        <div style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.85rem', fontWeight: 500 }}>
          © 2026 <span style={{ color: '#19fd91' }}>WiZdom Ed</span>. All rights reserved.
        </div>

        {/* Right: Contact */}
        <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
          <a href="mailto:hello@psyx.in" style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.85rem', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem', transition: 'color 0.2s' }} onMouseOver={e => e.target.style.color = '#19fd91'} onMouseOut={e => e.target.style.color = 'rgba(255,255,255,0.6)'}>
            <FiMail style={{ color: '#19fd91' }} /> hello@wizx.org
          </a>
          <a href="tel:+91918431220992" style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.85rem', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem', transition: 'color 0.2s' }} onMouseOver={e => e.target.style.color = '#19fd91'} onMouseOut={e => e.target.style.color = 'rgba(255,255,255,0.6)'}>
            <FiPhone style={{ color: '#19fd91' }} /> +91-8169600408
          </a>
          <div style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <FiMapPin style={{ color: '#19fd91' }} /> Wizdom Ed., First Floor, Takshila Building,  <br />Opp Janatha Delux Patthumudi, Ballalbhag,<br /> Mangaluru – 575003
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;