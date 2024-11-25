import { Outlet } from "react-router-dom";
import Header from "./presentation/authentication-module/components/header";
import Footer from "./presentation/shared/components/custom-components/footer/footer";
import { MainContext } from "./presentation/shared/context/context";
import { useState } from "react";
import { Toaster } from "./presentation/shared/components/shadcn-components/components/ui/toaster";
import { getCookie } from "./presentation/shared/utils/cookie";
import Breadcrumb from "./presentation/shared/components/custom-components/ui/breadcrumb";

function App() {
  const [token, setToken] = useState(getCookie("safarCo:user_key"));
  const [openAuthenticateDialog, setOpenAuthenticateDialog] = useState(false);
  const [authenticateDialog, setAuthenticateDialog] = useState({
    login: true,
    loginPassword: false,
    confirmCode: false,
    changePassword: false,
    resetPassword: false,
  });
  const selectAuthenticateDialogContent = (
    login: boolean,
    loginPassword: boolean,
    confirmCode: boolean,
    changePassword: boolean,
    resetPassword: boolean
  ) => {
    setAuthenticateDialog({
      login,
      loginPassword,
      confirmCode,
      changePassword,
      resetPassword,
    });
  };

  return (
    <>
      <MainContext.Provider
        value={{
          openAuthenticateDialog,
          setOpenAuthenticateDialog,
          authenticateDialog,
          selectAuthenticateDialogContent,
          token,
          setToken,
        }}
      >
        <Header />

        <main className="container mx-auto mb-8 md:mb-14 mt-4 px-3 sm:px-1">
          <Breadcrumb className="mb-8 md:mb-12" />
          <Outlet />
        </main>
      </MainContext.Provider>
      <Footer />
      <Toaster />
    </>
  );
}

export default App;
