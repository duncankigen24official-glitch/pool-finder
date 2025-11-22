import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Mail } from "lucide-react";
import { toast } from "sonner";

const forgotPasswordSchema = z.object({
  email: z.string().email("Invalid email address"),
});

type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const onSubmit = async (data: ForgotPasswordFormData) => {
    setIsLoading(true);
    try {
      const redirectUrl = `${window.location.origin}/reset-password`;
      
      const { error } = await supabase.auth.resetPasswordForEmail(data.email, {
        redirectTo: redirectUrl,
      });

      if (error) {
        toast.error(error.message);
        return;
      }

      setEmailSent(true);
      toast.success("Password reset link sent to your email");
    } catch (error) {
      toast.error("An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  if (emailSent) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <div className="p-6">
          <Button variant="ghost" onClick={() => navigate("/login")}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Login
          </Button>
        </div>

        <div className="flex-1 flex flex-col items-center justify-center px-6 pb-20">
          <div className="max-w-md text-center space-y-6">
            <div className="mx-auto w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center">
              <Mail className="h-10 w-10 text-primary" />
            </div>
            <div className="space-y-2">
              <h2 className="text-2xl font-bold text-foreground">Check Your Email</h2>
              <p className="text-muted-foreground">
                We've sent a password reset link to your email address. Please check your inbox and follow the instructions.
              </p>
            </div>
            <Button onClick={() => navigate("/login")} className="w-full">
              Back to Login
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <div className="p-6">
        <Button variant="ghost" onClick={() => navigate("/login")}>
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Login
        </Button>
      </div>

      <div className="flex-1 flex flex-col justify-center px-6 pb-20">
        <div className="max-w-md mx-auto w-full space-y-6">
          <div className="text-center space-y-2">
            <h2 className="text-3xl font-bold text-foreground">Forgot Password?</h2>
            <p className="text-muted-foreground">
              Enter your email address and we'll send you a link to reset your password
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                {...register("email")}
                className={errors.email ? "border-destructive" : ""}
              />
              {errors.email && (
                <p className="text-sm text-destructive">{errors.email.message}</p>
              )}
            </div>

            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Sending..." : "Send Reset Link"}
            </Button>
          </form>

          <div className="text-center">
            <p className="text-sm text-muted-foreground">
              Remember your password?{" "}
              <Link to="/login" className="text-primary hover:underline font-medium">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
