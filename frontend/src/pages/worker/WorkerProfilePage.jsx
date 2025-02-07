import Modal from "../../components/shared/Modal";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  useGetWorkerInfoQuery,
  useGetReviewsQuery,
} from "../../slices/workers/workersApiSlice";
import { setWorkerInfo } from "../../slices/workers/workersSlice";
import ErrorMsg from "../../components/shared/ErrorMsg";
import Rating from "../../components/worker/Rating";
import Reviews from "../../components/worker/Reviews";
import Loader from "../../components/shared/Loader";

const WorkerProfilePage = () => {
  const dispatch = useDispatch();

  const { workerInfo } = useSelector((state) => state.worker);
  const { userInfo } = useSelector((state) => state.auth);
  const { data, error, isLoading } = useGetWorkerInfoQuery(userInfo._id);
  const {
    data: reviews,
    error: reviewsErr,
    isLoading: reviewsLoading,
  } = useGetReviewsQuery(userInfo._id);

  const navigate = useNavigate();

  useEffect(() => {
    if (data && !workerInfo) {
      dispatch(setWorkerInfo({ ...data }));
    }
  }, [dispatch, data, workerInfo]);

  return (
    <div className="mx-5">
      <Modal extraClass={"relative font-raleway"}>
        <i
          onClick={() => navigate("/worker")}
          className="fa-solid
                bg-primary text-white rounded-full py-2 px-3 fa-chevron-left absolute left-6"
        ></i>

        {isLoading ? (
          <Loader />
        ) : error ? (
          <ErrorMsg message={error?.data?.message || error.error} />
        ) : (
          workerInfo && (
            <>
              <h1 className="font-bold text-2xl text-center mr-8 w-full">
                {userInfo.name}
              </h1>

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
              <Link
                to="/worker/profile/edit"
                className="mt-2 border-b border-orange text-orange font-semibold text-dark"
              >
                <i className="fa-solid fa-edit "></i> Editeaza Profilul
              </Link>

              <div className="w-full mt-4 border-b border-gray pb-4">
                <p className="text-lg font-bold opacity-70">Descriere:</p>
                <p className="text-sm font-semibold text-darkGray">
                  {workerInfo.description}
                </p>
              </div>
              <div className="w-full pb-1 mt-2">
                <p className="font-bold opacity-70">Email:</p>
                <p className="text-sm font-semibold text-darkGray">
                  {userInfo.email}
                </p>
              </div>

              <div className="w-full mt-2 pb-1 flex flex-col flex-wrap">
                <p className="font-bold opacity-70">Telefon:</p>
                <p className="text-sm font-semibold text-darkGray">
                  {workerInfo.phone}
                </p>
              </div>

              <div className="w-full mt-2 border-b border-gray pb-4">
                <p className="font-bold opacity-70">Adresa:</p>
                {workerInfo.location && (
                  <p className="text-sm font-semibold text-darkGray">
                    {workerInfo.location.street +
                      ", " +
                      workerInfo.location.city}
                  </p>
                )}
              </div>

              <div className="w-full mt-2 border-b border-gray pb-4">
                <div className="flex">
                  <h2 className="text-lg font-bold opacity-70">Servicii:</h2>
                  <div className="flex flex-wrap">
                    {workerInfo.services.map((service, idx) => (
                      <div
                        key={idx}
                        className="mb-1 bg-primary flex text-white pb-1
                                            rounded-sm border border-gray mx-1 px-1 flex-col 
                                            items-center justify-center"
                      >
                        <p
                          className={`font-bold pt-1 px-1 
                                                text-sm `}
                        >
                          {service.service[0].toUpperCase() +
                            service.service.slice(1)}
                        </p>
                        <span className="w-full font-semibold opacity-90 text-xs block text-center px-1 text-sm ">
                          {service.price} RON / h
                        </span>
                      </div>
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
                  <div className="w-full mt-2 mb-6">
                    <h2 className="text-lg font-bold opacity-70 mb-2">
                      Review-uri:
                    </h2>
                    <Reviews reviews={reviews.data} />
                  </div>
                )
              )}
            </>
          )
        )}
      </Modal>
    </div>
  );
};

export default WorkerProfilePage;
