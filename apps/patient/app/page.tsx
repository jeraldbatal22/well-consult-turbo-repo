import { Button } from "@repo/ui/components/ui/button";
import { redirect } from "next/navigation";

export default function Home() {
  redirect("signin");
  const env = process.env.API_BASE_URL;
  console.log(env)
  return (
    <div className=" h-screen flex justify-center items-center">
      <Button className="bg-green-500">HELLO FROM PATIENT SIDE</Button>
    </div>
  );
}
