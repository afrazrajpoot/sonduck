"use client";
import * as React from "react";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Modal from "@mui/material/Modal";
import Image from "next/image";
import Otp from "./Otp";
import { useGlobalContext } from "@/context/globalState";

export default function OtpModel() {
	const { openOtpModel, setOtpModel } = useGlobalContext();
	const handleClose = () => setOtpModel(false);

	return (
		<div className="w-full relative">
			<Modal
				open={openOtpModel}
				onClose={handleClose}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description"
			>
				<div className="flex flex-col justify-center items-center h-screen">
					<div className="relative bg-white rounded-[0.5vw] px-8 py-10 w-full md:h-fit h-full md:w-[450px] xl:w-[500px] shadow-lg flex flex-col">
						<div className="flex w-full justify-center mb-5">
							<Image src="/img/Logo.png" alt="logo" width={180} height={180} />
						</div>
						<h1 className="font-bold text-[1.2vw] text-center mb-2">
							Reset Password
						</h1>
						<p className="text-center text-[0.8vw] text-[#525252] mb-5">
							Recover your account password
						</p>
						<Otp />
						<Button className="absolute top-[2%] md:top-auto md:bottom-[-20%] right-5 md:right-0 md:left-0">
							<IconButton
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
								<CloseIcon />
							</IconButton>
						</Button>
					</div>
				</div>
			</Modal>
		</div>
	);
}
