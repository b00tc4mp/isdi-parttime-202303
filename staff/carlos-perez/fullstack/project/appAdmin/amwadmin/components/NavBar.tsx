import NavBarMenu from "./NavBarMenu"

const NavBar = () => (
    <header className='w-full'>
        <nav className='max-w-[1440px] mx-auto sm:px-16 px-6 py-4 navbar-bg'>
            <div className="flex justify-between items-center">
                <p className="navbar-text justify-self-center">Alex Maybe</p>
                <NavBarMenu containerStyles="" />
            </div>

        </nav>
    </header>
);

export default NavBar;