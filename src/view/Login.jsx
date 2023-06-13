import { useState } from "react";
import { useMutation } from "react-query";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { useNavigate, Navigate } from "react-router-dom";

import { validatePin } from "../api/cws_endpoints";
import { keyListener } from "../utils/keyListener";
import { userValidated } from "../api/auth";
import LoadingView from "../components/Loading";
import { isAuthenticated } from "../api/auth";
import { useEffect } from "react";

const schema = yup.object({
  pin_1: yup.number().required(),
  pin_2: yup.number().required(),
  pin_3: yup.number().required(),
  pin_4: yup.number().required(),
  pin_5: yup.number().required(),
  pin_6: yup.number().required(),
});

const errTextField =
  "bg-red-50 border border-red-500 text-red-900 placeholder-red-700 text-2xl  focus:ring-red-500  focus:border-red-500  rounded-lg w-[40px] p-2.5 text-2xl";
const defaultTextField =
  "bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-300 focus:border-blue-300   w-[40px] p-2.5 text-2xl";

export default function Login() {
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState();
  const [authStatus, setAuthStatus] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    formState: { trigger, errors, isDirty, isValid },
  } = useForm({ mode: "onChange", resolver: yupResolver(schema) });

  const doValidate = async (data) => {
    console.log("Final Value of PIN:", data);
    const res = await validatePin(data);
    return res;
  };

  const processPinStatus = (data) => {
    const { status, title, message } = data;
    console.log("Processing pin status: ", status);

    if (status) {
      userValidated();
      navigate("/menu");
    } else {
      setErrorMessage({ title: title, message: message });
    }
  };

  // handles the response of the 'do validate' function
  const validate = useMutation(doValidate, {
    onSuccess: (response) => {
      // console.log("On success response:", response);
      // console.log("Pin Status?", response.data.pin_status);

      processPinStatus(response.data);
    },
    onError: (response) => {
      alert("Api: Error");
      console.log(response);
    },
    onSettled: () => {
      console.log("API call settled.");
    },
  });

  const mergedPin = (form_data) => {
    // Get ONLY the values of object(key and value)
    const values = Object.values(form_data);
    // From int array converted to string array
    const stringArray = values.map(String);
    // Reversed the string, to correct the position
    const pinReversed = stringArray.reverse();
    // Merge the String array as one string
    const joined = pinReversed.join();
    // Removed all the comma from the string
    const pinString = joined.replaceAll(",", "");
    // Revert the data type to Integer
    const pin = Number(pinString);
    return pin;
  };

  const checkAuthStatus = async () => {
    const status = isAuthenticated();
    setAuthStatus(status);
  };

  const handleChange = (e) => {
    const { maxLength, value, name } = e.target;

    if (name == "pin_6") {
      if (isDirty || isValid) {
        document.getElementById("pin_6").blur();
        handleSubmit(onSubmit)();
      }
    }

    if (value.length >= maxLength && name !== "pin_6") {
      e.target.nextSibling.focus();
    }

    if (e.target.value === "" && errorMessage) {
      console.log("wala nang laman");
      // document.querySelector(`input[id="pin_1]`).focus();
      setErrorMessage(undefined);
    }
  };

  useEffect(() => {
    checkAuthStatus();
  }, []);

  function onSubmit(formData) {
    //form data has all the values from the 6 inputs
    validate.mutate(mergedPin(formData));
  }

  return (
    <div className="h-screen flex items-center justify-center  md:bg-gray-100 bg-white">
      <div className=" sm:max-w-3xl rounded-[1rem] overflow-hidden md:shadow-lg p-10 w-screen bg-white">
        <div className="grid-container grid content-center grid-row-2 md:grid-cols-2 gap-7 md:gap-0 md:h-[430px]">
          {validate.isLoading === true && (
            <div className="place-self-center md:col-span-2 ">
              <LoadingView />
            </div>
          )}
          {authStatus && <Navigate to="/menu" replace={true} />}
          {validate.isLoading === false && (
            <>
              <picture className="md:place-self-center md:order-2 ">
                <img
                  className="mx-auto h-32 md:h-60"
                  src="https://newsbytes.ph/wp-content/uploads/2021/01/BAYAD-LOGO.png"
                  alt="Bayad Center Logo"
                />
              </picture>
              <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col items-center md:col-span-1 md:order-1 md:place-self-center"
              >
                <h2 className="text-center text-2xl font-bold tracking-tight text-gray-900 mb-4 ">
                  Enter your 6 Digit Pin
                </h2>
                <div className="flex justify-center gap-3 ">
                  <input
                    type="password"
                    id="pin_1"
                    maxLength="1"
                    className={errorMessage ? errTextField : defaultTextField}
                    required
                    {...register("pin_1", {
                      onChange: (e) => {
                        handleChange(e);
                      },
                    })}
                    onKeyDown={keyListener}
                    inputMode="numeric"
                  />
                  <input
                    type="password"
                    id="pin_2"
                    maxLength="1"
                    className={errorMessage ? errTextField : defaultTextField}
                    required
                    {...register("pin_2", {
                      onChange: (e) => {
                        handleChange(e);
                      },
                    })}
                    onKeyDown={keyListener}
                    inputMode="numeric"
                    onChange={handleChange}
                  />
                  <input
                    type="password"
                    id="pin_3"
                    maxLength="1"
                    className={errorMessage ? errTextField : defaultTextField}
                    required
                    inputMode="numeric"
                    {...register("pin_3", {
                      onChange: (e) => {
                        handleChange(e);
                      },
                    })}
                    onKeyDown={keyListener}
                    onChange={handleChange}
                  />
                  <input
                    type="password"
                    id="pin_4"
                    maxLength="1"
                    inputMode="numeric"
                    className={errorMessage ? errTextField : defaultTextField}
                    required
                    {...register("pin_4", {
                      onChange: (e) => {
                        handleChange(e);
                      },
                    })}
                    onKeyDown={keyListener}
                    onChange={handleChange}
                  />
                  <input
                    type="password"
                    id="pin_5"
                    maxLength="1"
                    inputMode="numeric"
                    className={errorMessage ? errTextField : defaultTextField}
                    required
                    {...register("pin_5", {
                      onChange: (e) => {
                        handleChange(e);
                      },
                    })}
                    onKeyDown={keyListener}
                    onChange={handleChange}
                  />
                  <input
                    type="password"
                    id="pin_6"
                    inputMode="numeric"
                    onKeyDown={keyListener}
                    maxLength="1"
                    className={errorMessage ? errTextField : defaultTextField}
                    required
                    {...register("pin_6", {
                      onChange: (e) => {
                        handleChange(e);
                      },
                    })}
                    onChange={handleChange}
                  />
                </div>
                {errorMessage && (
                  <p className="mt-2 text-sm text-red-600 dark:text-red-500">
                    <span className="font-medium">Oh, snapp!</span> Wrong pin code
                  </p>
                )}

                <button
                  disabled={!isDirty || !isValid}
                  type="submit"
                  id="submitBtn"
                  className={`text-white  bg-[#0076c0] hover:bg-[#005183] focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-lg px-5 py-2.5 text-center w-full mt-7 disabled:bg-blue-400 disabled:dark:bg-blue-500`}
                >
                  Enter
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
