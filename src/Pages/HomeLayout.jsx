import React from "react";
import Header from "../Components/Header";
import { Outlet, useNavigation } from "react-router-dom";
import Navbar from "../Components/Navbar";
import { Loading } from "../Components";

function HomeLayout() {
  const navigation = useNavigation();

  const isPageLoading = navigation.state === "loading";

  return (
    <>
      <Header />
      <Navbar />
      
      {isPageLoading ? (
        <Loading />
      ) : (
        <section className="align-element py-20">
          <Outlet />
        </section>
      )}
    </>
  );
}

export default HomeLayout;
