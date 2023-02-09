import React from "react";
// import axiosConfig from "../services/axiosConfig";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../services/useAuth";

export default function Home() {
  const auth = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);

  const handleLogin = async () => {
    // axiosConfig
    //   .post("/users/login", {
    //     email: email,
    //     password: password,
    //   })
    //   .then((result) => {
    //     console.log(result);
    //     localStorage.setItem("token", result.data.token);
    //     navigate("/users");
    //     // localStorage.setItem("refresh", result.data.refresh);
    //     // console.log("CREATED REFRESH TOKEN: ", result.data.refresh);
    //     // setRefresh(result.data.refresh);
    //     // setUser(result.data.userId);
    //     // setToken(result.data.token);
    //     // success();
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //     // clear();
    //     // failure();
    //   });
    const resp = await auth.login(email, password);
    console.log(resp);
    // navigate("/users");
    // auth
    //   .login({
    //     email: email,
    //     password: password,
    //   })
    //   .then((res) => {
    //     if (res?.status === 200) {
    //       // add usecontext
    //     }
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
  };

  return (
    <div>
      <div class="min-h-screen bg-gray-100 flex flex-col justify-center sm:py-12">
        <div class="p-10 xs:p-0 mx-auto md:w-full md:max-w-md">
          <h1 class="font-bold text-center text-2xl mb-5">Identity Manager</h1>
          <div class="bg-white shadow w-full space-y-2 rounded-lg divide-y divide-solid">
            <div class="px-5 py-5">
              <label class="font-semibold text-gray-600 block">Email</label>
              <input
                onChange={(e) => setEmail(e.target.value)}
                type="text"
                class="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
              />
              <label class="font-semibold text-gray-600 block">Password</label>
              <input
                onChange={(e) => setPassword(e.target.value)}
                type="password"
                class="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
              />
              <button
                onClick={handleLogin}
                type="button"
                class="ml-auto transition duration-200 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg w-full font-semibold text-center inline-block"
              >
                <span class="inline-block mx-3">Login</span>
              </button>
            </div>
            <div class="px-5 py-5 space-y-2">
              <span class="font-semibold text-gray-600 mb-3 mr-1 text-center">
                Don't have an account?
              </span>
              <a href="/signup" class="underline text-blue-600">
                Signup
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}