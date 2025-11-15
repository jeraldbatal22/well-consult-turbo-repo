import SigninForm from "@/common/components/forms/signin-form";
import OTPModal from "@/common/components/modals/otp-modal";
// import Image from "next/image";

const SigninPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ admin?: string }>;
}) => {
  const isAdmin = !!(await searchParams).admin;
  
  return (
    <>
      <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-[#131619] text-white">
        <div className="px-6 py-8 md:px-12 md:py-12 lg:px-28 lg:py-15 flex flex-col justify-between">
          <div className="flex items-center gap-2">
            {/* <Image
              src="/assets/images/logo.png"
              alt="logo"
              width={32}
              height={32}
            /> */}
            <h1 className="text-xl md:text-2xl font-bold">wellConsult</h1>
          </div>
          <div>
            <div className="space-y-2 md:space-y-4">
              <h1 className="text-2xl md:text-4xl font-bold">Hi There, ...</h1>
              <span className="text-base md:text-lg text-[#ABB8C4]">
                Get Started with Appointments by sign in.
              </span>
            </div>
            <SigninForm />
          </div>
          <div className="mt-6 md:mt-0">
            <span className="text-sm md:text-base text-[#76828D]">@wellConsult copyright</span>
          </div>
        </div>
        <div className="hidden lg:flex justify-center items-center bg-[url('/assets/images/onboarding-background.png')] bg-cover bg-center rounded-3xl" />
      </div>

      <OTPModal isShowOtpModal={isAdmin} />
    </>
  );
};

export default SigninPage;
