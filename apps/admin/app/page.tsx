import { Button } from "@repo/ui/components/ui/button";

export default function Home() {
  const env = process.env.API_BASE_URL;
  console.log(env)
  return (
    <div className=" h-screen flex justify-center items-center">
      <Button className="bg-blue-500">HELLO FROM ADMIN SIDE</Button>
    </div>
  );
}
