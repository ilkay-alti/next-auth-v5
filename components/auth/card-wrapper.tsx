import React, { FC } from "react";
import Social from "./social";
import BackButton from "./back-button";

interface CardWrapperProps {
  children: React.ReactNode;
  headerLabel: string;
  backButtonLabel: string;
  backButtonHref: string;
  showSocial?: boolean;
  page: string;
}

const CardWrapper: FC<CardWrapperProps> = ({
  children,
  headerLabel,
  backButtonLabel,
  backButtonHref,
  showSocial = false,
  page,
}) => {
  return (
    <div className="flex flex-col p-8 bg-slate-200 w-[400px] shadow-md gap-8">
      {/**  //! Card Header */}
      <div className="flex w-full flex-col gap-y-2 items-center justify-center ">
        <h1 className="text-3xl font-semibold">{page} Page</h1>
        <p className="text-sm ">{headerLabel}</p>
      </div>
      {/* //! Card Content */}
      <div>{children}</div>
      {/* //! Card Social */}
      {showSocial && <Social />}
      {/* //! Card Footer */}
      <div className="flex items-center justify-center w-full ">
        <BackButton href={backButtonHref} label={backButtonLabel} />
      </div>
    </div>
  );
};

export default CardWrapper;
