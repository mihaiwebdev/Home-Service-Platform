import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useUpdateUserMutation } from "../../slices/usersApiSlice";
import { setCredentials } from "../../slices/authSlice";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useGetServicesQuery } from "../../slices/services/servicesApiSlice";
import { setServices } from "../../slices/services/servicesSlice";
import { toast } from "react-toastify";
import Modal from "../../components/shared/Modal";
import Loader from "../../components/shared/Loader";
import DeleteAcc from "../../components/shared/DeleteAcc";
import ChangePw from "../../components/shared/ChangePw";

const ProfilePage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [addressDetail, setAddressDetail] = useState("");
  const [city, setCity] = useState("");
  const [phone, setPhone] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const { userInfo } = useSelector((state) => state.auth);
  const { services } = useSelector((state) => state.service);

  const { data } = useGetServicesQuery();
  const [updateUser, { isLoading }] = useUpdateUserMutation();

  useEffect(() => {
    if (userInfo) {
      setName(userInfo.name);
      setEmail(userInfo.email);
      setAddress(userInfo.address || "");
      setAddressDetail(userInfo.addressDetail || "");
      setCity(userInfo.city || "");
      setPhone(userInfo.phone || "");
    }

    if (!services) {
      dispatch(setServices({ ...data }));
    }
  }, [userInfo, services, data]);

  const updateProfile = async (e) => {
    e.preventDefault();

    try {
      const res = await updateUser({
        name,
        email,
        address,
        addressDetail,
        city,
        phone,
      }).unwrap();
      dispatch(setCredentials({ ...res }));
      toast.success("Actualizare cu success");
      navigate(-1);
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <div className="mx-4">
      <Modal extraClass={`pb-14 ${location.hash ? "hidden" : ""}`}>
        <div className="relative w-full mb-4">
          <i
            onClick={() => navigate(-1)}
            className="fa-solid
                bg-primary text-white rounded-full py-2 px-3 fa-chevron-left absolute left-0 "
          ></i>
          <h1 className="text-center font-bold text-2xl">Profilul Tau</h1>
        </div>

        <form
          onSubmit={updateProfile}
          className="w-full flex 
            flex-col items-center mx-auto relative font-raleway"
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
            <label htmlFor="addressDetails" className="font-semibold  text-sm ">
              Detalii Adresa
            </label>
            <div className="w-full relative">
              <i className="fa-regular fa-edit absolute right-4 top-2.5 text-gray"></i>
              <input
                type="text"
                value={addressDetail}
                onChange={(e) => setAddressDetail(e.target.value)}
                className="bg-white w-full border p-2 rounded-xs ps-4
                border-gray text-sm focus:outline-none text-black font-semibold"
                placeholder="Punct de reper, apartament, scara"
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
              to="/profile#changepw"
              className="text-white flex justify-between mt-2 mb-2 w-full items-center"
            >
              <h2>Modifica parola</h2>
              <i className="fa-solid fa-chevron-right"></i>
            </Link>

            <hr className=" mt-1 text-darkGray w-full" />

            <Link
              to="/profile#deleteuser"
              className="text-white mt-3 flex justify-between mb-2 w-full items-center"
            >
              <h2>Sterge cont</h2>
              <i className="fa-solid fa-chevron-right"></i>
            </Link>
          </div>

          {isLoading ? (
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

export default ProfilePage;
