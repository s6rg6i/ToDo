const Navbar = {
    margin: 0,
    padding: "10px",
    width: "400px",
    textAlign: "center",
    backgroundColor: "#6d7f8f"
}

const Navbar_li = {
    display: "inline"
}

const Navbar_a = {
    color: "#fff",
    textDecoration: "none",
    fontWeight: "bold",
    display: "inline-block",
    width: "100px"
}

const Header = () => {
    return (
        <div class="menu">
            <ul style={Navbar}>
                <li style={Navbar_li}><a style={Navbar_a} href="#">Главная</a></li>
                <li style={Navbar_li}><a style={Navbar_a} href="#">ToDo</a></li>
                <li style={Navbar_li}><a style={Navbar_a} href="#">Контакты</a></li>
            </ul>
        </div >
    )
}


export default Header;
