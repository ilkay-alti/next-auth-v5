"use client";

import React, { startTransition, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import CardWrapper from "./card-wrapper";
import { registerSchema, TRegisterSchema } from "@/utils/schemas/types";
import { registerServer } from "@/actions/register";

const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<TRegisterSchema>({ resolver: zodResolver(registerSchema) });

  const [serverError, setServerError] = useState<any | null>(null);
  const [serverSuccess, setServerSuccess] = useState<any | null>(null);

  const onSubmit = async (data: TRegisterSchema) => {
    registerServer(data).then((data) => {
      setServerError(data.error);
      setServerSuccess(data.success);
    });

    reset();
  };
  return (
    <CardWrapper
      headerLabel="🎄 Welcome back"
      backButtonLabel="Login to your account"
      page="Register"
      backButtonHref="/auth/login"
      showSocial
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-y-6 "
      >
        <input
          {...register("username")}
          type="text"
          placeholder="Username"
          className="rounded p-2"
          disabled={isSubmitting}
        />
        {errors.username && (
          <p className="text-red-500 ">{`${errors.username.message}`}</p>
        )}

        <input
          {...register("email")}
          type="email"
          placeholder="
          Email"
          disabled={isSubmitting}
          className="rounded p-2"
        />
        {errors.email && (
          <p className="text-red-500 ">{`${errors.email.message}`}</p>
        )}
        <input
          {...register("password")}
          type="password"
          placeholder="Password"
          disabled={isSubmitting}
          className="rounded p-2"
        />
        {errors.password && (
          <p className="text-red-500 ">{`${errors.password.message}`}</p>
        )}
        <input
          {...register("confirmPassword")}
          type="password"
          placeholder="Confirm Password"
          disabled={isSubmitting}
          className="rounded p-2"
        />
        {errors.confirmPassword && (
          <p className="text-red-500 ">{`${errors.confirmPassword.message}`}</p>
        )}
        {serverError && <p className="text-red-500"> {serverError}</p>}
        {serverSuccess && (
          <p className="text-green-500 ">{`${serverSuccess}`}</p>
        )}

        <button
          disabled={isSubmitting}
          type="submit"
          className=" bg-red-400 disabled:bg-gray-500 px-4 py-2 rounded-lg text-white"
        >
          Register
        </button>
      </form>
    </CardWrapper>
  );
};

export default RegisterForm;
