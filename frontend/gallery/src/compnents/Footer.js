import React from 'react';
import "./styles/footer.css"
import "bootstrap/dist/css/bootstrap.css"
const Footer = () => {
  return <footer>
      <hr className='footer-separator'/>
      <section className='footer-social-media'>
        <a href = "#">Social</a>
      </section>
      <section className='footer-info'>
        <section className='footer-info-left'>
          Returns Policy
        </section>
        <section className='footer-info-center'>
          email
        </section>
        <section className='footer-info-right'>
          Contact info
        </section>
      </section>
      <hr className='footer-separator'/>
    </footer>

};

export default Footer;
