import PatientCompleteProfileForm from "@/common/components/forms/patient-complete-profile-form";
import Image from "next/image";
import { redirect } from "next/navigation";

const CompleteProfilePage = async ({
  params,
}: {
  params: Promise<{ userId?: string }>;
}) => {
  const userId = (await params).userId;

  if (userId === "1") redirect(`/patients/${userId}/new-appointment`);

  return (
    <>
      <div className="min-h-screen flex bg-[#131619] text-white">
        <div className="flex-1 px-6 py-8 md:px-12 md:py-12 lg:px-28 lg:py-15 flex flex-col justify-between">
          <div className="flex items-center gap-2">
            <Image
              src="/assets/images/logo.png"
              alt="logo"
              width={32}
              height={32}
            />
            <h1 className="text-xl md:text-2xl font-bold">wellConsult</h1>
          </div>
          <div>
            <div className="space-y-2 md:space-y-4">
              <h1 className="text-2xl md:text-4xl font-bold">Welcome 👋</h1>
              <span className="text-base md:text-lg text-[#ABB8C4]">
                Let us know more about yourself
              </span>
            </div>
            <PatientCompleteProfileForm />
          </div>
        </div>
        <div className="w-96 hidden lg:flex justify-center items-center bg-[url('/assets/images/illustration.png')] bg-cover bg-center rounded-3xl" />
      </div>
    </>
  );
};

export default CompleteProfilePage;
