import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useUpdateUserMutation } from "../../slices/usersApiSlice";
import { setCredentials } from "../../slices/authSlice";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useGetServicesQuery } from "../../slices/services/servicesApiSlice";
import {
  useGetWorkerInfoQuery,
  useUpdateWorkerInfoMutation,
} from "../../slices/workers/workersApiSlice";
import { setWorkerInfo } from "../../slices/workers/workersSlice";
import { setServices } from "../../slices/services/servicesSlice";
import { toast } from "react-toastify";
import axios from "axios";
import Modal from "../../components/shared/Modal";
import ErrorMsg from "../../components/shared/ErrorMsg";
import Loader from "../../components/shared/Loader";
import DeleteAcc from "../../components/shared/DeleteAcc";
import ChangePw from "../../components/shared/ChangePw";

const WorkerEditPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [image, setImage] = useState("");

  const [phone, setPhone] = useState("");
  const [description, setDescription] = useState("");
  const [providedServices, setProvidedServices] = useState([]);
  const [servicesWithPrice, setServicesWithPrice] = useState([]);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const { userInfo } = useSelector((state) => state.auth);
  const { workerInfo } = useSelector((state) => state.worker);
  const { services } = useSelector((state) => state.service);
  const {
    data: workerData,
    error,
    isLoading: loadingWorker,
  } = useGetWorkerInfoQuery(userInfo._id);

  const { data } = useGetServicesQuery();
  const [updateUser, { isLoading }] = useUpdateUserMutation();
  const [updateWorkerInfo, { isLoading: updateWorkerLoading }] =
    useUpdateWorkerInfoMutation();

  useEffect(() => {
    if (!services && data) {
      dispatch(setServices({ ...data }));
    }

    if (!workerInfo && workerData) {
      dispatch(setWorkerInfo({ ...workerData }));
    }

    if (userInfo) {
      setName(userInfo.name);
      setEmail(userInfo.email);

      if (workerInfo) {
        setCity((workerInfo.location && workerInfo.location.city) || "");
        setAddress((workerInfo.location && workerInfo.location.street) || "");
        setPhone(workerInfo.phone || "");
        setDescription(workerInfo.description || "");
        setProvidedServices(
          workerInfo.services && workerInfo.services.map((item) => item.service)
        );
        setServicesWithPrice(workerInfo.services || []);
        setImage(workerInfo.photo || "");
      }
    }
  }, [dispatch, userInfo, services, data, workerInfo, workerData]);

  const handleSelectServices = (e) => {
    if (!e.target.checked) {
      setProvidedServices((state) => [
        ...state.filter((service) => service !== e.target.value),
      ]);
      setServicesWithPrice((state) => [
        ...state.filter((item) => item.service !== e.target.value),
      ]);
    } else {
      setProvidedServices((state) => [...state, e.target.value]);
    }
  };

  const handleServicePrice = (e) => {
    setServicesWithPrice((state) => [
      ...state.filter((item) => item.service !== e.target.id),
      {
        service: e.target.id,
        price: e.target.value,
      },
    ]);
  };

  const uploadPhotoHandler = async (e) => {
    const file = e.target.files[0];

    const formData = new FormData();
    formData.append("image", file);

    const config = {
      headers: {
        "Content-type": "multipart/form-data",
      },
    };
    try {
      const { data } = await axios.put(
        `/api/v1/workers/${userInfo._id}/upload-photo`,
        formData,
        config
      );

      data.success && toast.success("Fotografie adaugata!");
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  const updateProfile = async (e) => {
    e.preventDefault();

    const fullAddress = `${address}, ${city}, Romania`;

    const userData = { name, email };
    const workerData = {
      description,
      phone,
      address: fullAddress,
      services: servicesWithPrice,
    };

    if (
      name &&
      email &&
      description &&
      phone &&
      address &&
      servicesWithPrice.length > 0
    ) {
      try {
        const res = await updateUser(userData).unwrap();
        const workerRes = await updateWorkerInfo(workerData).unwrap();
        dispatch(setCredentials({ ...res }));
        dispatch(setWorkerInfo({ ...workerRes }));

        navigate("/worker/profile");
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    } else {
      toast.warning("Te rugam, completeaza toate detaliile");
    }
  };

  return (
    <div className="mx-5">
      <Modal extraClass={`pb-14 ${location.hash ? "hidden" : ""}`}>
        <div className="relative w-full mb-4">
          <i
            onClick={() => navigate("/worker/profile")}
            className={`fa-solid ${
              (workerInfo && !workerInfo.location) ||
              (workerInfo && !workerInfo.phone)
                ? "hidden"
                : ""
            }
                bg-primary text-white rounded-full py-2 px-3 fa-chevron-left absolute left-0 `}
          ></i>
          <h1 className="text-center font-bold text-2xl short:text-lg">
            Editeaza Profilul
          </h1>
        </div>

        {error && <ErrorMsg message={error.data.message || error.error} />}
        {loadingWorker && <Loader />}

        <form
          onSubmit={updateProfile}
          className="w-full  flex font-raleway
            flex-col items-center mx-auto relative"
        >
          <div className="flex flex-col items-start mt-2 w-full short:mt-4">
            <label htmlFor="name" className="font-semibold  text-sm ">
              Nume
            </label>
            <div className="w-full relative">
              <i className="fa-regular fa-edit absolute right-4 top-2.5 text-gray"></i>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="bg-white w-full border p-2 ps-4 rounded-xs
                        border-gray text-sm focus:outline-none text-black font-semibold"
              />
            </div>
          </div>

          <div className="flex flex-col items-start mt-3.5 w-full short:mt-4">
            <label htmlFor="email" className="font-semibold  text-sm ">
              Email
            </label>
            <div className="w-full relative">
              <i className="fa-regular fa-edit absolute right-4 top-2.5 text-gray"></i>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-white w-full border p-2 rounded-xs ps-4
                border-gray text-sm focus:outline-none text-black font-semibold"
              />
            </div>
          </div>

          <div className="flex flex-col items-start mt-3.5 w-full short:mt-4">
            <label htmlFor="city" className="font-semibold  text-sm ">
              Oras
            </label>
            <div className="w-full relative">
              <i className="fa-regular fa-edit absolute right-4 top-2.5 text-gray"></i>
              <input
                type="text"
                value={city}
                required
                onChange={(e) => setCity(e.target.value)}
                className="bg-white w-full border p-2 rounded-xs ps-4
                border-gray text-sm focus:outline-none text-black font-semibold"
                placeholder="Introdu orasul tau"
              />
            </div>
          </div>

          <div className="flex flex-col items-start mt-3.5 w-full short:mt-4">
            <label htmlFor="adress" className="font-semibold  text-sm  ">
              Adresa
            </label>
            <div className="w-full relative">
              <i className="fa-regular fa-edit absolute right-4 top-2.5 text-gray"></i>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="bg-white w-full border p-2 rounded-xs ps-4
                border-gray text-sm focus:outline-none text-black font-semibold"
                placeholder="Strada si numar"
              />
            </div>
          </div>

          <div className="flex flex-col items-start mt-3.5 w-full short:mt-4">
            <label htmlFor="phoneNum" className="font-semibold  text-sm ">
              Numar Telefon
            </label>
            <div className="w-full relative">
              <i className="fa-regular fa-edit absolute right-4 top-2.5 text-gray"></i>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="bg-white w-full border p-2 rounded-xs ps-4
                border-gray text-sm focus:outline-none text-black font-semibold"
                placeholder="ex: 0712345678"
              />
            </div>
          </div>

          <div className="flex flex-col items-start mt-4 w-full short:mt-4">
            <h2 className="font-bold text-dark mx-auto  bg-lightGray p-2 rounded-xs">
              Selecteaza serviciile pe care le oferi
            </h2>

            <div className="flex flex-wrap mt-2">
              {services &&
                services.map((service) => (
                  <div
                    key={service._id}
                    className="flex mr-1 bg-orange rounded-sm px-2 py-1 mb-2
                                font-semibold text-sm shadow"
                  >
                    <input
                      type="checkbox"
                      id={`service-${service._id}`}
                      checked={providedServices.includes(service.slug)}
                      className={`font-semibold mr-1
                                 py-1 rounded-full max-w-fit text-sm`}
                      value={service.slug}
                      onChange={handleSelectServices}
                    />
                    <label htmlFor={`service-${service._id}`}>
                      {" "}
                      {service.name}{" "}
                    </label>
                  </div>
                ))}
            </div>
          </div>

          {providedServices &&
            providedServices.map((service, idx) => {
              const fieldValue = servicesWithPrice.filter(
                (item) => item.service === service
              );

              return (
                <div key={idx} className="w-full">
                  <label
                    htmlFor={service}
                    className="font-semibold ms-2 text-sm text-darkGray font-bold"
                  >
                    Adauga Pret ({service})
                  </label>
                  <input
                    required
                    id={service}
                    type="number"
                    className="bg-white w-full opacity-80 border-b 
                            border-gray text-sm pb-1 py-1 font-semibold pl-2 focus:outline-none"
                    placeholder={`Pretul tau RON / ora - ${service}`}
                    value={fieldValue.length > 0 && fieldValue[0].price}
                    onChange={handleServicePrice}
                  />
                </div>
              );
            })}

          <div className="flex flex-col items-start mt-4 w-full ">
            <label htmlFor="description" className="font-semibold">
              Descriere
            </label>
            <div className="w-full relative">
              <textarea
                type="text"
                value={description}
                required
                onChange={(e) => setDescription(e.target.value)}
                className="bg-white w-full border-b font-semibold 
                         border  border-gray  rounded-xs  p-2 text-sm pb-1 pl-2 focus:outline-none"
                placeholder="Scrie ceva despre tine si experienta ta"
              />
            </div>
          </div>

          <div className="flex flex-col items-start mt-4 w-full ms-2">
            <label htmlFor="photo" className="font-semibold">
              Fotografie
            </label>
            <input
              type="text"
              placeholder="Adauga o fotografie de profil"
              disabled
              className="w-full bg-white mb-1 text-darkGray "
              defaultValue={image.split(".com/")[1]}
            />
            <input
              type="file"
              required={image ? false : true}
              onChange={uploadPhotoHandler}
              id="photo"
            />
          </div>

          <h2
            className="py-1 font-bold mb-2 
                    text-xl mt-8"
          >
            Securitate
          </h2>
          <div
            className="w-full flex flex-col items-center bg-secondary p-4 
                    rounded-md relative"
          >
            <Link
              to="/worker/profile/edit#changepw"
              className="text-white flex justify-between mt-2 mb-2 w-full items-center"
            >
              <h2>Modifica parola</h2>
              <i className="fa-solid fa-chevron-right"></i>
            </Link>

            <hr className=" mt-1 text-darkGray w-full" />

            <Link
              to="/worker/profile/edit#deleteuser"
              className="text-white mt-3 flex justify-between mb-2 w-full items-center"
            >
              <h2>Sterge cont</h2>
              <i className="fa-solid fa-chevron-right"></i>
            </Link>
          </div>

          {updateWorkerLoading || isLoading ? (
            <Loader />
          ) : (
            <input
              type="submit"
              className="disabled:opacity-75 w-2/3 
                        px-3 py-2.5 tracking-wide text-sm bg-orange text-dark mt-8 mb-8 
                       border border-gray z-10 font-bold rounded-full shadow-3xl"
              value={"SALVEAZA"}
            />
          )}
        </form>
      </Modal>

      <ChangePw />
      <DeleteAcc />
    </div>
  );
};

export default WorkerEditPage;
