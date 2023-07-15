import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setJobInfo } from "../../slices/contracts/contractsSlice";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import Calendar from "react-calendar";

const SelectDate = () => {
  const [date, setDate] = useState(new Date().toDateString());
  const [hour, setHour] = useState(0);

  const hoursArr = Array.from({ length: 24 }, (x, index) => index + 1);
  const location = useLocation();
  const service = location.hash.split("#")[1];
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { userInfo } = useSelector((state) => state.auth);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      userInfo &&
      userInfo.address &&
      userInfo.addressDetail &&
      userInfo.phone &&
      userInfo.city
    ) {
      const fullAddress = `${userInfo.address}, ${userInfo.city}, Romania`;

      if (date && hour && service) {
        dispatch(
          setJobInfo({
            address: fullAddress,
            addressDetail: userInfo.addressDetail,
            date,
            hour,
            service,
            clientPhone: userInfo.phone,
          })
        );

        navigate(
          `/workers?service=${service}&address=${fullAddress}&date=${date}&hour=${hour}`
        );
      } else {
        toast.error("Te rugam sa adaugi toate informatiile");
      }
    } else {
      navigate("/");
    }
  };

  return (
    <>
      <motion.div
        initial={{ x: 200, y: -100 }}
        animate={{ x: 0, y: -100 }}
        transition={{
          type: "spring",
          bounce: 0.4,
          duration: 0.8,
        }}
        className="short:py-4 py-8 shadow-lg px-5 relative z-20 mx-4 rounded-md bg-white mb-10"
      >
        <div>
          <h1 className="text-2xl font-bold short2:px-2 short:text-base short:font-raleway ">
            Selecteaza data
          </h1>
          <p className="mb-4 text-darkGray font-raleway">
            Alege data si ora in care ai nevoie de ajutor.
          </p>
          <Calendar
            value={date}
            minDate={new Date()}
            showNeighboringMonth={false}
            view="month"
            onChange={(value) => setDate(new Date(value).toDateString())}
            prev2Label={null}
            next2Label={null}
          />
        </div>

        <div className="mt-10 relative font-raleway">
          <label
            htmlFor="hour"
            className="font-bold rounded-sm  
                    mb-4 ms-2 me-2"
          >
            Selecteaza ora:
          </label>

          <select
            name="hour"
            id="hour"
            required
            className="py-1.5 px-6
                    rounded-sm shadow-md bg-primary text-white font-semibold  focus:outline-none"
            onChange={(e) => setHour(parseInt(e.target.value))}
          >
            <option value="">hh/mm</option>
            {hoursArr.map((hour) => (
              <option
                key={hour}
                className={`font-semibold bg-white text-dark`}
                value={hour}
              >
                {hour}:00 {hour < 12 ? "AM" : "PM"}
              </option>
            ))}
          </select>
        </div>
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

        <input
          onClick={handleSubmit}
          type="submit"
          id="submit"
          name="submit"
          className="text-start text-white font-semibold
                font-raleway h-12 px-3 bg-dark rounded-sm me-4"
          value={"Cautare"}
        />
      </div>
    </>
  );
};

export default SelectDate;
