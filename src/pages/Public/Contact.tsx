import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useAppSelector } from "@/hooks/redux";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormData = z.infer<typeof contactSchema>;

export default function ContactPage() {
  const user = useAppSelector((state) => state.auth.user);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: user?.name || "",
      email: user?.email || "",
      message: "",
    },
  });

  const onSubmit = async (data: ContactFormData) => {
    const toastId = toast.loading("Sending message...");
    console.log(data);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    toast.success(
      `Message sent! Thanks, ${data.name}. We'll respond shortly.`,
      { id: toastId }
    );
    reset();
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-4">
      <div className="relative max-w-2xl w-full py-12 px-6">
        <div
          className="absolute top-3 left-3 h-12 w-12 border-t-2 border-l-2 border-primary/70  origin-top-left"
          aria-hidden="true"
        />

        <div
          className="absolute bottom-3 right-3 h-12 w-12 border-b-2 border-r-2 border-primary/70  origin-bottom-right"
          aria-hidden="true"
        />

        <h1 className="text-3xl font-bold mb-6 text-primary">Contact Us</h1>
        <p className="text-muted-foreground mb-8">
          Have a question or inquiry? Fill out the form below and we’ll respond
          as soon as possible.
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium mb-1">
              Name
            </label>
            <Input id="name" {...register("name")} placeholder="John Doe" />
            {errors.name && (
              <p className="text-sm text-destructive mt-1">
                {errors.name.message}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-1">
              Email
            </label>
            <Input
              id="email"
              type="email"
              {...register("email")}
              placeholder="john@example.com"
            />
            {errors.email && (
              <p className="text-sm text-destructive mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-medium mb-1">
              Message
            </label>
            <Textarea
              id="message"
              rows={5}
              {...register("message")}
              placeholder="Type your message here..."
            />
            {errors.message && (
              <p className="text-sm text-destructive mt-1">
                {errors.message.message}
              </p>
            )}
          </div>

          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Sending..." : "Send Message"}
          </Button>
        </form>
      </div>
    </div>
  );
}
