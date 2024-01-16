"use client";
import React, { useState } from "react";
import CardWrapper from "./card-wrapper";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { loginSchema, TLoginSchema } from "@/utils/schemas/types";
import { login } from "@/actions/login";
import { useSearchParams } from "next/navigation";

const LoginForm = () => {
  const serchParams = useSearchParams();

  const urlError =
    serchParams.get("error") === "OAuthAccountNotLinked"
      ? "You have not linked your account yet"
      : null;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<TLoginSchema>({ resolver: zodResolver(loginSchema) });

  const [serverError, setServerError] = useState<any | null>(null);
  const [serverSuccess, setServerSuccess] = useState<any | null>(null);

  const onSubmit = async (data: TLoginSchema) => {
    login(data).then((data) => {
      setServerError(data.error);
      setServerSuccess(data.success);
    });
    reset();
  };
  return (
    <CardWrapper
      headerLabel="🎄 Welcome back"
      backButtonLabel="Create an account"
      page="Login"
      backButtonHref="/auth/register"
      showSocial
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-y-6 "
      >
        <input
          {...register("email")}
          type="text"
          placeholder="Email"
          className="rounded p-2"
        />
        {errors.email && (
          <p className="text-red-500 ">{`${errors.email.message}`}</p>
        )}
        <input
          {...register("password")}
          type="password"
          placeholder="Password"
          className="rounded p-2"
        />
        {errors.password && (
          <p className="text-red-500 ">{`${errors.password.message}`}</p>
        )}
        {serverError && <p className="text-red-500"> {serverError}</p>}
        {serverSuccess && (
          <p className="text-green-500 ">{`${serverSuccess}`}</p>
        )}
        {urlError && <p className="text-green-500 ">{`${urlError}`}</p>}
        <button
          disabled={isSubmitting}
          type="submit"
          className=" bg-red-400 disabled:bg-gray-500 px-4 py-2 rounded-lg text-white"
        >
          Login
        </button>
      </form>
    </CardWrapper>
  );
};

export default LoginForm;
