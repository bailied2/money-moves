import React, { createContext, useState, useEffect } from "react";
import { useParams } from "react-router";
import api from "./api";

export const ClassroomContext = createContext();

export const ClassroomProvider = ({ children }) => {
  const { id } = useParams();
  const [classroom, setClassroom] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchClassroom = async () => {
      try {
        const response = await api.get(`/classrooms/${id}`);
        setClassroom(response.data.classroom);
      } catch (error) {
        console.error("Failed to fetch profile:", error);
        setClassroom(null);
      } finally {
        setLoading(false);
      }
    };

    fetchClassroom();
  }, [id]);

  return (
    <ClassroomContext.Provider value={{ classroom, loading }}>
      {children}
    </ClassroomContext.Provider>
  );
};
