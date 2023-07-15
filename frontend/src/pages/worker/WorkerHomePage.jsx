import { Link } from "react-router-dom";
import Modal from "../../components/shared/Modal";
import graph from "../../assets/graph.png";
import calendar from "../../assets/calendar.png";
import userAvatar from "../../assets/user-avatar.png";
import houseCleaning from "../../assets/house-cleaning.png";

const WorkerHomePage = () => {
  return (
    <>
      <div className="mx-5">
        <Modal>
          <h1 className="text-2xl font-bold text-center short2:text-xl short2:font-raleway">
            Fă-ți propriul program de lucru în domeniul treburilor casnice
            <img
              className="inline-block ms-2"
              width={40}
              height={40}
              src={houseCleaning}
              alt="clean-house"
            />{" "}
          </h1>

          <h1 className="text-lg font-semibold rounded-sm font-raleway text-darkGray mb-4 mt-2 short2:text-base">
            {" "}
            Noi îți aducem clienții, tu îți aduci abilitățile.
          </h1>
          <div className="w-full pb-10">
            <Link
              to="/worker/program"
              className="bg-white border border-gray rounded-md flex px-6 shadow-md
          justify-around items-center w-full py-1"
            >
              <img
                src={calendar}
                alt="calendar"
                className="
              h-20 w-20 short2:h-16 short2:w-16"
              />
              <div className="flex items-center">
                <h1 className=" font-bold text-xl me-2 font-raleway">
                  Calendar
                </h1>
                <i className="fa-solid text-xs fa-chevron-right px-2 py-1 bg-lime rounded-full "></i>
              </div>
            </Link>

            <Link
              to="/orders"
              className="bg-white border border-gray rounded-md flex px-6 shadow-md
                 justify-around items-center w-full my-6 py-1"
            >
              <div className="flex items-center">
                <h1 className=" font-bold text-xl me-2 font-raleway">
                  Comenzi
                </h1>
                <i className="fa-solid text-xs fa-chevron-right px-2 py-1 bg-lime rounded-full "></i>
              </div>
              <img
                src={graph}
                alt="calendar"
                className="
              h-20 w-20 short2:h-16 short2:w-16"
              />
            </Link>

            <Link
              to="/worker/profile"
              className="bg-white border border-gray rounded-md  flex px-6 shadow-md
          justify-around items-center w-full py-1"
            >
              <img
                src={userAvatar}
                alt="calendar"
                className="
              h-20 w-20 short2:h-16 short2:w-16"
              />
              <div className="flex items-center">
                <h1 className=" font-bold text-xl me-2 font-raleway">Profil</h1>
                <i className="fa-solid text-xs fa-chevron-right px-2 py-1 bg-lime rounded-full "></i>
              </div>
            </Link>
          </div>
        </Modal>
      </div>
    </>
  );
};

export default WorkerHomePage;
