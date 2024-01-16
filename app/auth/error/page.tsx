import CardWrapper from "@/components/auth/card-wrapper";
import React from "react";

const ErrorPage = () => {
  return (
    <div className="text-center">
      <CardWrapper
        headerLabel="🎄 Error Page"
        backButtonLabel="Go to Login"
        page="Errorr"
        backButtonHref="/auth/login"
      >
        <div>Errrorrrrr</div>
      </CardWrapper>
    </div>
  );
};

export default ErrorPage;
