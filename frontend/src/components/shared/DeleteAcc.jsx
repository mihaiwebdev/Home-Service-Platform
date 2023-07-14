import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Modal from "./Modal";
import { useDeleteUserMutation } from "../../slices/usersApiSlice";
import { clearCredentials } from "../../slices/authSlice";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import Loader from "./Loader";

const DeleteAcc = () => {
  const [confirm, setConfirm] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();

  const [deleteUser, { isLoading }] = useDeleteUserMutation();

  const handleDelete = async (e) => {
    e.preventDefault();

    if (confirm !== "confirm") {
      toast.error(`A-ti scris "${confirm}" in loc de "confirm"`);
    } else {
      try {
        await deleteUser().unwrap();
        dispatch(clearCredentials());
        navigate("/");
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }

    console.log("submit");
  };

  return (
    <Modal
      extraClass={
        location.hash === "#deleteuser" ? "overflow-hidden" : "hidden"
      }
    >
      <h1 className="font-bold text-2xl mb-4 text-center short:text-xl">
        Doriti sa va stergeti contul?
      </h1>
      <p className="font-semibold font-raleway text-darkGray">
        Pentru a va sterge permanent contul scrie-ti in casuta de mai jos:{" "}
        <span className="italic">confirm</span>
      </p>

      <div className="flex flex-col mt-2 w-full font-raleway">
        <input
          type="text"
          value={confirm}
          className="border border-gray p-2 rounded-xs
                pl-4 focus:outline-none"
          placeholder='"confirm"'
          onChange={(e) => setConfirm(e.target.value)}
        />

        <div className="flex justify-between items-center mt-6 mb-8 ">
          <button
            className="px-3 mr-4 py-2.5 tracking-wide text-sm bg-gray
                     text-dark w-2/4 font-bold rounded-full shadow-xl"
            onClick={() => navigate(-1)}
          >
            Anulati
          </button>

          {isLoading ? (
            <Loader />
          ) : (
            <button
              onClick={handleDelete}
              className="px-3 py-2.5 tracking-wide text-sm bg-red
                     text-white w-2/4 font-bold rounded-full shadow-xl"
            >
              Stergeti
            </button>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default DeleteAcc;
