import { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  useGetContractsQuery,
  useCloseContractMutation,
} from "../slices/contracts/contractsApiSlice";
import { setContracts } from "../slices/contracts/contractsSlice";
import { toast } from "react-toastify";
import Modal from "../components/shared/Modal";
import Loader from "../components/shared/Loader";
import ErrorMsg from "../components/shared/ErrorMsg";

const OrdersPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [closedContract, setClosedContract] = useState("");

  const { userInfo } = useSelector((state) => state.auth);
  const { availableContracts } = useSelector((state) => state.contracts);
  const { data, isLoading, error, refetch } = useGetContractsQuery(
    location.search.split("?page=")[1] || 1
  );

  const closeContractId = location.hash.split("#")[1];

  const [closeContract, { isLoading: closeContractLoading }] =
    useCloseContractMutation();

  useEffect(() => {
    dispatch(setContracts({ ...data }));
    refetch();
  }, [dispatch, refetch, data, closedContract]);

  const handleCloseContract = async (id) => {
    const res = await closeContract(id);

    if (res.data.success) {
      setClosedContract(id);
      toast.success("Contractul a fost inchis!");
      navigate(-1);
    }
  };

  const rejectContract = () => {};

  return (
    <div className="pt-16 px-4 min-h-100dvh relative ">
      <i
        onClick={() =>
          userInfo.role === "worker"
            ? navigate("/worker")
            : navigate("/services")
        }
        className="fa-solid
                bg-lime rounded-full mt-10 py-2 px-3 fa-chevron-left absolute left-6"
      ></i>
      {isLoading || closeContractLoading ? (
        <Loader />
      ) : (
        error && <ErrorMsg message={error?.data?.message || error.error} />
      )}
      <h1 className="mt-10 text-center font-bold text-2xl mb-8">
        Comenzile tale
      </h1>

      {availableContracts && availableContracts.length < 1 && (
        <div className="flex flex-col w-full">
          <p className="font-semibold mx-auto mb-4 text-lg">
            Momentan nu ai nicio comanda
          </p>
          {userInfo.role === "client" ? (
            <Link
              to="/services"
              className="rounded-sm mx-auto font-semibold bg-dark text-white p-2"
            >
              Fa o comanda
            </Link>
          ) : (
            <>
              <p className="px-4 mb-4 font-semibold text-center bg-myYellow rounded-sm py-2">
                Asigura-te ca ai un program selectat si un profil bine pus la
                punct pentru a obtine cat mai multe comenzi.
              </p>
              <Link
                to="/worker/program"
                className="rounded-sm mx-auto font-semibold bg-dark text-white p-2"
              >
                Selecteaza-ti programul
              </Link>
              <Link
                to="/worker/profile/edit"
                className="rounded-sm mx-auto font-semibold bg-myGreen text-white p-2 mt-4"
              >
                Creeaza-ti profilul
              </Link>
            </>
          )}
        </div>
      )}

      {availableContracts &&
        availableContracts.map((contract) => (
          <div
            key={contract._id}
            className="mb-6 pb-4 bg-white text-dark rounded-sm  border border-gray"
          >
            <div className="flex items-center flex items-center justify-center py-1 text-white bg-primary rounded-t-sm flex-wrap">
              <p className="font-bold text-xl mr-4 text-myYellow">
                {contract.service &&
                  contract.service[0].toUpperCase() + contract.service.slice(1)}
              </p>
              <p className="font-semibold text-lg mr-4">
                {new Date(contract.date).toLocaleDateString()}
              </p>
              <p className="font-semibold text-lg">Ora {contract.hour}:00</p>

              {!contract.isCompleted && (
                <i
                  className="fa-solid fa-xmark ml-auto mr-1 text-red text-xl px-2 py-1"
                  onClick={rejectContract}
                ></i>
              )}
            </div>
            <div className="px-2">
              <p className="font-semibold  bg-third text-center rounded-sm text-dark text-lg mt-2">
                {" "}
                Pret: {contract.price} RON / ora
              </p>
              <p>
                <span className="font-semibold">Adresa:</span>{" "}
                {contract.address}
              </p>
              <p>
                <span className="font-semibold">Detalii adresa: </span>{" "}
                {contract.addressDetail}
              </p>

              {userInfo.role === "client" ? (
                <>
                  <p className="mb-2">
                    {" "}
                    <span className="font-semibold">
                      Numar telefon angajat:{" "}
                    </span>{" "}
                    <span className="text-lg">{contract.workerPhone}</span>
                  </p>
                  <div className="flex justify-between">
                    <Link
                      to={`/workers/${contract.worker}`}
                      className="bg-primary text-white 
                        h-fit  p-1 rounded-sm font-semibold px-4 mt-3"
                    >
                      Vezi profilul <i className="fa-regular fa-user"></i>
                    </Link>
                    {contract.isCompleted && !contract.hasReview && (
                      <Link
                        to={`${contract._id}/review`}
                        className=" 
                    p-1 rounded-sm font-semibold px-4 h-fit mt-3 text-center "
                      >
                        Adauga review{" "}
                        <i className="fa-solid fa-edit ml-auto ms-1"></i>
                      </Link>
                    )}
                  </div>
                </>
              ) : (
                <>
                  <p>
                    <span className="font-semibold">Numar telefon client:</span>
                    <span className="text-lg">{contract.clientPhone}</span>
                  </p>
                  {contract.message && (
                    <p className="mb-4">
                      <span className="font-semibold">Mesaj: </span>
                      <span className="text-sm">{contract.message}</span>
                    </p>
                  )}

                  {!contract.isCompleted && (
                    <button
                      onClick={() => handleCloseContract(contract._id)}
                      className="block mt-4 bg-myYellow px-2 py-1 font-semibold rounded-sm"
                    >
                      Finalizare <i className="fa-solid fa-xmark ms-1"></i>
                    </button>
                  )}
                </>
              )}
              <p className={`mt-2 ms-1 text-center rounded-sm px-2 `}>
                Status:{" "}
                <span className="font-bold">
                  {contract.isCompleted ? "Finalizat" : "In decurs"}{" "}
                </span>
              </p>
            </div>
          </div>
        ))}

      {data && data.pagination && data.pagination.totalPages > 0 && (
        <div className="flex justify-center mt-6 pb-10">
          <button
            onClick={() =>
              navigate(`/orders?page=${data.pagination.previous.page}`)
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
            onClick={() =>
              navigate(`/orders?page=${data.pagination.next.page}`)
            }
            className={`${!data.pagination.next && "opacity-60"}
            bg-limeMatch rounded-full px-2 text-2xl`}
            disabled={!data.pagination.next}
          >
            <i className="fa-solid fa-chevron-right"></i>
          </button>
        </div>
      )}

      <Modal
        extraClass={`${
          !closeContractId ? "hidden" : ""
        } absolute bottom-0 left-0`}
      >
        <i
          onClick={() => navigate(-1)}
          className="fa-solid
                bg-lime rounded-full py-2 px-3 fa-chevron-left absolute left-8 "
        ></i>
        <h1 className="text-lg font-bold">Inchide contractul</h1>
        <p className="mt-6 font-semibold">
          Esti sigur ca doresti sa inchei contractul?
        </p>

        <div className="flex mt-4">
          <button
            className="px-3 mr-4 py-2.5 tracking-wide text-sm bg-gray
          text-dark w-2/4 font-bold rounded-full shadow-xl"
            onClick={() => navigate(-1)}
          >
            Anulati
          </button>

          <button
            onClick={() => handleCloseContract(closeContractId)}
            className="px-3 py-2.5 tracking-wide text-sm bg-red
          text-white w-2/4 font-bold rounded-full shadow-xl"
          >
            Inchide
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default OrdersPage;
