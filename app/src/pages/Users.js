import React from "react";
import { useState, useEffect } from "react";
// import SignOutButton from "../components/SignOutButton";
import axiosConfig from "../services/axiosConfig";
// import { Link } from "react-router-dom";
import Card from "../components/Card";
import Header from "../components/Header";


const Users = () => {
  let [userList, setuserList] = useState(null);
  let [isLoading, setLoading] = useState(false);
  let [isError, setError] = useState(false);

  // fetch user accounts from database
  // check whether admin
  useEffect(() => {
    axiosConfig
      .get(`/users`, {
        // headers: { Authorization: "Bearer " + auth.token },
      })
      .then((result) => {
        console.log(result);
        setuserList(result.data);
        setLoading(false);
        setError(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
        setError(true);
      });
  }, []);

  console.log(userList);

  return (
    <div class="w-full">
      <Header />
      <div class="sm:container mx-auto">
        {userList?.length > 0 ? (
          <div class="grid gap-4 grid-cols-3">
            {userList.map((user) => {
              return <Card user={user} />;
            })}
          </div>
        ) : (
          "No users found."
        )}
      </div>
    </div>
  );
};

export default Users;