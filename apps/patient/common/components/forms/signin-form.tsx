"use client";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@repo/ui/components/ui/form";
import { useForm, FieldValues } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@repo/ui/components/ui/input";

import { z } from "zod";
import Link from "next/link";
import { Button } from "@repo/ui/components/ui/button";

const formSchema = z.object({
  password: z.string().min(9, {
    message: "Password must be at least 9 characters.",
  }),
  email: z.email({
    message: "Invalid email address.",
  }),
});

const SigninForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(values: FieldValues) {
    console.log(values as z.infer<typeof formSchema>);
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-6 md:space-y-8 mt-8 md:mt-15"
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="text" placeholder="Enter your email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" placeholder="Enter your password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div>
          <span className="text-gray-400">
            Don{"' "}t have an account yet?
            <Link href="/signup" className="text-primary text-sm font-medium"> Signup</Link>{" "}
          </span>
        </div>

        <Button type="submit" className="w-full">
          Login
        </Button>
      </form>
    </Form>
  );
};

export default SigninForm;
