import { useQuery } from "react-query";
import { useNavigate } from "react-router-dom";
import { getBalance } from "../api/cws_endpoints";
import { useState, useEffect } from "react";
import LoadingView from "../components/Loading";

export default function Balance() {
  const navigate = useNavigate();
  const [balance, setBalance] = useState(0);
  const [loading, setLoading] = useState(true);

  const fetchBalance = async () => {
    setLoading(true);
    const options = {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    };

    const response = await getBalance();
    const formatted = Number(response.data.amount).toLocaleString("en", options);

    setBalance(formatted);
    setLoading(false);
  };

  useEffect(() => {
    fetchBalance();
  }, []);

  return (
    <>
      <div
        className={`min-h-screen flex items-center justify-center ${
          loading ? "bg-white" : "bg-green-400"
        } md:bg-white`}
      >
        <div
          className={`${
            loading ? "bg-white" : "bg-green-400"
          } grid-container grid content-center md:h-[430px]  sm:max-w-3xl rounded-[1rem] overflow-hidden md:shadow-lg p-10 w-screen `}
        >
          <div className="grid-container grid content-center">
            {loading === true && (
              <div className="place-self-center">
                <LoadingView />
              </div>
            )}

            {loading === false && (
              <>
                <h2 className="drop-shadow-md mb-4 text-2xl font-medium text-white text-center ">
                  Your current balance is
                </h2>

                <div className=" ">
                  <h2 className=" drop-shadow-lg  mb-4 text-4xl font-bold text-white text-center min-w-[290px]">
                    {`₱ ${balance}`}
                  </h2>
                </div>
                <div className=" flex flex-col items-center justify-center">
                  <button
                    type="button"
                    onClick={() => {
                      navigate("/menu");
                    }}
                    className=" mt-7 text-white bg-[#0076c0] hover:bg-[#005183] focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-lg px-5 py-2.5 text-center "
                  >
                    <div className="flex justify-center	gap-2 items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="w-10 h-10"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18"
                        />
                      </svg>

                      <span className="align-top">Back</span>
                    </div>
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
