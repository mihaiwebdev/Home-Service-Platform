import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useLoginMutation } from "../slices/usersApiSlice";
import { setCredentials } from "../slices/authSlice";
import Loader from "../components/shared/Loader";
import { toast } from "react-toastify";
import Pattern from "../components/shared/Pattern";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [login, { isLoading }] = useLoginMutation();

  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (userInfo) {
      if (userInfo.role === "client") {
        navigate("/services");
      } else {
        navigate("/worker");
      }
    }
  }, [navigate, userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await login({ email, password }).unwrap();
      dispatch(setCredentials({ ...res }));
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <div className="h-100dvh text-center  flex flex-col items-center justify-end short:h-full short:pt-20">
      <div>
        <h1 className="font-bold text-2xl short2:text-xl">Loghează-te</h1>
        <p className="font-semibold font-raleway mt-2 px-4 short2:mt-0 short2:text-sm ">
          Conectăm persoanele cu experiență în treburile casnice și pe cei care
          au nevoie de ajutor.
        </p>
      </div>

      <form
        onSubmit={submitHandler}
        className="bg-primary pt-6 font-raleway text-white shadow-3xl rounded-t-3xl w-full mt-6 h-3/4 short:mt-4 short2:pb-24"
      >
        <div className="w-full z-20 max-w-3xl flex flex-col items-center mx-auto">
          <div className="flex flex-col items-start mt-3 w-5/6">
            <label htmlFor="email" className="font-semibold mb-1">
              Adresa ta email
            </label>
            <div className="w-full relative">
              <i className="fa-solid text-white fa-envelope absolute left-4 top-3.5"></i>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full placeholder-white bg-primary rounded-xs p-2.5 pl-10 focus:outline-none border border-third focus:border-pink"
                placeholder="Introdu email-ul"
              />
            </div>
          </div>

          <div className="flex flex-col items-start mt-3 w-5/6">
            <label htmlFor="password" className="font-semibold ">
              Parola
            </label>
            <div className="w-full relative">
              <i className="fa-solid text-white fa-lock absolute left-4 top-3.5"></i>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-primary placeholder-white rounded-xs p-2.5 pl-10 focus:outline-none border border-third focus:border-pink"
                placeholder="Introdu parola"
              />
            </div>
          </div>

          {isLoading ? (
            <Loader />
          ) : (
            <input
              type="submit"
              disabled={!email && !password ? true : false}
              className="disabled:opacity-75 z-20 mt-8 p-3 bg-orange text-dark font-semibold  w-5/6 rounded-full"
              value={"Continuă"}
            />
          )}

          <div className="flex  z-20 justify-between w-full px-10 mt-10">
            <Link to="/register" className="font-semibold underline">
              Înregistrează-te
            </Link>
            <Link to="/forgotpassword" className="font-semibold underline">
              Parolă uitată
            </Link>
          </div>
        </div>

        <Pattern />
      </form>
    </div>
  );
};

export default LoginPage;
