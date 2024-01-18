"use client";
import React, { useState } from "react";
import CardWrapper from "./card-wrapper";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  ResetPasswordSchema,
  TResetPasswordSchema,
} from "@/utils/schemas/types";
import { login } from "@/actions/login";
import Link from "next/link";
import { resetPassword } from "@/actions/reset-password";

const ResetForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<TResetPasswordSchema>({
    resolver: zodResolver(ResetPasswordSchema),
  });

  const [serverError, setServerError] = useState<any | null>(null);
  const [serverSuccess, setServerSuccess] = useState<any | null>(null);

  const onSubmit = async (email: TResetPasswordSchema) => {
    resetPassword(email).then((data) => {
      setServerError(data.error);
      setServerSuccess(data.success);
    });

    reset();
  };
  return (
    <>
      <CardWrapper
        headerLabel="🎄 Forgot your password?"
        backButtonLabel="Back to login"
        page="Forgot Password"
        backButtonHref="/auth/login"
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

          {serverError && <p className="text-red-500"> {serverError}</p>}
          {serverSuccess && (
            <p className="text-green-500 ">{`${serverSuccess}`}</p>
          )}

          <button
            disabled={isSubmitting}
            type="submit"
            className=" bg-red-400 disabled:bg-gray-500 px-4 py-2 rounded-lg text-white"
          >
            Send Reset Email
          </button>
        </form>
      </CardWrapper>
    </>
  );
};

export default ResetForm;
