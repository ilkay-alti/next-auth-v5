"use client";

import React, { startTransition, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import CardWrapper from "./card-wrapper";
import { NewPasswordSchema, TNewPasswordSchema } from "@/utils/schemas/types";
import { useSearchParams } from "next/navigation";
import { newPassword } from "@/actions/new-password";

const NewPasswordForm = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<TNewPasswordSchema>({ resolver: zodResolver(NewPasswordSchema) });

  const [serverError, setServerError] = useState<any | null>(null);
  const [serverSuccess, setServerSuccess] = useState<any | null>(null);

  const onSubmit = async (value: TNewPasswordSchema) => {
    if (!token) {
      setServerError("Missing token");
      return;
    }
    newPassword(value.password, token).then((data) => {
      setServerError(data.error);
      setServerSuccess(data.success);
    });

    reset();
  };
  return (
    <CardWrapper
      headerLabel="🎄 Enter a new password"
      page=" New Password "
      backButtonLabel="Back To Login"
      backButtonHref="/auth/login"
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-y-6 "
      >
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
          Reset Password
        </button>
      </form>
    </CardWrapper>
  );
};

export default NewPasswordForm;
