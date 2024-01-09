"use client";
import React from "react";
import CardWrapper from "./card-wrapper";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { loginSchema, TLoginSchema } from "@/schemas/types";

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<TLoginSchema>({ resolver: zodResolver(loginSchema) });

  const onSubmit = async (data: TLoginSchema) => {
    console.log(data);
    reset();
  };
  return (
    <CardWrapper
      headerLabel="🎄 Welcome back"
      backButtonLabel="Create an account"
      page="Login"
      backButtonHref="/auth/register"
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
