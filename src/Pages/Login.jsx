import React from "react";
import { Form, Link, redirect, useNavigate } from "react-router-dom";
import FormInput from "../Components/FormInput";
import SubmitBtn from "../Components/SubmitBtn";
import { useDispatch } from "react-redux";
import { loginUser } from "../features/user/userSlice";
import { customFetch } from "../util";
import { toast } from "react-toastify";

export const action =
  (store) =>
  async ({ request }) => {
    //console.log("login action store value is ",store);

    const formData = await request.formData();
    const data = Object.fromEntries(formData);
    try {
      const response = await customFetch.post("/auth/local", data);

      store.dispatch(loginUser(response.data));
      toast.success("logged in successfully");
      return redirect("/");
    } catch (error) {
      console.log(error);
      const errorMessage =
        error?.response?.data?.error?.message ||
        "please double check your credentials";

      toast.error(errorMessage);
      return null;
    }
  };

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  async function loginAsGuestUser() {
    try {
      const response = await customFetch.post("/auth/local", {
        identifier: "test@test.com",
        password: "secret",
      });
      dispatch(loginUser(response.data));
      toast.success("welcome guest user");
      navigate("/");
    } catch (error) {
      console.log(error);
      toast.error("guest user login error.please try later.");
    }
  }

  return (
    <section className="h-screen grid place-items-center">
      <Form
        className="card w-96 p-8 bg-base-100 shadow-lg flex flex-col gap-y-4"
        method="post"
      >
        <h4 className="text-center text-3xl font-bold">LOGIN</h4>
        <FormInput
          type="email"
          name="identifier"
          // defaultValue="test@test.com"
          label="email"
        />
        <FormInput
          label="password"
          type="password"
          // defaultValue="secret"
          name="password"
        />
        <div className="mt-4">
          <SubmitBtn text="login" />
        </div>

        <button
          type="button"
          className="btn btn-secondary btn-block"
          onClick={loginAsGuestUser}
        >
          guest user
        </button>
        <p className="text-center">
          Not a member yet?
          <Link
            className="ml-2 link link-hover link-primary capitalize"
            to="/register"
          >
            register
          </Link>
        </p>
      </Form>
    </section>
  );
}

export default Login;
