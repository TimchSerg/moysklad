import React from "react";

import { ProgressSpinner } from "primereact/progressspinner";

interface IWrapperProps{
  progress: boolean;
  children: React.ReactNode;
  position?: string | undefined;
}

export const WrapperSpinner: React.FC<IWrapperProps> = (props: any) => {
  const { progress, children, position = "" } = props;

  return (
    <>
      {
        progress
        ? (
          <div className={`wrapper-spinner ${progress ? "filter-blur" : ""}`}>
            <div className={position === "center" ? "c-absolute-center" : "c-absolute-top"} >
              <ProgressSpinner
                className="main-progress_spinner"
                strokeWidth="8"
                fill="#ffffff00"
                animationDuration=".5s"
              />
            </div>
          </div>
        )
        : children
      }
    </>
  );
}

