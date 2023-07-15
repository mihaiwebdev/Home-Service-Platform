import { useEffect } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useGetAvailableWorkersQuery } from "../../slices/workers/workersApiSlice";
import { setAvailableWorkers } from "../../slices/workers/workersSlice";
import { motion } from "framer-motion";
import ErrorMsg from "../../components/shared/ErrorMsg";
import Rating from "../../components/worker/Rating";
import Loader from "../../components/shared/Loader";

const WorkersResult = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  const service = searchParams.get("service");
  const address = searchParams.get("address");
  const date = searchParams.get("date");
  const hour = searchParams.get("hour");

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { availableWorkers } = useSelector((state) => state.worker);

  const { data, error, isLoading } = useGetAvailableWorkersQuery({
    service,
    address,
    date,
    hour,
    page: searchParams.get("page") || "1",
  });

  useEffect(() => {
    if (data) {
      dispatch(setAvailableWorkers({ ...data }));
    }
  }, [data, dispatch]);

  return (
    <div>
      <motion.div
        initial={{ x: 200, y: -100 }}
        animate={{ x: 0, y: -100 }}
        transition={{
          type: "spring",
          bounce: 0.4,
          duration: 0.8,
        }}
        className="py-4 shadow-lg px-2 relative z-20 mx-4 rounded-md bg-white font-raleway
        "
      >
        <div className="px-2 mb-8">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold tracking-wide">
              {service[0].toUpperCase() + service.slice(1)}
            </h1>
            <p className="ml-4 font-semibold opacity-80 text-end">{address}</p>
          </div>
          <p className="opacity-80 font-semibold text-sm">
            {date} {hour}:00
          </p>
        </div>

        <h1 className="text-center mb-4 font-bold text-xl">
          Persoane disponibile:{" "}
          <span className="opacity-70">{data && data.count}</span>
        </h1>
        {data && data.count === 0 && (
          <>
            <p className="font-raleway text-center">
              Momentan nu am gasit persoane disponibile
            </p>
            <p className="font-raleway text-center text-sm">
              Te rugam sa incerci o alta data calendaristica
            </p>
          </>
        )}

        {isLoading ? (
          <div className="my-auto">
            <Loader />
          </div>
        ) : error ? (
          <ErrorMsg message={error?.data?.message || error?.error} />
        ) : (
          <>
            {availableWorkers &&
              availableWorkers.map((worker, idx) => (
                <Link
                  to={`${worker._id}`}
                  key={worker._id}
                  className={` flex p-4 py-6 border-t border-gray w-full relative`}
                >
                  <div className="w-24">
                    <motion.img
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 1.5 }}
                      className="w-full h-28 object-cover rounded-md shadow-md"
                      src={worker.photo}
                      alt="imagine"
                    />
                  </div>

                  <div className="me-4 ms-2 w-2/3">
                    <div className="flex items-center">
                      <h2 className="me-2 font-bold text-xl tracking-wide">
                        {worker.user.name}
                      </h2>
                    </div>

                    <p className="text-sm text-darkGray font-semibold">
                      {worker.description.slice(0, 100)}...
                    </p>
                  </div>

                  <div className="absolute top-3 right-0">
                    <Rating value={4.5} color={"#ffea00"} />
                  </div>

                  <div className="ml-auto self-end">
                    <p className="font-semibold text-limetext-end text-3xl">
                      {worker.services.map(
                        (item) => item.service === service && item.price
                      )}
                    </p>
                    <p className="text-end text-sm">RON</p>
                    <p className="text-end text-sm">ora</p>
                  </div>
                </Link>
              ))}

            {data && data.pagination && data.pagination.page > 1 && (
              <div className="flex justify-center mt-8">
                <button
                  onClick={() =>
                    navigate(`&page=${data.pagination.previous.page}`)
                  }
                  className={` ${!data.pagination.previous && "opacity-60"}
            bg-limeMatch rounded-full px-2 text-2xl`}
                  disabled={!data.pagination.previous}
                >
                  <i className="fa-solid fa-chevron-left"></i>
                </button>

                <p className="mx-6 font-semibold">
                  Page: {data.pagination.page} of {data.pagination.totalPages}
                </p>

                <button
                  onClick={() => navigate(`&page=${data.pagination.next.page}`)}
                  className={`${!data.pagination.next && "opacity-60"}
            bg-limeMatch rounded-full px-2 text-2xl`}
                  disabled={!data.pagination.next}
                >
                  <i className="fa-solid fa-chevron-right"></i>
                </button>
              </div>
            )}
          </>
        )}
      </motion.div>
      <div
        className="mt-auto absolute bottom-0 bg-white h-20
            short:py-1 w-full flex items-center justify-end"
      >
        <button
          onClick={() => navigate(-1)}
          className="me-auto ms-4 text-darkGray font-bold font-raleway text-lg"
        >
          Înapoi
        </button>
      </div>
    </div>
  );
};

export default WorkersResult;
