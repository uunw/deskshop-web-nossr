// import { useAuth, useSignUp } from "@clerk/clerk-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import axios, { AxiosError } from "axios";
import { motion } from "framer-motion";
import logLevel from "loglevel";
import { useCallback, useEffect, useState } from "react";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";
// import Hcaptcha from "@hcaptcha/react-hcaptcha";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { z } from "zod";

import MySwal from "@/components/myswal";
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
import { useToast } from "@/components/ui/use-toast";
import { apiUrl } from "@/libs/utils";

const signUpSchema = z
  .object({
    email: z.string().email({ message: "รูปแบบอีเมลไม่ถูดต้อง" }),
    name: z
      .string()
      .min(6, "ชื่อควรมีความยาวตั้งแต่ 6-50 ตัวอักษร")
      .max(50, "ชื่อควรมีความยาวตั้งแต่ 6-50 ตัวอักษร"),
    lastName: z
      .string()
      .min(6, "นามสกุลควรมีความยาวตั้งแต่ 6-50 ตัวอักษร")
      .max(50, "นามสกุลควรมีความยาวตั้งแต่ 6-50 ตัวอักษร"),
    username: z
      .string()
      .min(4, "ชื่อผู้ใช้ควรมีความยาวตั้งแต่ 4-20 ตัวอักษร")
      .max(20, "ชื่อผู้ใช้ควรมีความยาวตั้งแต่ 4-20 ตัวอักษร")
      .regex(
        /^[a-zA-Z0-9]+([_ -]?[a-zA-Z0-9])*$/,
        "รูปแบบชื่อผู้ใช้งานไม่ถูกต้อง"
      ),
    password: z
      .string()
      .min(4, "รหัสผ่านควรมีความยาวตั้งแต่ 4-16 ตัวอักษร")
      .max(16, "รหัสผ่านควรมีความยาวตั้งแต่ 4-16 ตัวอักษร"),
    confirmPassword: z.string(),
    captcha: z.string({ required_error: "ต้องยันยัน Captcha" }),
    // acceptTerm: z.boolean({
    //   coerce: true,
    //   required_error: "ต้องยอมรับเงื่อนไขกรใช้งาน",
    // }),
    // acceptTerm: z.boolean(),
    // confirmPassword: z.string().
  })
  .superRefine(({ confirmPassword, password }, ctx) => {
    if (password !== confirmPassword) {
      console.log("not match");

      ctx.addIssue({
        code: "custom",
        message: "รหัสผ่านยืนยันไม่ถูกต้อง",
        path: ["confirmPassword"],
      });
    }

    // console.log(acceptTerm);

    // if (!acceptTerm) {
    //   ctx.addIssue({
    //     code: "custom",
    //     message: "ต้องยอมรับเงื่อนไขการใช้งาน",
    //     params: ["acceptTerm"],
    //   });
    // }
  });

type SignUpType = z.infer<typeof signUpSchema>;

export const Route = createFileRoute('/auth/register')({
  component: AuthRegisterComponent
})

function AuthRegisterComponent() {
  const [isFormLoading, setIsFormLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const { executeRecaptcha } = useGoogleReCaptcha();
  const { t } = useTranslation();
  const { toast } = useToast();

  const form = useForm<SignUpType>({
    resolver: zodResolver(signUpSchema),
    // defaultValues: {
    //   acceptTerm: false,
    // },
  });

  const signUpMutation = useMutation({
    mutationKey: ["signup"],
    mutationFn: async (data: SignUpType) => {
      const formData = new FormData();
      formData.set("email", data.email);
      formData.set("username", data.username);
      formData.set("name", data.name);
      formData.set("last_name", data.lastName);
      formData.set("password", data.password);
      formData.set("captcha_token", data.captcha);

      const res = await axios.post(apiUrl + "register.php", formData);

      return res.data;
    },
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
  }, [handleReCaptchaVerify, navigate]);

  const onSubmit = useCallback(
    async (data: SignUpType) => {
      // if (!signUp) return;
      setIsFormLoading(true);

      // console.log(data);
      form.clearErrors();

      // const formData = new FormData();

      // formData.set("username", data.username);
      // formData.set("email", data.email);
      // formData.set("password", data.password);
      // formData.set("name", data.name);
      // formData.set("last_name", data.lastName);
      // formData.set("captcha_token", data.captcha);

      try {
        const res = await signUpMutation.mutateAsync(data);

        // const signUpResource = await signUp.create({
        //   emailAddress: data.email,
        //   password: data.password,
        //   username: data.username,
        //   firstName: data.name,
        //   lastName: data.lastName,
        // });

        // logLevel.debug(signUpResource);
        logLevel.debug(res);

        // if (signUpResource.status !== "complete") return;

        // setActive({ session: signUpResource.createdSessionId });
        // const res = await axios.post(`${serverURL}api/register.php`, formData);
        // if (!res.data) return;

        // form.reset();

        // toast({
        //   title: t("signUpSuccess", "Sign up successful."),
        // });

        navigate({ to: "/auth/login" });
        setIsFormLoading(false);
      } catch (err) {
        logLevel.error(err);
        const error = err as AxiosError;

        // console.error(error);

        switch (error.response?.data) {
          case "USER_EXIST":
            form.setError("email", { message: t("userExist", "User exist.") });

            toast({
              variant: "destructive",
              title: t("userExist", "User exist."),
            });

            break;

          case "CAPTCHA_NOT_VALID":
            MySwal.fire({
              icon: "error",
              title: "เกิดข้อผิดพลาด",
              text: "Captcha ไม่ถูกต้อง",
            });

            break;

          default:
            MySwal.fire({
              icon: "error",
              title: "เกิดข้อผิดพลาดบางอย่าง",
            });
            break;
        }

        setIsFormLoading(false);
      }
    },
    [form, navigate, signUpMutation, t, toast]
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
            {"สมัครสมาชิก"}
          </h2>
        </div>

        <Card className="sm:mx-auto sm:w-full sm:max-w-lg p-10 mt-10">
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("email", "Email")}</FormLabel>
                      <FormControl>
                        <Input type="email" required {...field} />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("username", "Username")}</FormLabel>
                      <FormControl>
                        <Input type="text" required {...field} />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div>
                  <FormLabel htmlFor="name">
                    {t("nameLastName", "Name-Lastname")}
                  </FormLabel>
                  <div className="mt-2 flex gap-2 items-center place-items-center">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          {/* <FormLabel>{t("name", "Name")}</FormLabel> */}
                          <FormControl>
                            <Input type="text" id="name" required {...field} />
                            {/* <Input type="text" {...field} /> */}
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="lastName"
                      render={({ field }) => (
                        <FormItem>
                          {/* <FormLabel>{t("name", "Name")}</FormLabel> */}
                          <FormControl>
                            <Input type="text" required {...field} />
                            {/* <Input type="text" {...field} /> */}
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{t("password", "Password")}</FormLabel>
                      <FormControl>
                        <Input type="password" required {...field} />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        {t("confirmPassword", "Confirm Password")}
                      </FormLabel>
                      <FormControl>
                        <Input type="password" required {...field} />
                      </FormControl>

                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  type="submit"
                  className="w-full"
                  disabled={
                    (!form.formState.isValid &&
                      form.formState.submitCount > 0) ||
                    isFormLoading
                  }
                >
                  {t("signup", "Sign Up")}
                </Button>
              </form>
            </Form>

            <p className="mt-7 text-center text-sm text-gray-500">
              {"มีบัญชีอยู่แล้ว? "}

              <Button variant="link" asChild className="p-0">
                <Link to="/auth/login">{"เข้าสู่ระบบ"}</Link>
              </Button>
            </p>
          </CardContent>
        </Card>

        <div className="text-sm text-secondary-foreground text-center mt-10 space-y-2">
          <p>
            {"เมื่อคุณคลิกปุ่ม 'สมัครสมาชิก' เท่ากับว่าคุณยอมรับ"}
            {/* <Link to="/term" className="underline">
              {"ขอกำหนดและเงื่อนไข"}
            </Link> */}

            <Button variant="link" asChild className="p-0">
              <Link to="/term">{"ขอกำหนดและเงื่อนไข"}</Link>
            </Button>

            {"การใช้งานการเป็นสมาชิกของเว็ปไซค์ IKEA-DeskShop เรียบร้อยแล้ว"}
          </p>

          <p>
            {"This site is protected by reCAPTCHA and the Google "}
            <Button variant="link" asChild className="p-0">
              <a href="https://policies.google.com/privacy" target="_blank">
                {"Privacy Policy"}
              </a>
            </Button>
            {/* <a
              href="https://policies.google.com/privacy"
              target="_blank"
              className="underline"
            >
              {"Privacy Policy"}
            </a> */}
            {" and "}
            <Button variant="link" asChild className="p-0">
              <a href="https://policies.google.com/terms" target="_blank">
                {"Terms of Service"}
              </a>
            </Button>
            {/* <a
              href="https://policies.google.com/terms"
              target="_blank"
              className="underline"
            >
              {"Terms of Service"}
            </a> */}
            {" apply."}
          </p>
        </div>
      </div>
    </motion.div>
  );
}
