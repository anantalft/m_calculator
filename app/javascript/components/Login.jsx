import React from 'react';
import { useRef, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import useAuth from '../hooks/useAuth'

const Login = () => {
  const { setAuth } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const userRef = useRef();
  const errRef = useRef();

  const [user, setUser] = useState('');
  const [pwd, setPwd] = useState('');
  const [errMsg, setErrMsg] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // todo call rails api to authenticate
      // console.log(JSON.stringify(response?.data));
      const accessToken = "abcdefg"; //response?.data?.accessToken;
      const roles = ["Quote"]; //response?.data?.roles;
      setUser("ananta")
      setPwd("ananta")
      setAuth({ user, pwd, roles, accessToken });
      setUser('');
      setPwd('');
      navigate(from, { replace: true });
    } catch (err) {
      if (!err?.response) {
        setErrMsg('No Server Response');
      } else if (err.response?.status === 400) {
        setErrMsg('Missing Username or Password');
      } else if (err.response?.status === 401) {
        setErrMsg('Unauthorized');
      } else {
        setErrMsg('Login Failed');
      }
      errRef.current.focus();
    }
  }

  const handleSignOut = async (e) => {
    setAuth('');
    navigate(from, { replace: true });
  }

  return (

  <section>
    <h1>Sign In</h1>
    <form onSubmit={handleSubmit}>
      <button>Sign In</button>
    </form>
    <form onSubmit={handleSignOut}>
      <button>Sign out</button>
    </form>
  </section>
  )
}
export default Login
