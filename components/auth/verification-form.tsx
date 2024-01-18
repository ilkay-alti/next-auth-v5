"use client";
import React, { useCallback, useEffect, useState } from "react";
import CardWrapper from "./card-wrapper";
import { BeatLoader } from "react-spinners";
import { useSearchParams } from "next/navigation";
import { newVerification } from "@/actions/new-verification";

const VerificationForm = () => {
  const [error, setError] = useState<string | undefined>(undefined);
  const [success, setSuccess] = useState<string | undefined>(undefined);

  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const onSubmit = useCallback(async () => {
    if (!token) {
      setError("Missing token");
      return;
    }
    newVerification(token)
      .then((data) => {
        setSuccess(data.success);
        setError(data.error);
      })
      .catch(() => {
        setError("Something went wrong");
      });
  }, [token]);

  useEffect(() => {
    onSubmit();
  }, [onSubmit]);

  return (
    <CardWrapper
      page="Verification"
      headerLabel="Confirming your verification"
      backButtonLabel="Back To Login"
      backButtonHref="/auth/login"
    >
      <div className="text-center">
        {!error && !success && <BeatLoader />}
        {error && <p className="text-green-500 ">{`${error}`}</p>}
        {success && <p className="text-green-500 ">{`${success}`}</p>}
      </div>
    </CardWrapper>
  );
};

export default VerificationForm;
