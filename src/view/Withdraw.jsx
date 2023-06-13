import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useMutation } from "react-query";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

import api from "../api/cws_endpoints";
import ResponseMessage from "../components/ResponseMessage";
import LoadingView from "../components/Loading";
import { keyListener } from "../utils/keyListener";

const schema = yup
  .object({
    amount: yup.number().required(),
  })
  .required();

export default function Withdraw() {
  const [bgColor, setBgColor] = useState("bg-white");
  const [dataResponse, setDataResponse] = useState();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isValid },
  } = useForm({ resolver: yupResolver(schema) });

  const doWithdraw = async (data) => {
    const { amount } = data;
    const res = await api.doWithdraw(amount);
    return res;
  };

  const responseAnalyzer = (data) => {
    setDataResponse(data);
    if (data.status === false) {
      setBgColor("bg-[#f54e4e]");
    } else {
      setBgColor("bg-green-400");
    }
  };

  // handles the response of the 'do withdraw' function
  const withdraw = useMutation(doWithdraw, {
    onSuccess: (response) => {
      console.log("On success response:", response.data);
      responseAnalyzer(response.data);
      // console.log("Pin Status?", response.data.pin_status);
    },
    onError: (response) => {
      alert("Internal Error. Please contact server admin.");
      navigate("/");
      console.log(response);
    },
    onSettled: () => {
      console.log("API call settled.");
    },
  });

  function onSubmit(formData) {
    console.log("Submitting..");
    withdraw.mutate(formData);
  }

  return (
    <>
      <div className={`min-h-screen flex items-center justify-center md:bg-gray-100  ${bgColor}`}>
        <div
          className={`${bgColor} grid-container grid content-center  md:h-[430px]  sm:max-w-3xl rounded-[1rem] overflow-hidden md:shadow-lg p-10 w-screen `}
        >
          <div>
            {!dataResponse && !withdraw.isLoading && (
              <button
                type="button"
                onClick={() => {
                  navigate("/menu");
                }}
                className="top-10 absolute md:top-auto md:inline text-gray-400  hover:bg-gray-400 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-lg py-2 px-3 text-center inline-flex items-center"
              >
                <div className="flex justify-center	 items-center">
                  <svg
                    aria-hidden="true"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6 "
                  >
                    <path
                      d="M15.75 19.5L8.25 12l7.5-7.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>
                  </svg>
                  <span className="align-top">Back</span>
                </div>

                <span className="sr-only">Back </span>
              </button>
            )}
          </div>
          <div className=" place-self-center ">
            {withdraw.isLoading == true && <LoadingView />}
            {dataResponse && <ResponseMessage data={dataResponse} />}
            {withdraw.isLoading === false && !dataResponse && (
              <div>
                <img
                  className="mx-auto h-20 "
                  src="https://play-lh.googleusercontent.com/-7lblvMOnlqe4CHkgFXj8pJMExM5K5bmt-9TTlCXn2TryOA3nYPz8Hrc0a08p7X3Hw"
                  alt="Bayad Center Logo"
                />
                <h2 className="mb-7 text-2xl font-medium text-center  mt-3  ">Withdraw</h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <h2 className=" text-3xl font-medium text-center text-gray-600 ">Enter Amount</h2>

                  <div className="w-[12rem]">
                    <div className="relative mb-1">
                      <div className="absolute text-4xl font-bold inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        ₱
                      </div>
                      <input
                        type="text"
                        maxLength="5"
                        id="amount"
                        inputMode="numeric"
                        onKeyDown={keyListener}
                        {...register("amount")}
                        className="text-4xl pl-12	block font-bold block w-full p-4 text-gray-900 border-b-2 border-gray-300  bg-transparent text-md  outlinefocus:outline-offset-5  outline outline-0 focus:outline-0 focus:border-blue-500"
                      />
                    </div>
                  </div>

                  <div>
                    <button
                      type="submit"
                      className=" mt-7 text-white bg-[#FFC719] hover:bg-[#ca9d15] focus:outline-none focus:ring-4 focus:ring-[#ffec45] font-medium rounded-full text-lg px-5 py-2.5 text-center w-full "
                    >
                      <div className="flex justify-center	gap-2 items-center">
                        <span className="align-top">Proceed</span>
                        <svg
                          aria-hidden="true"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6"
                        >
                          <path
                            d="M8.25 4.5l7.5 7.5-7.5 7.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          ></path>
                        </svg>
                      </div>
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
