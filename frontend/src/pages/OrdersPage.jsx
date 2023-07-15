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
    <div className="px-5 short:px-0">
      <Modal>
        <i
          onClick={() =>
            userInfo.role === "worker"
              ? navigate("/worker")
              : navigate("/services")
          }
          className="fa-solid
                bg-primary text-white rounded-full py-2 px-3 fa-chevron-left absolute left-6 short:left-4"
        ></i>
        {isLoading || closeContractLoading ? (
          <Loader />
        ) : (
          error && <ErrorMsg message={error?.data?.message || error.error} />
        )}
        <h1 className="text-center font-bold text-2xl mb-8 short:text-xl">
          Comenzile tale
        </h1>

        {availableContracts && availableContracts.length < 1 && (
          <div className="flex flex-col w-full font-raleway">
            <p className="font-semibold mx-auto mb-4 text-lg">
              Momentan nu ai nicio comanda
            </p>
            {userInfo.role === "client" ? (
              <Link
                to="/services"
                className="rounded-sm mx-auto font-semibold bg-dark text-white p-2 mb-8"
              >
                Fa o comanda
              </Link>
            ) : (
              <>
                <p className="px-4 mb-4 font-semibold text-center rounded-sm py-2 text-darkGray">
                  Asigura-te ca ai un program selectat si un profil bine pus la
                  punct pentru a obtine cat mai multe comenzi.
                </p>
                <Link
                  to="/worker/program"
                  className="rounded-sm mx-auto font-semibold bg-primary text-white p-2"
                >
                  Selecteaza-ti programul
                </Link>
                <Link
                  to="/worker/profile/edit"
                  className="rounded-sm mx-auto font-semibold mb-4 bg-orange text-dark p-2 mt-4"
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
              className="mb-6 pb-4 bg-lightGray flex flex-col text-dark rounded-sm font-raleway shadow px-1 short:px-0 "
            >
              {!contract.isCompleted && userInfo.role === "worker" && (
                <i
                  className="fa-solid fa-xmark ml-auto mr-1 text-red text-xl px-2 py-1"
                  onClick={rejectContract}
                ></i>
              )}
              <div className="flex items-center flex items-center justify-center rounded-t-sm flex-wrap">
                <p className="font-bold text-lg mr-4 text-primary">
                  {contract.service &&
                    contract.service[0].toUpperCase() +
                      contract.service.slice(1)}
                </p>
                <p className="font-semibold mr-4 text-darkGray">
                  {new Date(contract.date).toLocaleDateString()}
                </p>
                <p className="font-semibold text-darkGray">
                  Ora {contract.hour}:00
                </p>
              </div>

              <div className="px-2">
                <p className="font-semibold  text-center text-dark border-b border-gray mb-2">
                  {" "}
                  Pret: {contract.price} RON / ora
                </p>
                <p className="text-sm text-darkGray font-semibold ">
                  <span className="font-semibold text-dark">Adresa:</span>{" "}
                  {contract.address}
                </p>
                <p className="text-sm mt-1 text-darkGray font-semibold ">
                  <span className="font-semibold text-dark">
                    Detalii adresa:{" "}
                  </span>{" "}
                  {contract.addressDetail}
                </p>

                {userInfo.role === "client" ? (
                  <>
                    <p className="mb-2 text-dark text-sm">
                      {" "}
                      <span className="font-semibold text-sm">
                        Numar telefon angajat:{" "}
                      </span>{" "}
                      <span className="text-lg text-darkGray font-semibold ">
                        {contract.workerPhone}
                      </span>
                    </p>
                    <div className="flex justify-between">
                      <Link
                        to={`/workers/${contract.worker}`}
                        className="bg-primary text-white 
                        h-fit  p-1 rounded-sm font-semibold mt-1"
                      >
                        <i className="fa-solid fa-user ml-auto mr-1"></i>
                        Vezi profilul
                      </Link>
                      {contract.isCompleted && !contract.hasReview && (
                        <Link
                          to={`${contract._id}/review`}
                          className=" 
                            p-1 bg-pink rounded-sm font-semibold text-white mt-1 text-center "
                        >
                          Adauga review{" "}
                          <i className="fa-solid fa-edit ms-1"></i>
                        </Link>
                      )}
                    </div>
                  </>
                ) : (
                  <>
                    <p className="mb-2 text-dark text-sm">
                      <span className="font-semibold text-sm">
                        Numar telefon client:
                      </span>
                      <span className="text-lg text-darkGray font-semibold">
                        {contract.clientPhone}
                      </span>
                    </p>
                    {contract.message && (
                      <p className="text-sm mt-1 text-darkGray font-semibold ">
                        <span className="font-semibold text-dark">Mesaj: </span>
                        <span className="text-sm ">{contract.message}</span>
                      </p>
                    )}

                    {/* {!contract.isCompleted && (
                      <button
                        onClick={() => handleCloseContract(contract._id)}
                        className="block mt-4 bg-pink px-2 py-1 font-semibold rounded-sm"
                      >
                        Finalizare <i className="fa-solid fa-xmark ms-1"></i>
                      </button>
                    )} */}
                  </>
                )}
                <p className={`mt-2 ms-1 text-center rounded-sm px-2`}>
                  Status:{" "}
                  <span className="font-bold text-primary">
                    {contract.isCompleted ? "Finalizat" : "In decurs"}{" "}
                  </span>
                </p>
              </div>
            </div>
          ))}
      </Modal>

      {data && data.pagination && data.pagination.totalPages > 0 && (
        <div className="flex justify-center -mt-6 pb-10 font-raleway">
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
