import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  useGetWorkerScheduleQuery,
  useSetWorkerScheduleMutation,
} from "../../slices/workers/workersApiSlice";
import { toast } from "react-toastify";
import Loader from "../../components/shared/Loader";
import ErrorMsg from "../../components/shared/ErrorMsg";
import Modal from "../../components/shared/Modal";

const ProgramPage = () => {
  const [selectedDates, setSelectedDates] = useState([]);
  const today = new Date();
  const nextDays = new Date();
  nextDays.setDate(today.getDate() + 30);

  const navigate = useNavigate();

  const {
    data,
    error: queryError,
    isLoading: queryLoading,
    refetch,
  } = useGetWorkerScheduleQuery();

  const [setWorkerSchedule, { isLoading, error }] =
    useSetWorkerScheduleMutation();

  useEffect(() => {
    if (data) {
      data.data.map((item) =>
        setSelectedDates((state) => [
          ...state,
          new Date(item.date).toLocaleDateString("en-US"),
        ])
      );
    }
    refetch();
  }, [data, refetch]);

  const months = {
    0: "Ianuarie",
    1: "Februarie",
    2: "Martie",
    3: "Aprilie",
    4: "Mai",
    5: "Iunie",
    6: "Iulie",
    7: "August",
    8: "Septembrie",
    9: "Octombrie",
    10: "Noiembrie",
    11: "Decembrie",
  };

  const getDatesInRage = (today, nextDays) => {
    const currentDate = new Date(today);
    const dates = [];

    while (currentDate <= nextDays) {
      dates.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + 1);
    }

    return dates;
  };

  const calendarDates = getDatesInRage(today, nextDays);

  const handleSelectDate = (e) => {
    if (selectedDates.includes(e.target.ariaLabel)) {
      setSelectedDates((state) => [
        ...state.filter((date) => date !== e.target.ariaLabel),
      ]);
    } else {
      setSelectedDates((state) => [...state, e.target.ariaLabel]);
    }
  };

  const handleSubmit = async () => {
    try {
      await setWorkerSchedule(selectedDates).unwrap();
      toast.success("Program salvat!");
      navigate("/worker");
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <>
      <div className="mx-5 short:mx-0 short:mb-10">
        <Modal>
          <h1 className="text-center font-bold text-2xl mb-6 short:text-lg short:mb-2">
            Selecteaza zilele in care esti disponibil
          </h1>
          {queryError && <ErrorMsg message={queryError} />}
          {error && <ErrorMsg message={error?.data?.message || error.error} />}

          <p className="ms-2  font-semibold text-darkGray font-raleway short:text-center">
            - Cel putin 14 zile
          </p>
          <p className="ms-2 mb-4 font-semibold text-darkGray font-raleway short:text-center">
            - Selecteaza cat mai multe zile pentru cat mai multe oportunitati
          </p>

          {queryLoading ? (
            <Loader />
          ) : (
            <div className="shadow-xl mb-4 border border-gray px-2 rounded-md font-raleway short:mb-0">
              <h1 className="text-center py-2 font-bold">
                {months[today.getMonth()]} - {months[nextDays.getMonth()]}
              </h1>
              <div
                className="flex text-center bg-orange text-white rounded-sm py-1
                        font-semibold text-sm"
              >
                <p className="w-11">Lun</p>
                <p className="w-11">Mar</p>
                <p className="w-11">Mie</p>
                <p className="w-11">Joi</p>
                <p className="w-11">Vin</p>
                <p className="w-11">Sam</p>
                <p className="w-11">Dum</p>
              </div>

              <div className="grid grid-cols-7 pb-2 font-semibold text-sm mt-2">
                {calendarDates &&
                  [...Array(calendarDates[0].getDay() - 1).keys()].map(
                    (num) => (
                      <div
                        key={num}
                        className="p-1 flex items-center justify-center"
                      ></div>
                    )
                  )}
                {calendarDates &&
                  calendarDates.map((date, idx) => (
                    <div
                      key={idx}
                      onClick={handleSelectDate}
                      aria-label={date.toLocaleDateString("en-US")}
                      className={`p-1 flex items-center justify-center pointer
                                ${idx === 0 && "bg-lightGray"} 
                                ${
                                  selectedDates.includes(
                                    date.toLocaleDateString("en-US")
                                  )
                                    ? "bg-pink text-white rou"
                                    : ""
                                }`}
                    >
                      {date.getDate()}
                    </div>
                  ))}
              </div>
            </div>
          )}
        </Modal>
      </div>

      {isLoading ? (
        <Loader />
      ) : (
        <div
          className="mt-auto absolute bottom-0 bg-white h-20
          short:py-1 w-full flex items-center justify-end"
        >
          <button
            onClick={() => navigate("/worker")}
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
              font-raleway h-12 px-3 bg-primary rounded-sm me-4"
            value={"Salveaza"}
          />
        </div>
      )}
    </>
  );
};

export default ProgramPage;
