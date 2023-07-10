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
import cleanHome from "../../assets/clean-home.jpg";
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
    <div className="pt-16 min-h-100dvh h-full max-h-fit pb-10">
      <motion.img
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        src={cleanHome}
        alt="clean-house"
        className="short:h-auto mx-auto object-cover  w-full
             h-60 md:max-w-3xl md:rounded-t-md md:h-auto rounded-t-sm"
      />

      <motion.div
        initial={{ y: 500, opacity: 0 }}
        animate={{ y: -24, opacity: 1 }}
        transition={{
          type: "spring",
          bounce: 0.4,
          duration: 0.8,
        }}
        className="mx-auto p-5 pb-10 max-w-3xl mt-auto bg-lightLime rounded-t-lg 
             -translate-y-6 lg:-translate-y-20"
      >
        <h1 className="text-center font-bold text-lg ">
          Cu ce te putem ajuta?
        </h1>

        {isLoading ? (
          <Loader />
        ) : error ? (
          <ErrorMsg message={error?.data?.message || error?.error} />
        ) : (
          services &&
          services.map((service) => (
            <Link
              key={service._id}
              to={`/schedule#${service.slug}`}
              className="my-4 min-h-20 pb-2 cursor-pointer 
                     border-b border-gray bg-lightLime flex items-center "
            >
              <img
                src={service.photo}
                alt="house cleaning"
                className="short:py-4 h-20 p-4 short:px-0
                            bg-lightLime w-auto rounded-md "
              />
              <div className="pr-4 p-2 short2:pr-0">
                <h2 className="font-semibold">{service.name} </h2>
                <p className="opacity-70 text-sm short2:text-xs">
                  {service.text}
                </p>
              </div>

              <i
                className="fa-solid my-auto ml-auto mr-2 fa-chevron-right 
                            bg-lime rounded-full py-1 px-2.5 text-sm"
              ></i>
            </Link>
          ))
        )}
      </motion.div>
    </div>
  );
};

export default SearchPage;
