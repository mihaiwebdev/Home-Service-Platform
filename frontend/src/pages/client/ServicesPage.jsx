import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useGetServicesQuery } from "../../slices/services/servicesApiSlice";
import { setServices } from "../../slices/services/servicesSlice";
import { motion } from "framer-motion";
import { useUpdateUserMutation } from "../../slices/usersApiSlice";
import { setCredentials } from "../../slices/authSlice";
import ErrorMsg from "../../components/shared/ErrorMsg";
import Loader from "../../components/shared/Loader";
import Header from "../../components/shared/Header";
import { getMessaging, getToken } from "firebase/messaging";

const SearchPage = () => {
  const { services } = useSelector((state) => state.service);

  const { data, error, isLoading } = useGetServicesQuery();
  const [updateUser] = useUpdateUserMutation();

  const dispatch = useDispatch();

  const allowNotification = async () => {
    const permission = await Notification.requestPermission();

    if (permission === "granted") {
      const messaging = getMessaging();

      const permissionToken = await getToken(messaging, {
        vapidKey:
          "BMUv2bI6LAkq6mYGqueH1Flzr8lLlyxHVjtLfHZL2C3e_hH3LxegqiM8P1ERdikNToShz2JwBit0H--ovf7yG0s",
      });

      try {
        const res = await updateUser({ permission, permissionToken }).unwrap();
        dispatch(setCredentials(res));
      } catch (error) {
        console.error(error);
      }
    } else {
      console.log(permission);
      // Say that they can't hire for a job
    }
  };

  useEffect(() => {
    if (!services) {
      dispatch(setServices({ ...data }));
    }

    allowNotification();
  }, [services, data, dispatch]);

  return (
    <motion.div
      initial={{ y: 500, opacity: 0 }}
      animate={{ y: -100, opacity: 1 }}
      transition={{
        type: "spring",
        bounce: 0.4,
        duration: 0.8,
      }}
      className="short:py-4 mx-4 px-5 py-10 bg-white text-dark rounded-md shadow-xl relative z-20"
    >
      <h1 className="font-bold text-2xl text-dark">Cu ce te putem ajuta?</h1>
      <p className="text-darkGray font-raleway mt-1">
        Selecteaza serviciul de care ai nevoie.
      </p>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <ErrorMsg message={error?.data?.message || error?.error} />
      ) : (
        services &&
        services.map((service, idx) => (
          <Link
            key={service._id}
            to={`/schedule#${service.slug}`}
            className="short2:py-0.5 h-24 px-1 mt-6 py-1 cursor-pointer 
                     border border-gray bg-white rounded-sm flex items-center "
          >
            <img
              src={service.photo}
              alt="house cleaning"
              className={`short2:h-14 h-16 short2:mx-1 p-2 mx-2 
                            rounded-full ${
                              idx === 0
                                ? "bg-orange"
                                : idx === 1
                                ? "bg-pink"
                                : idx === 2 && "bg-primary"
                            }`}
            />
            <div className=" p-1 short2:pr-0">
              <h2 className="short2:text-sm font-bold font-raleway text-lg">
                {service.name}{" "}
              </h2>
              <p className="text-darkGray text-xs">{service.text}</p>
            </div>
          </Link>
        ))
      )}
    </motion.div>
  );
};

export default SearchPage;
