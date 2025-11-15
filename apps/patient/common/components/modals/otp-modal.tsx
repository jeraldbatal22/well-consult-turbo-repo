"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { Button } from "@repo/ui/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@repo/ui/components/ui/form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@repo/ui/components/ui/input-otp";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@repo/ui/components/ui/dialog";
import { useRouter } from "next/navigation";

const FormSchema = z.object({
  pin: z.string().min(6, {
    message: "Your one-time password must be 6 characters.",
  }),
});

type T_OTP_MODAL_PROPS = {
  isShowOtpModal: boolean;
};

export default function OTPModal({ isShowOtpModal }: T_OTP_MODAL_PROPS) {
  const router = useRouter();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      pin: "",
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    toast("You submitted the following values", {
      description: (
        <pre className="mt-2 w-[320px] rounded-md bg-neutral-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  }

  const closeModal = () => {
    router.push("/");
  };

  return (
    <Dialog open={isShowOtpModal} onOpenChange={closeModal}>
      <form>
        <DialogContent className="space-y-3 sm:max-w-[640px] bg-[#1A1D21F5] text-white border-0">
          <DialogHeader className="space-y-3">
            <DialogTitle>Verify OTP</DialogTitle>
            <DialogDescription>
              Please enter the OTP sent to your registered mobile number.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="w-full space-y-6"
              >
                <FormField
                  control={form.control}
                  name="pin"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <InputOTP maxLength={6} {...field}>
                          <InputOTPGroup className="gap-5 w-full flex justify-between">
                            {[0, 1, 2, 3, 4, 5].map((val) => {
                              return (
                                <InputOTPSlot
                                  key={val}
                                  index={val}
                                  className="size-20"
                                />
                              );
                            })}
                          </InputOTPGroup>
                        </InputOTP>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit" className="w-full mt-5">
                  Submit
                </Button>
              </form>
            </Form>
          </div>
        </DialogContent>
      </form>
    </Dialog>
  );
}
