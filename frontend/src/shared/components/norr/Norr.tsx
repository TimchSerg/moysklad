import React, { useEffect } from "react";
import { useNorr } from "hooks/useNorr";
import { useDispatch } from "react-redux";
import { hideNorr } from "features/norr/slice";
import Norr, { SeverityType } from ".";

export const NorrComponent: React.FC<any> = () => {
  const { show, severity, message } = useNorr();
  const dispatch = useDispatch();

  useEffect(()=> {
    if(show) setTimeout(()=> dispatch(hideNorr()), 5000)
  }, [show]) // eslint-disable-line react-hooks/exhaustive-deps

  return <Norr show={show} severity={severity as SeverityType} message={message} />
}

export default NorrComponent;