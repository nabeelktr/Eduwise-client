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
import { useRegisterMutation } from "../../redux/features/auth/authApi";
import { toast } from "sonner";
import { useDispatch } from "react-redux";
import { UserData } from "../../redux/features/auth/authSlice";

type Props = {
  setRoute: (route: string) => void;
};
const passwordRules = /^(?=.*[a-z])(?=.*[A-Z])/;
const passwordNumberRule = /(?=.*[0-9])/;

const schema = Yup.object().shape({
  name: Yup.string()
    .max(30)
    .test(
      "no-leading-unusual-spaces",
      "Name should not have unusual spaces at the beginning",
      (value) => {
        if (typeof value === "string") {
          return !value.match(/^\s/);
        }
        return true;
      }
    )
    .required("Please enter your name"),
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

const SignUp: React.FC<Props> = ({ setRoute }) => {
  const [show, setshow] = useState(false);
  const [register, { data, error, isSuccess }] = useRegisterMutation();
  const promise = () => new Promise((resolve) => setTimeout(resolve, 2000));
  const dispatch = useDispatch();

  useEffect(() => {
    if (isSuccess) {
      const message = data?.message || "Registration Successful";
      // toast.success(message)
      toast.promise(promise, {
        loading: "OTP Sending...",
        success: () => {
          return `OTP was send to your email address`;
        },
        position: "top-center",
        error: "Error",
      });
      setRoute("Verification");
    }
    if (error) {
      if ("data" in error) {
        const errorData = error as any;
        toast.error(errorData.data.message.details);
      }
    }
  }, [isSuccess, error]);

  const formik = useFormik({
    initialValues: { name: "", email: "", password: "" },
    validationSchema: schema,
    onSubmit: async ({ name, email, password }) => {
      const data = {
        name,
        email,
        password,
      };
      dispatch(
        UserData({
          email,
          password,
          name,
        })
      );
      await register(data);
    },
  });

  const { errors, touched, values, handleChange, handleSubmit } = formik;
  return (
    <div className="w-full">
      <h1 className={`${styles.title} text-xl`}>Sign up</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className={`${styles.label} `}>Name</label>
          <input
            type="text"
            name="name"
            value={values.name}
            onChange={handleChange}
            id="name"
            placeholder="Enter your name"
            className={`${errors.name && touched.name && "border-red-500"} ${
              styles.input
            } text-sm`}
          />
          {errors.name && touched.name && (
            <span className="text-red-500 pt-1 block text-sm">
              {errors.name}
            </span>
          )}
        </div>

        <label className={`${styles.label}`}>Email</label>
        <input
          type="email"
          name="email"
          value={values.email}
          onChange={handleChange}
          id="email"
          placeholder="Enter your email"
          className={`${errors.email && touched.email && "border-red-500"} ${
            styles.input
          } text-sm`}
        />
        {errors.email && touched.email && (
          <span className="text-red-500 pt-1 text-sm block">
            {errors.email}
          </span>
        )}

        <div className="w-full mt-5 relative">
          <label className={`${styles.label} `}>Password</label>
          <input
            type={!show ? "password" : "text"}
            name="password"
            value={values.password}
            onChange={handleChange}
            id="password"
            placeholder="Enter your password"
            className={`${
              errors.password && touched.password && "border-red-500"
            } ${styles.input} text-sm`}
          />
          {!show ? (
            <AiOutlineEyeInvisible
              size={20}
              className="absolute bottom-3 right-2 z-1 cursor-pointer"
              onClick={() => setshow(true)}
            />
          ) : (
            <AiOutlineEye
              size={20}
              className="absolute bottom-3 right-2 z-1 cursor-pointer"
              onClick={() => setshow(false)}
            />
          )}
        </div>
        {errors.password && touched.password && (
          <span className="text-red-500 pt-1 text-sm block">
            {errors.password}
          </span>
        )}
        <p className="text-xs mt-1 text-gray-600 ml-2">
          - Uppercase letters (A-Z)
        </p>
        <p className="text-xs text-gray-600 ml-2">- Lowercase letters (a-z)</p>
        <p className="text-xs text-gray-600 ml-2">- Numbers (0-9)</p>

        <div className="w-full mt-5">
          <input
            type="submit"
            value="Sign Up"
            className={`${styles.button} text-white`}
          />
        </div>
        <br />

        <h5 className="text-center pt-4 font-Poppins text-sm text-black dark:text-white">
          Or join with
        </h5>

        <div className="flex items-center justify-center my-3">
          <FcGoogle size={30} className="cursor-pointer mr-2" />
          <AiFillGithub size={30} className="cursor-pointer ml-2" />
        </div>

        <h5 className="text-center pt-4 font-Poppins text-[14px]">
          Already have an account?{" "}
          <span
            className="text-[#2190ff] pl-1 cursor-pointer"
            onClick={() => setRoute("Login")}
          >
            Sign in
          </span>
        </h5>
      </form>
      <br />
    </div>
  );
};

export default SignUp;
