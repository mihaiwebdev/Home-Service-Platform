import { useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useGetContractsQuery } from "../slices/contracts/contractsApiSlice";
import { setContracts } from "../slices/contracts/contractsSlice";
import Loader from "../components/shared/Loader";
import ErrorMsg from "../components/shared/ErrorMsg";

const OrdersPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { userInfo } = useSelector((state) => state.auth);
  const { availableContracts } = useSelector((state) => state.contracts);
  const { data, isLoading, error, refetch } = useGetContractsQuery(
    location.search.split("?page=")[1] || 1
  );

  useEffect(() => {
    dispatch(setContracts({ ...data }));
    refetch();
  }, [dispatch, refetch, data]);

  const closeContract = () => {};

  return (
    <div className="pt-16 px-4 min-h-100dvh">
      <i
        onClick={() =>
          userInfo.role === "worker" ? navigate(-1) : navigate("/services")
        }
        className="fa-solid
                bg-lime rounded-full mt-10 py-2 px-3 fa-chevron-left absolute left-6"
      ></i>
      {isLoading ? (
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
              <p className="px-4 mb-4 font-semibold text-center">
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
          <div key={contract._id} className="mb-6 pb-4 shadow p-1 rounded-sm">
            <div className="flex items-center border-b border-gray flex-wrap">
              <p className="font-bold text-xl mr-4 text-myYellow">
                {contract.service &&
                  contract.service[0].toUpperCase() + contract.service.slice(1)}
              </p>
              <p className="font-semibold text-lg mr-4">
                {new Date(contract.date).toLocaleDateString()}
              </p>
              <p className="font-semibold text-lg">Ora {contract.hour}:00</p>
              <i className="fa-solid fa-edit ml-auto text-myYellow"></i>
            </div>
            <p className="font-semibold text-lg">
              {" "}
              Pret: {contract.price} RON / ora
            </p>
            <p>
              <span className="font-semibold">Adresa:</span> {contract.address}
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
                  {contract.isCompleted ? (
                    <Link
                      to={`?review=${contract.worker}`}
                      className="bg-lime 
                    p-1 rounded-sm font-semibold px-4 mt-2"
                    >
                      Adauga un review
                    </Link>
                  ) : (
                    <Link
                      to={`/workers/${contract.worker}`}
                      className="bg-lime 
                        p-2 rounded-sm font-semibold px-4 mt-2"
                    >
                      Vezi profilul <i className="fa-regular fa-user"></i>
                    </Link>
                  )}

                  <button className="block mt-4 bg-myYellow px-2 py-1 font-semibold rounded-sm">
                    Inchide contractul <i className="fa-solid fa-xmark"></i>
                  </button>
                </div>
              </>
            ) : (
              <>
                <p>
                  {" "}
                  <span className="font-semibold">
                    Numar telefon client:{" "}
                  </span>{" "}
                  <span className="text-lg">????</span>
                </p>
                {contract.message && (
                  <p className="mb-4">
                    {" "}
                    <span className="font-semibold">Mesaj: </span>{" "}
                    <span className="text-sm">{contract.message}</span>
                  </p>
                )}

                <button
                  onClick={closeContract}
                  className="block mt-4 bg-myYellow px-2 py-1 font-semibold rounded-sm"
                >
                  Inchide contractul <i className="fa-solid fa-check"></i>
                </button>
              </>
            )}
            <p
              className={`mt-2 ms-1 text-center ${
                contract.isCompleted ? "bg-lime" : "bg-limeMatch"
              }  px-2 `}
            >
              Status:{" "}
              <span className="font-bold">
                {contract.isCompleted ? "Finalizat" : "In decurs"}{" "}
              </span>
            </p>
          </div>
        ))}

      {data && data.pagination && (
        <div className="flex justify-center mt-2">
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
    </div>
  );
};

export default OrdersPage;
