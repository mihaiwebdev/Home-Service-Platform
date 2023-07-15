import { Link } from "react-router-dom";
import Modal from "../../components/shared/Modal";

const WorkerHomePage = () => {
  return (
    <>
      <div className="mx-5">
        <Modal>
          <h1 className="text-2xl font-bold text-center font-raleway short2:text-lg">
            Fă-ți propriul program de lucru în domeniul treburilor casnice
          </h1>

          <h1 className="font-semibold rounded-sm font-raleway text-darkGray mb-4 mt-2 text-base">
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
                src={
                  "https://home-services-s3.s3.eu-north-1.amazonaws.com/calendar.png"
                }
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
                src={
                  "https://home-services-s3.s3.eu-north-1.amazonaws.com/graph.png"
                }
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
                src={
                  "https://home-services-s3.s3.eu-north-1.amazonaws.com/user-avatar.png"
                }
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
