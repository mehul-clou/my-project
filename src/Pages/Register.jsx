import React from "react";
import { Form, Link, redirect } from "react-router-dom";
import FormInput from "../Components/FormInput";
import SubmitBtn from "../Components/SubmitBtn";
import { customFetch } from "../util";
import { toast } from "react-toastify";

export async function action({ request }) {
  const formData = await request.formData();
  //console.log('formdata in register',...formData);
  
  const data = Object.fromEntries(formData);
  //console.log("register action data", data);
  

  try {
    const request = await customFetch.post("/auth/local/register", data);
    toast.success("account created successfully");
    return redirect("/");
  } catch (error) {
    const errorMessage =
      error?.response?.data?.error?.message ||
      "please double check your credentials";

    toast.error(errorMessage);
    return null;
  }
}

function Register() {
  return (
    <section className="h-screen grid place-items-center">
      <Form
        method="POST"
        className="card w-96 p-8 bg-base-100 shadow-lg flex flex-col gap-y-4"
      >
        <h4 className="text-center text-3xl font-bold">Register</h4>
        <FormInput
          type="text"
          name="username"
          label="username"
          defaultValue="jamessmith3"
        />
        <FormInput
          type="email"
          name="email"
          label="email"
          defaultValue="james3@gmail.com"
        />
        <FormInput
          type="password"
          name="password"
          label="password"
          defaultValue="secret"
        />

        <div className="mt-4">
          <SubmitBtn text="Register" />
        </div>

        <p className="text-center">
          Already a member?
          <Link
            to="/login"
            className="ml-2 link link-hover link-primary capitalize"
          >
            login
          </Link>
        </p>
      </Form>
    </section>
  );
}

export default Register;
