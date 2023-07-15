import Modal from "../../components/shared/Modal";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  useGetWorkerInfoQuery,
  useGetReviewsQuery,
} from "../../slices/workers/workersApiSlice";
import { useCreateContractMutation } from "../../slices/contracts/contractsApiSlice";
import { setWorkerInfo } from "../../slices/workers/workersSlice";
import { toast } from "react-toastify";
import Reviews from "../worker/Reviews";
import ErrorMsg from "../../components/shared/ErrorMsg";
import Rating from "../../components/worker/Rating";
import Loader from "../../components/shared/Loader";

const WorkerInfo = () => {
  const [price, setPrice] = useState(0);
  const [message, setMessage] = useState("");

  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const id = location.pathname.split("/")[2];

  const { userInfo } = useSelector((state) => state.auth);
  const { workerInfo } = useSelector((state) => state.worker);
  const { jobInfo } = useSelector((state) => state.contracts);
  const { data, error, isLoading } = useGetWorkerInfoQuery(id);
  const {
    data: reviews,
    error: reviewsErr,
    isLoading: reviewsLoading,
  } = useGetReviewsQuery(id);

  const [createContract, { isLoading: createLoading }] =
    useCreateContractMutation();

  useEffect(() => {
    if ((!workerInfo || workerInfo._id !== id) && data) {
      dispatch(setWorkerInfo({ ...data }));
    }

    if (workerInfo && jobInfo) {
      const service = workerInfo.services.find(
        (item) => item.service === jobInfo.service
      );
      setPrice(service.price);
    }
  }, [dispatch, navigate, setPrice, workerInfo, id, data, jobInfo]);

  const handleProposal = async () => {
    const contractData = {
      ...jobInfo,
      price,
      message,
      client: userInfo._id,
      worker: workerInfo._id,
      workerPhone: workerInfo.phone,
    };

    try {
      await createContract(contractData).unwrap();
      toast.success(`L-ai angajat pe ${workerInfo.user.name}`);

      navigate("/orders");
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <div className="mx-5">
      <Modal>
        <i
          onClick={() => navigate(-1)}
          className="fa-solid
                bg-primary text-white rounded-full py-2 px-3 fa-chevron-left absolute left-8 "
        ></i>
        {isLoading ? (
          <Loader />
        ) : error ? (
          <ErrorMsg message={error?.data?.message || error.error} />
        ) : (
          workerInfo && (
            <>
              <h1 className="font-bold text-2xl">{workerInfo.user.name}</h1>
              <div className="absolute top-9 right-6">
                <Rating value={workerInfo.averageRating} color={"#ffea00"} />
              </div>

              <div className="mt-4 mb-2 h-44 w-full flex items-center justify-center">
                <img
                  src={workerInfo.photo}
                  alt={"fotografie-profil"}
                  className="rounded-md h-full shadow-lg object-contain"
                />
              </div>

              <div className="w-full mt-4 border-b border-gray pb-4 font-raleway">
                <p className="text-lg font-bold ">Descriere:</p>
                <p className="text-sm font text-darkGray font-semibold">
                  {workerInfo.description}
                </p>
              </div>

              <div className="w-full mt-2 border-b border-gray pb-4 font-raleway">
                <div className="flex">
                  <h2 className="text-lg font-bold">Servicii:</h2>
                  <div className="flex flex-col items-center">
                    {workerInfo.services.map((service, idx) => (
                      <p
                        key={idx}
                        className={`font-semibold mx-2 px-2 py-1 rounded-full
                                        max-w-fit bg-primary my-1 text-white
                                        text-sm`}
                      >
                        {service.service[0].toUpperCase() +
                          service.service.slice(1)}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
              {reviewsLoading ? (
                <Loader />
              ) : reviewsErr ? (
                <ErrorMsg message={reviewsErr} />
              ) : (
                reviews &&
                reviews.data.length > 0 && (
                  <div className="w-full mt-2 mb-6 font-raleway">
                    <h2 className="text-lg font-bold opacity-70 mb-2">
                      Review-uri:
                    </h2>
                    <Reviews reviews={reviews.data} />
                  </div>
                )
              )}
              {jobInfo && (
                <div className="w-full mt-2 mb-12">
                  <textarea
                    className="w-full border-b border-gray p-2 shadow-sm rounded-md 
                                bg-lightLime focus:outline-none"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Adauga detalii pentru lucrator"
                  />
                </div>
              )}

              {createLoading ? (
                <Loader />
              ) : (
                jobInfo && (
                  <button
                    onClick={handleProposal}
                    className="bg-lime py-2 px-12 rounded-full
                             font-bold shadow-xl mt-4 fixed z-10 bottom-20"
                  >
                    Angajeaza
                  </button>
                )
              )}
            </>
          )
        )}
      </Modal>
    </div>
  );
};

export default WorkerInfo;
