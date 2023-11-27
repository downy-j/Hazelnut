import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <>
      <footer className="footer">
        <div className="footerContainer">
          <div className="footer-row">
            <div className="footer-col">
              <h4>Company</h4>
              <ul>
                <li>
                  <Link to="#">about us</Link>
                </li>
                <li>
                  <Link to="#">our services</Link>
                </li>
                <li>
                  <Link to="#">privacy policy</Link>
                </li>
                <li>
                  <Link to="#">affiliate program</Link>
                </li>
              </ul>
            </div>
            <div className="footer-col">
              <h4>Get help</h4>
              <ul>
                <li>
                  <Link to="#">FAQ</Link>
                </li>
                <li>
                  <Link to="#">shopping</Link>
                </li>
                <li>
                  <Link to="#">returns</Link>
                </li>
                <li>
                  <Link to="#">order status</Link>
                </li>
                <li>
                  <Link to="#">payment option</Link>
                </li>
              </ul>
            </div>
            <div className="footer-col">
              <h4>online shop</h4>
              <ul>
                <li>
                  <Link to="#">watch</Link>
                </li>
                <li>
                  <Link to="#">bag</Link>
                </li>
                <li>
                  <Link to="#">shoes</Link>
                </li>
                <li>
                  <Link to="#">dress</Link>
                </li>
              </ul>
            </div>
            <div className="footer-col">
              <h4>follow us</h4>
              <div className="social-links">
                <Link to="#">
                  <i className="fab fa-facebook"></i>
                </Link>
                <Link to="#">
                  <i className="fab fa-twitter"></i>
                </Link>
                <Link to="#">
                  <i className="fab fa-instagram"></i>
                </Link>
                <Link to="#">
                  <i className="fab fa-linkedin-in"></i>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
