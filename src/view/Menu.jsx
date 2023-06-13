import { useNavigate } from "react-router-dom";
import { logout } from "../api/auth";
export default function Menu() {
  const navigate = useNavigate();

  return (
    <>
      <section className="min-h-screen flex items-center justify-center md:bg-gray-100 bg-white">
        <div className="bg-white grid-container grid content-center md:h-[430px]  sm:max-w-3xl rounded-[1rem] overflow-hidden md:shadow-lg p-10 w-screen ">
          <div className=" md:place-self-center   min-w-[240px]">
            <img
              className="mx-auto h-20 "
              src="https://play-lh.googleusercontent.com/-7lblvMOnlqe4CHkgFXj8pJMExM5K5bmt-9TTlCXn2TryOA3nYPz8Hrc0a08p7X3Hw"
              alt="Bayad Center Logo"
            />
            <div className="mt-4">
              <h2 className=" mb-4 text-2xl font-semibold text-gray-900 text-center ">
                Please choose to continue
              </h2>
            </div>

            <div className=" ">
              <form action="#">
                <div className="grid gap-2.5  ">
                  <button
                    onClick={() => {
                      navigate("/balance-inquiry");
                    }}
                    type="button"
                    className="text-white  bg-green-500 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-lg  px-5 py-2.5 text-center w-full"
                  >
                    <div className="flex justify-center	gap-2 items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                        />
                      </svg>

                      <span className="align-top">Balance Inquiry</span>
                    </div>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      navigate("/withdraw");
                    }}
                    className="text-white bg-[#0076c0] hover:bg-[#005183] focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-lg px-5 py-2.5 text-center w-full"
                  >
                    <div className="flex justify-center	gap-2 items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z"
                        />
                      </svg>

                      <span className="align-top">Get Cash</span>
                    </div>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      navigate("/deposit");
                    }}
                    className="text-white bg-[#0076c0] hover:bg-[#005183] focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-lg px-5 py-2.5 text-center w-full "
                  >
                    <div className="flex justify-center	gap-2 items-center">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3"
                        />
                      </svg>
                      <span className="align-top">Deposit</span>
                    </div>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      logout();
                      navigate("/");
                    }}
                    className="text-white bg-gray-400 hover:bg-gray-500 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-lg px-5 py-2.5 text-center w-full "
                  >
                    <div className="flex justify-center	gap-2 items-center">
                      <svg
                        aria-hidden="true"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-6 h-6"
                      >
                        <path
                          d="M6 18L18 6M6 6l12 12"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></path>
                      </svg>
                      <span className="align-top">Cancel</span>
                    </div>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
