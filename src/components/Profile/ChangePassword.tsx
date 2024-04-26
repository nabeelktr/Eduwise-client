import { styles } from "@/styles/style";
import React, { useEffect } from "react";
import {
  useUpdateAvatarMutation,
  useUpdatePasswordMutation,
} from "../../../redux/features/user/userApi";
import { toast } from "sonner";
import { useFormik } from "formik";
import * as Yup from "yup";

const passwordRules = /^(?=.*[a-z])(?=.*[A-Z])/;
const passwordNumberRule = /(?=.*[0-9])/;

const passwordValidation = Yup.string()
  .min(8)
  .matches(passwordRules, {
    message: "Requires a combination of uppercase and lowercase letters.",
  })
  .matches(passwordNumberRule, { message: "At least one number (0-9)." })
  .required("Please enter your password");

const schema = Yup.object().shape({
  oldPassword: passwordValidation,
  newPassword: passwordValidation.notOneOf(
    [Yup.ref("oldPassword")],
    "New password must be different from the old password",
  ),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("newPassword")], "Passwords must match")
    .required("Please confirm your password"),
});

type Props = {};

const ChangePassword = (props: Props) => {
  const [updatePassword, { isSuccess, error }] = useUpdatePasswordMutation();

  useEffect(() => {
    if (isSuccess) {
      toast.success("Password update successfully");
    }
    if (error) {
      if ("data" in error) {
        const errorData = error as any;
        toast.error(errorData.data.message);
      }
    }
  }, [isSuccess, error]);

  const formik = useFormik({
    initialValues: { oldPassword: "", newPassword: "", confirmPassword: "" },
    validationSchema: schema,
    onSubmit: async ({ newPassword, oldPassword }, { resetForm }) => {
      await updatePassword({ oldPassword, newPassword });
      resetForm();
    },
  });
  const { errors, touched, values, handleChange, handleSubmit } = formik;

  return (
    <div className="w-full px-2 pl-7 800px:px-5 800px:pl-0">
      <h1 className="block pb-2 text-center font-Poppins text-[16px] font-[500] text-black 800px:text-[30px]">
        Change Password
      </h1>
      <div className="w-full">
        <form onSubmit={handleSubmit} className="flex flex-col items-center">
          <div className="mt-5 w-[100%] 800px:w-[60%]">
            <label className="block text-black ">Old Password</label>
            <input
              type="password"
              className={`${styles.input}${
                errors.oldPassword && touched.oldPassword && "border-red-500"
              } mb-4 !w-[95%] text-black dark:text-black 800px:mb-0 `}
              required
              name="oldPassword"
              value={values.oldPassword}
              onChange={handleChange}
            />
            {errors.oldPassword && touched.oldPassword && (
              <span className="block pt-1 text-sm text-red-500">
                {errors.oldPassword}
              </span>
            )}
          </div>
          <div className="mt-2 w-[100%] 800px:w-[60%]">
            <label className="block text-black ">New Password</label>
            <input
              type="password"
              name="newPassword"
              className={`${styles.input}${
                errors.newPassword && touched.newPassword && "border-red-500"
              } mb-4 !w-[95%] text-black dark:text-black 800px:mb-0`}
              required
              value={values.newPassword}
              onChange={handleChange}
            />
            {errors.newPassword && touched.newPassword && (
              <span className="block pt-1 text-sm text-red-500">
                {errors.newPassword}
              </span>
            )}
          </div>
          <div className="mt-2 w-[100%] 800px:w-[60%]">
            <label className="block text-black ">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              className={`${styles.input}${
                errors.confirmPassword &&
                touched.confirmPassword &&
                "border-red-500"
              } mb-4 !w-[95%] text-black dark:text-black 800px:mb-0 `}
              required
              value={values.confirmPassword}
              onChange={handleChange}
            />
            {errors.confirmPassword && touched.confirmPassword && (
              <span className="block pt-1 text-sm text-red-500">
                {errors.confirmPassword}
              </span>
            )}
            <p className="ml-2 mt-1 text-xs text-gray-600">
              - Uppercase letters (A-Z)
            </p>
            <p className="ml-2 text-xs text-gray-600">
              - Lowercase letters (a-z)
            </p>
            <p className="ml-2 text-xs text-gray-600">- Numbers (0-9)</p>
            <input
              type="submit"
              className={`mt-8 h-[40px] w-[95%] cursor-pointer rounded-[3px] border border-[#37a39a] text-center text-black dark:text-black`}
              value="Update"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;
