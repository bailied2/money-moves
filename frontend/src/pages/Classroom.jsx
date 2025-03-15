import React, { useContext, useEffect, useState } from "react";

import StudentAccounts from "../components/StudentAccounts";

import { AuthContext } from "../AuthContext";
import { ClassroomContext } from "../ClassroomContext";

const Classroom = () => {
  const { user, user_loading } = useContext(AuthContext);
  const { classroom, classroom_loading } = useContext(ClassroomContext);

  if (user_loading) return <p>Loading...</p>;
  if (classroom_loading) return <p>Loading...</p>;

  return (
    <div>
      <h1>{classroom?.class_name}</h1>
      {user && (
        <div>
          <h1>Welcome, {user.first_name}!</h1>
          <p>Email: {user.email}</p>
          <p>User ID: {user.id}</p>
        </div>
      )}
      <StudentAccounts />
    </div>
  );
};

export default Classroom;
