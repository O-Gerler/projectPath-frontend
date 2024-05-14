import { Outlet } from "react-router-dom";
import Logo from "../components/Logo";
import { ToastContainer } from "react-toastify";

const AuthLayout = () => {
  return (
    <>
      <div className="bg-gray-800 min-h-screen">
        <div className="py-10 lg:py-20 mx-auto max-w-[450px] px-2 sm:px-0">
          <Logo />
          <div className="mt-10">
            <Outlet />
          </div>
        </div>
      </div>

      <ToastContainer
        pauseOnHover={true}
        pauseOnFocusLoss={false}
        autoClose={3000}
      />
    </>
  );
};

export default AuthLayout;
