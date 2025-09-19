import Password from "@/components/module/Auth/Password";
import { Button } from "@/components/ui/button";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useRegisterMutation } from "@/store/api/auth.api";
import type { IError } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import { toast } from "sonner";
import type z from "zod";
import { registerSchema } from "./authSchema";

function RegisterForm() {
  const [register] = useRegisterMutation();
  const navigate = useNavigate();
  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      phone: "",
      email: "",
      password: "",
      confirmPassword: "",
      address: "",
      role: "RECEIVER",
    },
  });
  const onSubmit = async (data: z.infer<typeof registerSchema>) => {
    try {
      console.log(data);
      const toastId = toast.loading("Loading...");
      const res = await register(data).unwrap();
      console.log(res);
      toast.success("Account created successful", { id: toastId });
      navigate("/login");
    } catch (error) {
      console.log(error);
      toast.error((error as IError)?.message || "Something went wrong");
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Register with us!</h1>
        <p className="text-muted-foreground text-sm text-balance">
          Enter your details below to create to your account
        </p>
      </div>
      <div className="grid gap-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="John Doe" {...field} />
                  </FormControl>
                  <FormDescription className="sr-only">
                    This is your public display name.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="john@doe.com" {...field} type="email" />
                  </FormControl>
                  <FormDescription className="sr-only">
                    This is your email.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex gap-4">
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Password {...field} />
                    </FormControl>
                    <FormDescription className="sr-only">
                      This is your password.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <Password {...field} />
                    </FormControl>
                    <FormDescription className="sr-only">
                      This is to confirm your password.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex flex-col gap-4">
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Phone</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="+880-XXXXXXXXXX"
                        {...field}
                        type="text"
                      />
                    </FormControl>
                    <FormDescription className="sr-only">
                      This is your phone number
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Address</FormLabel>
                    <FormControl>
                      <Input placeholder="Dhaka" {...field} type="text" />
                    </FormControl>
                    <FormDescription className="sr-only">
                      This is to confirm your address.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="role"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormLabel>Role</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select your Role" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="RECEIVER">Receiver</SelectItem>
                        <SelectItem value="SENDER">Sender</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormDescription className="sr-only">
                      Select your Role
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <Button type="submit" className="w-full">
              Submit
            </Button>
          </form>
        </Form>
      </div>
      <div className="text-center text-sm">
        Already have an account?{" "}
        <Link to={"/login"} className="underline underline-offset-4">
          Login
        </Link>
      </div>
    </div>
  );
}
export default RegisterForm;
