import { useState } from "react";
import Modal from "../../components/shared/Modal";
import { useNavigate, useLocation } from "react-router-dom";
import { useCreateReviewMutation } from "../../slices/workers/workersApiSlice";
import { useSelector } from "react-redux";
import Loader from "../../components/shared/Loader";
import { toast } from "react-toastify";

const ReviewPage = () => {
  const [text, setText] = useState("");
  const [rating, setRating] = useState("5");

  const navigate = useNavigate();
  const location = useLocation();
  const id = location.pathname.split("orders/")[1].split("/")[0];

  const [createReview, { isLoading }] = useCreateReviewMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (id) {
      const res = await createReview({
        text,
        rating: +rating,
        contractId: id,
      });

      if (res.error) {
        console.log(res.error);
        toast.error("Ai adaugat deja un review persoanei");
        navigate("/services");
      } else if (res.data.success) {
        toast.success("Review adaugat cu success!");
        navigate("/services");
      }
    }
  };

  return (
    <Modal>
      <>
        <div className="relative w-full mb-4">
          <i
            onClick={() => navigate("/orders")}
            className="fa-solid
                bg-lime rounded-full py-2 px-3 fa-chevron-left absolute left-2 "
          ></i>

          <h1 className="text-center font-bold text-xl">
            <span>Adauga review</span>
          </h1>
        </div>

        <form className="w-full" onSubmit={handleSubmit}>
          <div className="flex flex-col">
            <label htmlFor="message" className="font-semibold text-lg mt-4">
              Text:
            </label>
            <textarea
              name="message"
              id="message"
              cols="30"
              rows="4"
              className="bg-limeMatch rounded-sm p-2 outline-none
            focus-within:shadow-lg focus:outline-limeMatch"
              placeholder="Scrie un review"
              value={text}
              onChange={(e) => setText(e.target.value)}
            ></textarea>
          </div>

          <div className="mt-6">
            <label htmlFor="rating" className="font-semibold text-lg mr-2">
              Rating:
            </label>
            <i className="fas fa-star" style={{ color: "#ffea00" }}></i>
            <select
              name="rating"
              id="rating"
              className="font-semibold text-lg"
              value={rating}
              onChange={(e) => setRating(e.target.value)}
            >
              <option value="5">5</option>
              <option value="4">4</option>
              <option value="3">3</option>
              <option value="2">2</option>
              <option value="1">1</option>
            </select>
          </div>

          {isLoading ? (
            <Loader />
          ) : (
            <input
              type="submit"
              className="py-2 px-4 w-full bg-lime rounded-sm mt-4 font-semibold"
              value={"Trimite"}
            />
          )}
        </form>
      </>
    </Modal>
  );
};

export default ReviewPage;
