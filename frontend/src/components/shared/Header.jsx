import { useLocation } from "react-router-dom";

const Header = () => {
  const location = useLocation();

  console.log(location.pathname);
  return (
    <div
      className={`header bg-primary ${
        location.pathname === "/login" || location.pathname === "/register"
          ? "hidden"
          : ""
      }`}
    >
      <div className="orange-circle"></div>
      <div className="purple-oval"></div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="266"
        height="128"
        viewBox="0 0 266 128"
        fill="none"
        className="red-bean"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M202.62 260.909C291.568 219.458 338.71 50.5169 264.003 9.46884C189.295 -31.5792 179.866 79.2148 105.602 120.858C31.337 162.501 -14.8063 194.455 4.39096 250.208C23.5882 305.961 113.671 302.361 202.62 260.909Z"
          fill="#F9818E"
        />
      </svg>
    </div>
  );
};

export default Header;
