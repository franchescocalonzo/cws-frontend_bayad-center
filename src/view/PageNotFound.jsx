import { useNavigate } from "react-router-dom";
export default function PageNotFound() {
  const navigate = useNavigate();
  return (
    <div className="grid-container grid content-center ">
      <div className="mx-auto">
        <div className="mt-[50%]  bg-white py-24 px-6 sm:py-32 lg:px-8">
          <div className="text-center">
            <div className="pb-1 ">
              <img
                className="pb-2 m-auto h-[50px] drop-shadow  "
                src="https://i.ibb.co/FX09L8t/unnamed-removebg-preview.png"
                alt="Bayad Center Logo"
              />
            </div>
            <p className="text-md font-semibold text-[#F26122]">404</p>
            <h1 className="mt-1 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
              Page not found
            </h1>
            <p className="mt-6 text-base leading-7 text-gray-600">
              Sorry, we couldn’t find the page you’re looking for.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <a
                href="#"
                onClick={() => {
                  navigate("/");
                }}
                className="pb-3 rounded-md bg-[#F26122] px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-[#c54f1c] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Go back to login
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
