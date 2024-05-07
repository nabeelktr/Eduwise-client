"use client";
import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  AiOutlineEye,
  AiOutlineEyeInvisible,
  AiFillGithub,
} from "react-icons/ai";
import { FcGoogle } from "react-icons/fc";
import { styles } from "../styles/style";
import { useLoginMutation } from "../../redux/features/auth/authApi";
import { toast } from "sonner";
import { signIn } from "next-auth/react";

type Props = {
  setRoute: (route: string) => void;
  setOpen: (open: boolean) => void;
};
const passwordRules = /^(?=.*[a-z])(?=.*[A-Z])/;
const passwordNumberRule = /(?=.*[0-9])/;

const schema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email")
    .required("Please enter your email"),
  password: Yup.string()
    .min(8)
    .matches(passwordRules, {
      message: "Requires a combination of uppercase and lowercase letters.",
    })
    .matches(passwordNumberRule, { message: "At least one number (0-9)." })
    .required("Please enter your password"),
});

const Login: React.FC<Props> = ({ setRoute, setOpen }) => {
  const [show, setshow] = useState(false);
  const [login, { isSuccess, error, isLoading }] = useLoginMutation();

  const formik = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema: schema,
    onSubmit: async ({ email, password }) => {
      await login({ email, password });
    },
  });

  useEffect(() => {
    if (isSuccess) {
      setOpen(false);
      toast.success("Login successful!");
    }
    if (error) {
      if ("data" in error) {
        const errorData = error as any;
        toast.error(errorData.data.message);
      }
    }
  }, [error, isSuccess]);

  const { errors, touched, values, handleChange, handleSubmit } = formik;
  return (
    <div className="w-full text-black">
      <h1
        className={`${styles.title} mb-6 mt-5 text-2xl uppercase tracking-wider`}
      >
        Log In
      </h1>
      <form onSubmit={handleSubmit} className="px-8">
        <label className={`${styles.label} `}>Email</label>
        <input
          type="email"
          name="email"
          value={values.email}
          onChange={handleChange}
          id="email"
          placeholder="eduwise@gmail.com"
          className={`${
            errors.email && touched.email && "border-red-500"
          } ${styles.input} text-sm`}
        />
        {errors.email && touched.email && (
          <span className="block pt-1 text-sm text-red-500">
            {errors.email}
          </span>
        )}

        <div className="relative mt-5 w-full">
          <label className={`${styles.label} `}>Password</label>
          <input
            type={!show ? "password" : "text"}
            name="password"
            value={values.password}
            onChange={handleChange}
            id="password"
            placeholder="Eduwise@2024"
            className={`${
              errors.password && touched.password && "border-red-500"
            } ${styles.input} text-sm`}
          />
          {!show ? (
            <AiOutlineEyeInvisible
              size={20}
              className="z-1 absolute bottom-3 right-2 cursor-pointer"
              onClick={() => setshow(true)}
            />
          ) : (
            <AiOutlineEye
              size={20}
              className="z-1 absolute bottom-3 right-2 cursor-pointer"
              onClick={() => setshow(false)}
            />
          )}
        </div>
        {errors.password && touched.password && (
          <span className="block pt-1 text-sm text-red-500">
            {errors.password}
          </span>
        )}

        <div className="mt-10 w-full">
          <input
            type="submit"
            value="Login"
            className={`${styles.button} py-3 font-thin text-white `}
          />
        </div>
        <br />

        <h5 className="pt-4 text-center font-Poppins text-sm text-black ">
          Or join with
        </h5>

        <div className="my-3 flex items-center justify-center">
          <FcGoogle
            size={30}
            className="mr-2 cursor-pointer"
            onClick={() => signIn("google")}
          />
          <AiFillGithub
            size={30}
            className="ml-2 cursor-pointer"
            onClick={() => signIn("github")}
          />
        </div>

        <h5 className="pt-4 text-center font-Poppins text-[14px]">
          Not have any account?{" "}
          <span
            className="cursor-pointer pl-1 text-[#2190ff]"
            onClick={() => setRoute("SignUp")}
          >
            Sign up
          </span>
        </h5>
      </form>
      <br />
    </div>
  );
};

export default Login;
