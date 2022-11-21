import { Navigate, Outlet, Route, Routes } from 'react-router-dom';
import { useEffect, useMemo, useState } from 'react';

const PrivateRouteUser = () => {
  const [eauth, setAuth] = useState(false);
  const [loading, setLoading] = useState(true);
  
  
  useEffect(() => {
    var tmp = "/user/auth/user";
    console.log(tmp);

    fetch(tmp, {
      method:"GET",
      cache: "no-cache",
      headers:{
        "content_type":"application/json",
      }})
    .then(res => res.json()).then(recData => {
      console.log("DATA:",recData.level);
      if (recData.level == true) {
        console.log("hej");
        setLoading(false)
        setAuth(true)
      } else {
        console.log("ne");
        setAuth(false)
        setLoading(false)
      }
    });
  }, []);

  return (
    loading ? <div></div> : eauth ? <Outlet/> : <Navigate to="/"/>
  );
}

export default PrivateRouteUser;
