import Navbar from "react-bootstrap/Navbar";
import Logo from '../images/logo/logo.svg';
import logoutImg from '../images/buttons/logout.svg';
import Button from "react-bootstrap/Button";

function TopNav() {
    return (
        <Navbar className="topNav w-100">
            <Navbar.Brand href="#home">
                <img src={Logo} width="150px"
                     className="navLogo d-inline-block align-top" alt="Memor.io"/>
            </Navbar.Brand>
            <Button className="logoutButton btn btn-outline-primary d-flex align-items-center">
                <img src={logoutImg} className="logoutIcon" alt="Logout Symbol" title="Ausloggen"/>
                Log out</Button>
        </Navbar>
    )
}

export default TopNav;