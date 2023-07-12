import { Link } from "react-router-dom";
import Modal from "../../components/shared/Modal";
import graph from "../../assets/graph.png";
import calendar from "../../assets/calendar.png";
import userAvatar from "../../assets/user-avatar.png";
import houseCleaning from "../../assets/house-cleaning.png";
import Pattern from "../../components/shared/Pattern";

const WorkerHomePage = () => {
  return (
    <div className="pt-20 h-screen text-center">
      <h1 className="text-2xl font-bold px-4">
        Fă-ți propriul program de lucru în domeniul treburilor casnice
        <img
          className="inline-block ms-2"
          width={40}
          height={40}
          src={houseCleaning}
          alt="clean-house"
        />{" "}
      </h1>

      <h1 className="mt-2 text-lg font-semibold rounded-sm">
        {" "}
        Noi îți aducem clienții, tu îți aduci abilitățile.
      </h1>
      <Modal extraClass={"mt-8  bg-purple px-0"}>
        <div className="w-full">
          <Link
            to="/worker/program"
            className="bg-white border border-gray rounded-md  flex px-6 shadow-md
          justify-around items-center w-full py-1"
          >
            <img src={calendar} width={80} height={80} alt="calendar" />
            <div className="flex items-center">
              <h1 className=" font-bold text-xl me-2">Calendar</h1>
              <i className="fa-solid text-xs fa-chevron-right px-2 py-1 bg-lime rounded-full "></i>
            </div>
          </Link>

          <Link
            to="/orders"
            className="bg-white border border-gray rounded-md flex px-6 shadow-md
                 justify-around items-center w-full my-6 py-1"
          >
            <div className="flex items-center">
              <h1 className=" font-bold text-xl me-2">Comenzi</h1>
              <i className="fa-solid text-xs fa-chevron-right px-2 py-1 bg-lime rounded-full "></i>
            </div>
            <img src={graph} alt="comenzi" width={80} height={80} />
          </Link>

          <Link
            to="/worker/profile"
            className="bg-white border border-gray rounded-md  flex px-6 shadow-md
          justify-around items-center w-full py-1"
          >
            <img src={userAvatar} alt="comenzi" width={80} height={80} />
            <div className="flex items-center">
              <h1 className=" font-bold text-xl me-2">Profil</h1>
              <i className="fa-solid text-xs fa-chevron-right px-2 py-1 bg-lime rounded-full "></i>
            </div>
          </Link>
        </div>
      </Modal>

      <Pattern />
    </div>
  );
};

export default WorkerHomePage;
