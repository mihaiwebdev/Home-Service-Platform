import { useState, useEffect } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useUpdateUserMutation } from "../../slices/usersApiSlice";
import { setCredentials } from "../../slices/authSlice";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import Loader from "../../components/shared/Loader";

const SelectLocation = () => {
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [addressDetail, setAddressDetail] = useState("");

  const [phoneNum, setPhoneNum] = useState("");

  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [updateUser, { isLoading }] = useUpdateUserMutation();

  const { userInfo } = useSelector((state) => state.auth);
  const service = location.hash.split("#")[1];

  useEffect(() => {
    if (userInfo) {
      setAddress(userInfo.address || "");
      setAddressDetail(userInfo.addressDetail || "");
      setCity(userInfo.city || "");
      setPhoneNum(userInfo.phone || "");
    } else {
      navigate("/login");
    }
    if (!service) {
      navigate("/services");
    }
  }, [userInfo, service, navigate, setAddress, setAddressDetail]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (address && addressDetail && city && phoneNum) {
      try {
        const res = await updateUser({
          city,
          address,
          addressDetail,
          phone: phoneNum,
        }).unwrap();
        dispatch(setCredentials({ ...res }));
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }

      navigate(`/schedule/date#${service}`);
    } else {
      toast.error("Te rugam sa adaugi toate informatiile");
    }
  };

  return (
    <>
      <motion.div
        initial={{ x: 200, y: -70 }}
        animate={{ x: 0, y: -70 }}
        transition={{
          type: "spring",
          bounce: 0.4,
          duration: 0.8,
        }}
        className="short:py-4 py-8 shadow-lg px-2 relative z-20 mx-4 rounded-md bg-white mb-10"
      >
        <div className="flex short2:flex-col short2:text-start w-full text-center">
          <h1 className="text-2xl font-bold short2:px-2 short:text-base short:font-raleway">
            Adauga locatia pentru {service}
          </h1>
        </div>

        <form
          className="w-full flex flex-col 
            items-center px-2 pb-4"
        >
          <div className="flex flex-col items-start mt-6 w-full short:mt-4 font-raleway">
            <label htmlFor="city" className="font-semibold ms-2 ">
              Oras
            </label>
            <div className="w-full relative">
              <i className="fa-regular fa-edit absolute right-4 top-1"></i>
              <input
                type="text"
                value={city}
                required
                onChange={(e) => setCity(e.target.value)}
                className="text-black pt-2 w-full opacity-80 border-b 
                        border-darkGray text-sm pb-1 pl-2 font-semibold focus:outline-none focus:border-primary"
                placeholder="Introdu orasul tau"
              />
            </div>
          </div>

          <div className="flex flex-col items-start mt-6 w-full short:mt-4 font-raleway">
            <label htmlFor="address" className="font-semibold ms-2 ">
              Adresa
            </label>
            <div className="w-full relative">
              <i className="fa-regular fa-edit absolute right-4 top-1"></i>
              <input
                type="text"
                value={address}
                required
                onChange={(e) => setAddress(e.target.value)}
                className="text-black pt-2 w-full opacity-80 border-b 
                        border-darkGray text-sm pb-1 pl-2 font-semibold focus:outline-none focus:border-primary"
                placeholder="Strada si numar"
              />
            </div>
          </div>

          <div className="flex flex-col items-start mt-6 w-full short:mt-4 font-raleway">
            <label htmlFor="addressDetails" className="font-semibold ms-2">
              Detalii Adresa
            </label>
            <div className="w-full relative">
              <i className="fa-regular fa-edit absolute right-4 top-1"></i>
              <input
                type="text"
                value={addressDetail}
                required
                onChange={(e) => setAddressDetail(e.target.value)}
                className="text-black pt-2 w-full opacity-80 border-b 
                        border-darkGray text-sm pb-1 pl-2 font-semibold focus:outline-none focus:border-primary"
                placeholder="Punct de reper, apartament, scara"
              />
            </div>
          </div>

          <div className="flex flex-col items-start mt-6 w-full short:mt-4 font-raleway">
            <label htmlFor="phone" className="font-semibold ms-2">
              Numar telefon
            </label>
            <div className="w-full relative">
              <i className="fa-regular fa-edit absolute right-4 top-1"></i>
              <input
                type="text"
                value={phoneNum}
                required
                onChange={(e) => setPhoneNum(e.target.value)}
                className="pt-2 text-black w-full opacity-80 border-b text-black
                        border-darkGray text-sm pb-1 pl-2 font-semibold focus:outline-none focus:border-primary"
                placeholder="0712345678"
              />
            </div>
          </div>
        </form>
      </motion.div>

      {isLoading ? (
        <Loader />
      ) : (
        <div
          className="mt-auto absolute bottom-0 bg-white h-20
            short:py-1 w-full flex items-center justify-end"
        >
          <Link
            to={"/services"}
            className="me-auto ms-4 text-darkGray font-bold font-raleway text-lg"
          >
            Înapoi
          </Link>

          <input
            onClick={handleSubmit}
            type="submit"
            id="submit"
            name="submit"
            className="text-start text-white font-semibold
                font-raleway h-12 px-3 bg-dark rounded-sm me-4"
            value={"Selecteaza data"}
          />
        </div>
      )}
    </>
  );
};

export default SelectLocation;
