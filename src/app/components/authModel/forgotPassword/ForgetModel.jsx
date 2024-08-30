"use client";
import * as React from "react";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Modal from "@mui/material/Modal";
import Image from "next/image";
import ForgetForm from "./ForgetForm";
import { useGlobalContext } from "@/context/globalState";

export default function ForgetModel() {
  const { openForgetModel, setForgetModel } = useGlobalContext();

  const handleClose = () => {
    setForgetModel(false);
  };

  return (
    <div className="w-full relative">
      <Modal
        open={openForgetModel}
        onClose={handleClose}
        aria-labelledby="modal-title"
        aria-describedby="modal-description"
      >
        <div className="flex flex-col justify-center items-center h-screen">
          <div className="relative bg-white rounded-lg px-8 py-10 w-full md:h-fit h-full md:w-[450px] xl:w-[500px] shadow-lg flex flex-col">
            <div className="flex w-full justify-center">
              <Image src="/img/Logo.png" alt="logo" width={180} height={180} />
            </div>
            <h1 className="font-bold lg:text-xl sm:text-2xl text-center mt-5 mb-1">
              Forgot your password?
            </h1>
            <p className="text-center text-sm mb-5">
              We'll send you an email with a link to reset your password.
            </p>
            <ForgetForm />
            <Button
              className="absolute top-2 right-5 md:relative md:bottom-auto md:right-0"
              onClick={handleClose}
              style={{
                backgroundColor: "white",
                border: "1px solid #ccc",
                borderRadius: "50%",
                width: "40px",
                height: "40px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <IconButton onClick={handleClose} aria-label="close modal">
                <CloseIcon />
              </IconButton>
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
