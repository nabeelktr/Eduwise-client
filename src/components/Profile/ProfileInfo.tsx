import Image from "next/image";
import React, { FC, useEffect, useRef, useState } from "react";
import avatarIcon from "../../../public/assets/user.png";
import { AiOutlineCamera } from "react-icons/ai";
import { styles } from "../../styles/style";
import {
  useEditProfileMutation,
  useUpdateAvatarMutation,
} from "../../../redux/features/user/userApi";
import { useLoadUserQuery } from "../../../redux/features/api/apiSlice";
import { toast } from "sonner";

type Props = {
  avatar: any;
  user: any;
};

const ProfileInfo: FC<Props> = ({ avatar, user }) => {
  const [name, setName] = useState(user && user.name);
  const imageRef = useRef<HTMLInputElement>(null);
  const [updateAvatar, { isSuccess, error }] = useUpdateAvatarMutation();
  const [editprofile, { isSuccess: profileSuccess, error: profileError }] =
    useEditProfileMutation();
  const [loadUser, setLoadUser] = useState(false);
  const {} = useLoadUserQuery(undefined, { skip: loadUser ? false : true });

  const handleImageClick = () => {
    imageRef.current?.click();
  };

  const imageHandler = async (e: any) => {
    const formData = new FormData();
    formData.append("avatar", e.target.files[0]);

    await updateAvatar(formData);
  };

  useEffect(() => {
    if (isSuccess || profileSuccess) {
      setLoadUser(true);
    }
    if (profileSuccess) {
      toast.success("Profile updated Successfully");
    }
    if (error || profileError) {
      console.log(error);
    }
  }, [isSuccess, error, profileError, profileSuccess]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (name !== "") {
      await editprofile({
        name,
      });
    }
  };
  return (
    <>
      <div className="flex w-full justify-center">
        <div className="relative">
          <Image
            src={user?.avatar || avatar ? user.avatar || avatar : avatarIcon}
            alt=""
            className="h-[120px] w-[120px] cursor-pointer rounded-full border-[3px] border-[#37a39a]"
            width={120}
            height={120}
            onClick={handleImageClick}
          />
          <form encType="multipart/form-data">
            <input
              type="file"
              name="avatar"
              id="avatar"
              className="hidden"
              onChange={imageHandler}
              accept="image/png, image/jpg, image/jpeg, image/webp"
              ref={imageRef}
            />
          </form>

          <label>
            <div className="bg-slate-900 absolute bottom-2 right-2 flex h-[30px] w-[30px] cursor-pointer items-center justify-center rounded-full">
              <AiOutlineCamera size={20} className="z-1" />
            </div>
          </label>
        </div>
      </div>
      <br />
      <br />
      <div className="w-full pl-6 800px:pl-10">
        <form onSubmit={handleSubmit}>
          <div className="m-auto block pb-4 text-black 800px:w-[50%]">
            <div className="w-[100] pb-2">
              <label className="block font-Poppins"> Full Name</label>
              <input
                type="text"
                className={`${styles.input} !w-[95%]  text-base  text-black dark:!text-black 800px:mb-0`}
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="w-[100]">
              <label className="block pt-2 font-Poppins"> Email Address</label>
              <input
                type="text"
                readOnly
                className={`${styles.input} !w-[95%]  !text-black dark:!text-black 800px:mb-0`}
                required
                value={user?.email}
              />
            </div>
            <input
              className={`mt-8 h-[40px] w-[95%] cursor-pointer rounded-[3px] border border-[#37a39a] text-center text-black 800px:w-[250px]`}
              required
              value="update"
              type="submit"
            />
          </div>
        </form>
        <br />
      </div>
    </>
  );
};

export default ProfileInfo;
