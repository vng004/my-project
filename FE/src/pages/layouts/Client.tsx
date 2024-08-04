import { Outlet, useLocation } from "react-router-dom";
import Footer from "../../components/Footer";
import Header from "../../components/Header";

const Client = () => {
  const location = useLocation();
  const hideHeaderPaths = ["/login", "/register","/forgot-password"]; 

  const shouldShowHeader = !hideHeaderPaths.includes(location.pathname);

  return (
    <div className="font-sans">
      {shouldShowHeader && <Header />}
      <Outlet />
      {shouldShowHeader && <Footer />}
    </div>
  );
};

export default Client;
