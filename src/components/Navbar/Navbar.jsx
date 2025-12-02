import "./Navbar.css"

function NavBar() {
  return (
    <div className="nav">
        <div className="nav__container max-width-1920">
            <div className="nav__logo-container">
                <img className="nav__logo" src="" alt="Logo" />
            </div>    
            <ul className="nav__list">
                <div className="nav__items-container">
                    <li className="nav__item">
                        <a className="nav__link" href="/flavors">Sabores</a>
                    </li>
                    <li className="nav__item">
                        <a className="nav__link" href="/locations">Visítanos</a>
                    </li>
                </div>
                <li className="nav__item">
                    <a className="nav__link" href="">Insta</a>
                </li>                                    
            </ul>
        </div>
    </div>
  )
}

export default NavBar
