"use client";
import React from "react";
import CardWrapper from "./card-wrapper";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { registerSchema, TRegisterSchema } from "@/schemas/types";
const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<TRegisterSchema>({ resolver: zodResolver(registerSchema) });

  const onSubmit = async (data: TRegisterSchema) => {
    console.log(data);
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
        />
        {errors.username && (
          <p className="text-red-500 ">{`${errors.username.message}`}</p>
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
        <input
          {...register("confirmPassword")}
          type="password"
          placeholder="Confirm Password"
          className="rounded p-2"
        />
        {errors.confirmPassword && (
          <p className="text-red-500 ">{`${errors.confirmPassword.message}`}</p>
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
