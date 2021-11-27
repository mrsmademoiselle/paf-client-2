import Navbar from "react-bootstrap/Navbar";
import Logo from '../images/logo.svg'

function TopNavigationBar() {
    return (
        <Navbar bg="light">
            <Navbar.Brand href="#home">
                <img
                    src={Logo}
                    width="150px"
                    className="d-inline-block align-top"
                    alt="Memor.io"
                />
            </Navbar.Brand>
        </Navbar>
    )
}
 
export default TopNavigationBar;