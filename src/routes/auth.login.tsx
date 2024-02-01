import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import axios from "axios";
import { motion } from "framer-motion";
import logLevel from "loglevel";
import { useCallback, useEffect, useState } from "react";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/contexts/auth/useAuth";
import { apiUrl } from "@/libs/utils";

const loginSchema = z.object({
  identifier: z.string(),
  password: z.string().min(4).max(16),
  captcha: z.string(),
});

type LoginType = z.infer<typeof loginSchema>;

// export const Route = new FileRoute('/auth/login')
//   .createRoute({
//     validateSearch: z.object({
//       redirect: z.string().optional(),
//     }),
//   })
//   .update({
//     component: AuthLoginComponent,
//   });

export const Route = createFileRoute('/auth/login')({
  component: AuthLoginComponent
})

function AuthLoginComponent() {
  const [isFormLoading, setIsFormLoading] = useState<boolean>(false);
  const { executeRecaptcha } = useGoogleReCaptcha();
  // const [userSession, setUserSession] = useAtom(userSessionAtom);
  const { setUser, user } = useAuth();
  // const { userId } = useAuth();
  const navigate = useNavigate();

  // const { signIn, isLoaded, setActive } = useSignIn();

  const { t } = useTranslation();

  const signInMutation = useMutation({
    mutationKey: ["signin"],
    mutationFn: async (data: LoginType) => {
      const formData = new FormData();
      formData.set("credential", data.identifier);
      formData.set("password", data.password);
      formData.set("captcha_token", data.captcha);

      const res = await axios.post(apiUrl + "/login.php", formData);

      return res.data;
    },
  });

  const form = useForm<LoginType>({
    resolver: zodResolver(loginSchema),
  });

  const handleReCaptchaVerify = useCallback(async () => {
    if (!executeRecaptcha) {
      logLevel.warn("Execute recaptcha not yet available");

      return;
    }

    const token = await executeRecaptcha();
    logLevel.debug("login catpcha token", token);

    form.setValue("captcha", token);
  }, [executeRecaptcha, form]);

  useEffect(() => {
    // if (userId) {
    //   navigate("/");
    // }

    handleReCaptchaVerify();
  }, [handleReCaptchaVerify]);

  const onSubmit = useCallback(
    async (data: LoginType) => {
      // if (!signIn) return;

      form.clearErrors();
      setIsFormLoading(true);

      logLevel.debug(data);

      // const formData = new FormData();

      // formData.set("credential", data.credential);
      // formData.set("password", data.password);
      // formData.set("captcha_token", data.captcha);

      try {
        const res = await signInMutation.mutateAsync(data);
        // logLevel.debug(res);

        // const emailMD5 = await axios.get(
        //   `https://api.hashify.net/hash/md5/hex?value=${res.email}`
        // );
        // const emailMD5Digest = emailMD5.data.Digest;
        // const userAvatar = await axios.get(
        //   `https://en.gravatar.com/${emailMD5Digest}.json`
        // );

        setUser({
          ...res,
        });

        logLevel.debug(user);
        // const signInResource = await signIn.create({
        //   strategy: "password",
        //   identifier: data.identifier,
        //   password: data.password,
        // });
        // logLevel.debug(signInResource);

        // if (signInResource.status !== "complete") {
        //   logLevel.debug(signInResource);

        //   setIsFormLoading(false);
        //   return;
        // }

        // await setActive({ session: signInResource.createdSessionId });
        // const res = await axios.post(`${serverURL}api/login.php`, formData);
        // if (!res.data) return;

        form.reset();

        toast(t("signInSuccess"));

        // if (!userSession) return;
        navigate({ to: res.status === "EMPLOYEE" ? "/manage" : "/" });
      } catch (err) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const error = err as any;
        logLevel.error(error);

        switch (error.response?.data) {
          case "CREDENTIAL_NOT_VALID":
            form.setError("identifier", {
              message: t("credentialNotValid", "Credential not valid."),
            });

            // toast(t("credentialNotValid", "Credential not valid."));

            break;

          // case "CAPTCHA_NOT_VALID":
          //   MySwal.fire({
          //     icon: "error",
          //     title: "เกิดข้อผิดพลาด",
          //     text: "Captcha ไม่ถูกต้อง",
          //   });

          //   break;

          default:
            toast("เกิดข้อผิดพลาดบางอย่าง");

            break;
        }
      }

      setIsFormLoading(false);
    },
    [form, navigate, setUser, signInMutation, t, user]
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          {/* <img
            className="mx-auto h-12 w-auto"
            src="/IDS.png"
            alt="Your Company"
          /> */}
          <h2 className="text-center text-2xl font-bold leading-9 tracking-tight text-current">
            {"เข้าสู่ระบบ"}
          </h2>
        </div>

        <Card className="sm:mx-auto sm:w-full sm:max-w-md p-10 mt-10">
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8"
              >
                <FormField
                  control={form.control}
                  name="identifier"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("username", "Username")}</FormLabel>
                      <FormControl>
                        <Input type="text" {...field} />
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
                      <FormLabel>{t("password", "Password")}</FormLabel>
                      <FormControl>
                        <Input type="password" {...field} />
                      </FormControl>
                      {/* <FormMessage /> */}
                    </FormItem>
                  )}
                />
                <Button
                  type="submit"
                  disabled={
                    isFormLoading ||
                    (form.formState.submitCount > 0 && !form.formState.isValid)
                  }
                >
                  {"เข้าสู่ระบบ"}
                </Button>
              </form>
            </Form>

            <p className="mt-10 text-center text-sm text-gray-500">
              {"ยังไม่มีสมาชิก? "}
              <Link
                to="/auth/register"
                className="font-semibold leading-6 text-primary"
              // preventScrollReset={false}
              >
                {"สมัครสมาชิก"}
              </Link>
            </p>
          </CardContent>
        </Card>
      </div>
    </motion.div>
  );
}
