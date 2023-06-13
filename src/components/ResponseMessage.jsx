import { useNavigate } from "react-router-dom";
import { logout } from "../api/auth";
const ResponseMessage = (response) => {
  const navigate = useNavigate();
  const { data } = response;

  const nextDestination = () => {
    if (data.status == true) {
      logout();
      navigate("/");
    } else {
      navigate(0);
    }
  };
  return (
    <>
      {/* Message Title */}

      <img
        className="pb-2 m-auto h-[50px] drop-shadow  "
        src="https://i.ibb.co/FX09L8t/unnamed-removebg-preview.png"
        alt="Bayad Center Logo"
      />

      <h2 className="text-white drop-shadow text-3xl font-bold text-center pb-10">{data.title}</h2>

      {data.amount && (
        <>
          <h2 className=" drop-shadow-lg text-2xl font-medium  text-center pb-1">
            Current balance
          </h2>
          <h2 className="  drop-shadow-lg  text-4xl font-bold text-center min-w-[290px] ">
            {`₱ ${Number(data.amount).toLocaleString("en", {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}`}
          </h2>
        </>
      )}

      <h2 className="text-white drop-shadow-lg text-2xl font-bold text-center pb-10">
        {data.message}
      </h2>

      {/* label and balacne */}

      <div className="grid place-items-center">
        <button
          type="button"
          onClick={() => {
            nextDestination();
          }}
          className=" text-white bg-[#0076c0] hover:bg-[#005183] focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-lg px-3 py-2.5 text-center w-[10rem] "
        >
          <span className="align-top">Ok</span>
        </button>
      </div>
    </>
  );
};

export default ResponseMessage;
