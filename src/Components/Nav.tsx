import { Link, useLocation } from "react-router-dom";
import { useFirebaseAuth } from "../firebase/FirebaseAuth";
import DarkModeSwitch from "./DarkModeSwitch";

const Nav = () => {
  const { user, logout } = useFirebaseAuth();
  const location = useLocation();
  return (
    <nav className="bg-gray-900 w-full left-0 border-b border-gray-200">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <div className="flex md:order-2">
          <DarkModeSwitch />
          {user && (
            <button
              onClick={logout}
              type="button"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center mr-3 md:mr-0"
            >
              Logout
            </button>
          )}
          <button
            data-collapse-toggle="navbar-sticky"
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
            aria-controls="navbar-sticky"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
          </button>
        </div>
        <div
          className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
        >
          <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg md:flex-row md:space-x-8 md:mt-0 md:border-0">
            <li>
              <Link
                to="/"
                className={`block py-2 pl-3 pr-4 text-white rounded md:hover:text-blue-700 md:p-0 ${
                  location.pathname === "/" ? "text-blue-700" : ""
                }`}
                aria-current="page"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/calculations"
                className={`block py-2 pl-3 pr-4 text-white rounded md:hover:text-blue-700 md:p-0 ${
                  location.pathname === "/calculations" ? "text-blue-700" : ""
                }`}
                aria-current="page"
              >
                Everyones calculations
              </Link>
            </li>
            {user && (
              <li>
                <Link
                  to="/calculator"
                  className={`block py-2 pl-3 pr-4 text-white rounded md:hover:text-blue-700 md:p-0 ${
                    location.pathname === "/calculator" ? "text-blue-700" : ""
                  }`}
                >
                  Calculator
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Nav;
