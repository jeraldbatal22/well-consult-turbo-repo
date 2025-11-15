import React from "react";
// import Image from "next/image";
import AppointmentForm from "@/common/components/forms/appointment-create-form";

const CreateAppointmentPage = () => {
  return (
    <div className="min-h-screen flex bg-background text-foreground">
      {/* Main Content Area */}
      <div className="flex-1 px-6 py-8 md:px-12 md:py-12 lg:px-28 lg:py-15 flex flex-col">
        {/* Logo */}
        <div className="flex items-center gap-2 mb-8 md:mb-12">
          {/* <Image
            src="/assets/images/logo.png"
            alt="logo"
            width={32}
            height={32}
          /> */}
          <h1 className="text-xl md:text-2xl font-bold ">wellConsult</h1>
        </div>

        {/* Heading Section */}
        <div className="mb-6 md:mb-8">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-2 md:mb-4">
            Hey there 👋
          </h1>
          <p className="text-base md:text-lg text-[#ABB8C4]">
            Request a new appointment in 10 seconds.
          </p>
        </div>

        {/* Form */}
        <div className="flex-1">
          <AppointmentForm />
        </div>
      </div>
    </div>
  );
};

export default CreateAppointmentPage;
