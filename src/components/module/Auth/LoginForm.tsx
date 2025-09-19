import Password from "@/components/module/Auth/Password";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import type z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "./authSchema";
import { toast } from "sonner";
import { useLoginMutation } from "@/store/api/auth.api";
import type { IError, TRole } from "@/types";
import { useAppDispatch } from "@/hooks/redux";
import { login } from "@/store/slice/auth.slice";
import redirectByRole from "@/utils/redirectByRole";

function LoginForm() {
  const dispatch = useAppDispatch();
  const [loginMutation] = useLoginMutation();
  const navigate = useNavigate();
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const onSubmit = async (data: z.infer<typeof loginSchema>) => {
    try {
      console.log(data);
      const toastId = toast.loading("Logging in...");
      const res = await loginMutation(data).unwrap();
      console.log(res);
      toast.success("Login successful", { id: toastId });
      dispatch(login(res.data.user));
      navigate(redirectByRole(res.data.user.role as TRole));
    } catch (error) {
      console.log(error);
      toast.error((error as IError)?.message || "Something went wrong");
    }
  };

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Login to your account</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-6">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="grid gap-6"
              id="login-form"
            >
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="john@doe.com"
                        {...field}
                        type="email"
                      />
                    </FormControl>
                    <FormDescription className="sr-only">
                      This is your email.
                    </FormDescription>
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
                      <Password {...field} />
                    </FormControl>
                    <FormDescription className="sr-only">
                      This is your password.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </form>
          </Form>
        </div>
      </CardContent>
      <CardFooter className="flex-col gap-2">
        <Button type="submit" className="w-full" form="login-form">
          Login
        </Button>

        <div className="text-center text-sm">
          Don&apos;t have an account?{" "}
          <Link to={"/register"} className="underline underline-offset-4">
            Register
          </Link>
        </div>
      </CardFooter>
    </Card>
  );
}
export default LoginForm;
