import { useLocation } from "react-router-dom";

const Pattern = () => {
  const location = useLocation();

  return (
    <div className="w-full absolute bottom-0 mx-auto">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="222"
        height="225"
        viewBox="0 0 222 225"
        className="absolute bottom-0 left-0 opacity-60"
        fill="none"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M-34.6921 200.101C3.24693 289.538 168.767 342.017 211.961 269.52C255.155 197.023 145.862 183.867 107.226 108.951C68.5909 34.0349 38.5692 -12.7231 -17.2556 4.34429C-73.0804 21.4116 -72.6312 110.664 -34.6921 200.101Z"
          fill="#6259FF"
        />
      </svg>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="50"
        height="52"
        viewBox="0 0 50 52"
        fill="none"
        className={`z-10 absolute bottom-16 right-14 short:hidden ${
          location.pathname === "/register" && "hidden"
        }`}
      >
        <path
          d="M3.30469 14.097L13.9118 3.29077"
          stroke="white"
          strokeWidth="5"
          strokeLinecap="round"
          strokeLinejoin="bevel"
        />
        <path
          d="M47.4607 19.5808L34.9554 9.07821"
          stroke="white"
          strokeWidth="5"
          strokeLinecap="round"
          strokeLinejoin="bevel"
        />
        <path
          d="M25.5603 33.9912L18.6522 48.7887"
          stroke="white"
          strokeWidth="5"
          strokeLinecap="round"
          strokeLinejoin="bevel"
        />
      </svg>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="180"
        height="145"
        viewBox="0 0 180 145"
        fill="none"
        className="absolute bottom-0 right-0"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M139.095 178.153C199.774 149.875 231.934 34.6269 180.97 6.62458C130.005 -21.3777 123.573 54.2041 72.9113 82.6122C22.2491 111.02 -9.229 132.819 3.86703 170.853C16.9631 208.887 78.4163 206.431 139.095 178.153Z"
          fill="#F9818E"
        />
      </svg>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="68"
        height="135"
        viewBox="0 0 68 135"
        fill="none"
        className="absolute bottom-4 left-0"
      >
        <path
          d="M0.304688 134.891C37.3078 134.891 67.3047 104.894 67.3047 67.8906C67.3047 30.8876 37.3078 0.890625 0.304688 0.890625C-36.6984 0.890625 -66.6953 30.8876 -66.6953 67.8906C-66.6953 104.894 -36.6984 134.891 0.304688 134.891Z"
          fill="#FFAF7E"
        />
      </svg>
    </div>
  );
};

export default Pattern;
