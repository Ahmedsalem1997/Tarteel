import { Link } from "react-router-dom";
import Translate from "../../helpers/Translate/Translate";
const Footer = () => {
    const logo = require('../../assets/images/tarteel-logo.webp');
    return (
        <footer className="footer">
            <div className="footer-start">
                <div className="footer-start-links">
                    {/* <div className="footer-start-links-col">
                        <p className="footer-start-links-col-header"><Translate id="footer.company" /></p>
                        <ul>
                            <li><Link to='/'><Translate id="footer.aboutUs" /></Link></li>
                            <li><Link to='/'><Translate id="footer.helpCenter" /></Link></li>
                            <li><Link to='/'><Translate id="footer.privatePolicy" /></Link></li>
                            <li><Link to='/'><Translate id="footer.bePartner" /></Link></li>
                        </ul>
                    </div> */}
                    <div className="footer-start-links-col">
                        <p className="footer-start-links-col-header"><Translate id="footer.quickLink" /></p>
                        <ul>
                            <li><Link to='/'><Translate id="footer.aboutUs" /></Link></li>
                            <li><Link to='/'><Translate id="footer.helpCenter" /></Link></li>
                            <li><Link to='/'><Translate id="footer.privatePolicy" /></Link></li>
                            {/* <li><Link to='/'><Translate id="footer.bePartner" /></Link></li> */}
                        </ul>
                    </div>
                    <div className="footer-start-links-col">
                        <p className="footer-start-links-col-header"><Translate id="footer.stayConnected" /></p>
                        <ul>
                            <li>tartel@mail.com</li>
                            <li>Riyadh 2231</li>
                        </ul>
                    </div>
                </div>
                {/* <div className="footer-start-support">
                    <p><Translate id="footer.supportedBy" /></p>
                    <div className="footer-start-support-logos">
                        <i className="fa-brands fa-spotify"></i>
                        <i className="fa-brands fa-apple"></i>
                        <i className="fa-brands fa-itunes"></i>
                    </div>
                </div> */}
            </div>
            <div className="footer-end">
                <div className="footer-end-logo">
                    <img src={logo} alt="logo" />
                </div>
                {/* <div className="footer-end-social">
                    <div className="footer-end-social-logos">
                        <i className="fa-brands fa-facebook-f"></i>
                        <i className="fa-brands fa-twitter"></i>
                        <i className="fa-brands fa-youtube"></i>
                    </div>
                    <p>Copyright 2022 By Tartel</p>
                </div> */}
            </div>

        </footer>
    )
}

export default Footer;