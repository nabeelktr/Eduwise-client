"use client";

import Header from "../../../components/Header";
import React, { useCallback, useState } from "react";
import { useFormik } from "formik";
import { styles } from "../../../styles/style";
import { FileRejection, useDropzone } from "react-dropzone";
import { HiArrowUpTray } from "react-icons/hi2";
import { TextGenerateEffect } from "@/components/ui/TextGenerate";
import { RiCloseCircleFill } from "react-icons/ri";

type Props = {};

interface FileWithPreview extends File {
  preview: string;
}

const InstructorRegister: React.FC<Props> = (props) => {
  const [files, setFiles] = useState<FileWithPreview[]>([]);
  const [rejected, setRejected] = useState<FileRejection[]>([]);

  const [open, setOpen] = useState(false);
  const [activeItem, setActiveItem] = useState(3);
  const [route, setRoute] = useState("Login");

  const formik = useFormik({
    initialValues: { degree: "", institution: "", subject: "", yearOfCompletion: "", certificateName: "", authority: "", date: "" },
    validationSchema: null,
    onSubmit: async ({ degree, institution, subject, yearOfCompletion, certificateName, authority, date }) => {
      const data = {
        degree,
        institution,
        subject,
        yearOfCompletion,
        certificateName,
        authority,
        date
      };
    },
  });

  const onDrop = useCallback(
    (acceptedFiles: File[], rejectedFiles: FileRejection[]) => {
      if (acceptedFiles?.length) {
        setFiles((previousFiles) => [
          // If allowing multiple files
          // ...previousFiles,
          ...acceptedFiles.map((file) =>
            Object.assign(file, { preview: URL.createObjectURL(file) })
          ),
        ]);
        setRejected([])
      }
      if (rejectedFiles?.length) {
        setRejected(rejectedFiles);
      }
    },
    []
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      ".pdf, .docx": [],
    },
    maxSize: 1024 * 1000,
    maxFiles: 1,
    onDrop,
  });

  const removeAll = () => {
    setFiles([]);
    setRejected([]);
  };

  const { errors, touched, values, handleChange, handleSubmit } = formik;
  return (
    <div>
      <Header
        open={open}
        setOpen={setOpen}
        activeItem={activeItem}
        setRoute={setRoute}
        route={route}
      />
      <section className="bg-white dark:bg-gray-900 font-Poppins">
        <div className="flex justify-center min-h-screen">
          <div
            className="hidden bg-cover lg:block lg:w-2/5"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1494621930069-4fd4b2e24a11?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=715&q=80')",
            }}
          ></div>

          <div className="flex items-center w-full max-w-3xl p-8 mx-auto lg:px-12 lg:w-3/5">
            <div className="w-full">
              <h1 className="text-2xl font-semibold tracking-wider text-gray-800 capitalize dark:text-white font-Poppins">
                Instructor Details
              </h1>

              {/* <span className="mt-4 text-gray-600 dark:text-gray-600 text-sm "> */}
              {/* The way that you teach — what you bring to it — is up to you. */}
              <TextGenerateEffect
                words="The way that you teach — what you bring to it — is up to you."
                className="something"
              />

              {/* </span> */}

              <form className="mt-6">
                <h1 className="text-[18px] mb-4 text-gray-800 ">
                  Education Details:
                </h1>
                <div className="mb-3 grid-cols-2 grid gap-2 ml-4">
                  <div>
                    <label className={`${styles.label} `}>Latest Degree</label>
                    <input
                      type="text"
                      name="degree"
                      value={values.degree}
                      onChange={handleChange}
                      id="name"
                      placeholder="Degree"
                      className={`${
                        errors.degree && touched.degree && "border-red-500"
                      } ${styles.input} text-sm`}
                    />
                    {errors.degree && touched.degree && (
                      <span className="text-red-500 pt-1 block text-sm">
                        {errors.degree}
                      </span>
                    )}
                  </div>
                  <div>
                    <label className={`${styles.label} `}>Institution </label>
                    <input
                      type="text"
                      name="institution"
                      value={values.institution}
                      onChange={handleChange}
                      id="name"
                      placeholder="Institution"
                      className={`${
                        errors.institution && touched.institution && "border-red-500"
                      } ${styles.input} text-sm`}
                    />
                    {errors.institution && touched.institution && (
                      <span className="text-red-500 pt-1 block text-sm">
                        {errors.institution}
                      </span>
                    )}
                  </div>
                </div>

                <div className="mb-3 mt-6 grid-cols-2 grid gap-2  ml-4">
                  <div>
                    <label className={`${styles.label} `}>
                      Major / Subject
                    </label>
                    <input
                      type="text"
                      name="subject"
                      value={values.subject}
                      onChange={handleChange}
                      placeholder="Subject"
                      className={`${
                        errors.subject && touched.subject && "border-red-500"
                      } ${styles.input} text-sm`}
                    />
                    {errors.subject && touched.subject && (
                      <span className="text-red-500 pt-1 block text-sm">
                        {errors.subject}
                      </span>
                    )}
                  </div>
                  <div>
                    <label className={`${styles.label} `}>
                      Year of completion{" "}
                    </label>
                    <input
                      type="text"
                      name="yearOfCompletion"
                      value={values.yearOfCompletion}
                      onChange={handleChange}
                      id="name"
                      placeholder="Year of completion"
                      className={`${
                        errors.yearOfCompletion && touched.yearOfCompletion && "border-red-500"
                      } ${styles.input} text-sm`}
                    />
                    {errors.yearOfCompletion && touched.yearOfCompletion && (
                      <span className="text-red-500 pt-1 block text-sm">
                        {errors.yearOfCompletion}
                      </span>
                    )}
                  </div>
                </div>
                <h1 className="text-[18px]  mt-6 mb-4 text-gray-800 pt-3">
                  Certificate Details:
                </h1>

                <div className="mb-3 grid-cols-2 grid gap-2 ml-4">
                  <div>
                    <label className={`${styles.label} `}>
                      Certificate Name
                    </label>
                    <input
                      type="text"
                      name="certificateName"
                      value={values.certificateName}
                      onChange={handleChange}
                      placeholder="Certificate"
                      className={`${
                        errors.certificateName && touched.certificateName && "border-red-500"
                      } ${styles.input} text-sm`}
                    />
                    {errors.certificateName && touched.certificateName && (
                      <span className="text-red-500 pt-1 block text-sm">
                        {errors.certificateName}
                      </span>
                    )}
                  </div>
                  <div>
                    <label className={`${styles.label} `}>
                      Issuing Authority
                    </label>
                    <input
                      type="text"
                      name="institution"
                      value={values.institution}
                      onChange={handleChange}
                      placeholder="Authority"
                      className={`${
                        errors.institution && touched.institution && "border-red-500"
                      } ${styles.input} text-sm`}
                    />
                    {errors.institution && touched.institution && (
                      <span className="text-red-500 pt-1 block text-sm">
                        {errors.institution}
                      </span>
                    )}
                  </div>
                </div>

                <div className="ml-4">
                  <label className={`${styles.label} `}>
                    Date of Certification
                  </label>
                  <input
                    type="date"
                    value={values.date}
                    onChange={handleChange}
                    placeholder="date"
                    className={`${
                      errors.date && touched.date && "border-red-500"
                    } ${styles.input} text-sm`}
                  />
                  {errors.date && touched.date && (
                    <span className="text-red-500 pt-1 block text-sm">
                      {errors.date}
                    </span>
                  )}
                </div>

                <div
                  {...getRootProps({
                    className: "drop",
                  })}
                  className="mt-6 cursor-pointer border-gray-400 border p-4 border-dashed ml-4"
                >
                  <input {...getInputProps({ name: "file" })} required />
                  <div className="flex flex-col items-center justify-center gap-4 text-sm">
                    <HiArrowUpTray className="h-5 w-5 fill-current" />
                    {isDragActive ? (
                      <p>Drop the files here ...</p>
                    ) : (
                      <p>
                        Drag & drop file here, or click to select file ( .pdf )
                      </p>
                    )}
                  </div>
                </div>
                {files[0] && (
                  <div className="mt-2 flex justify-between items-center ml-4 text-sm border-2 p-1">
                    <span>{files[0].name}</span>
                    <RiCloseCircleFill
                      onClick={removeAll}
                      className="cursor-pointer"
                    />
                  </div>
                )}
                {rejected.map(({ file, errors }) => (
            <li key={file.name} className='flex items-start justify-between ml-4'>
                <ul className='text-[12px] text-red-400'>
                  {errors.map(error => (
                    <li key={error.code}>{error.message}</li>
                  ))}
                </ul>

            </li>
          ))}
          <div className="ml-4 mt-8">

          <button 
          className={`${styles.button} bg-gray-900 text-white tracking-wider font-thin dark:bg-gray-800`}
          type="submit"
          >Submit </button>
          </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default InstructorRegister;
