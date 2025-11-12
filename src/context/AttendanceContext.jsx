import { createContext, useContext, useState, useEffect } from "react";

const AttendanceContext = createContext();
export const useAttendance = () => useContext(AttendanceContext);

export const AttendanceProvider = ({ children }) => {
  const [attendanceData, setAttendanceData] = useState(() => {
    const saved = localStorage.getItem("attendanceData");
    return saved ? JSON.parse(saved) : {};
  });

  const updateAttendance = (userId, days) => {
    const updated = { ...attendanceData, [userId]: { ...attendanceData[userId], days } };
    setAttendanceData(updated);
  };

  const updateMenu = (userId, menus) => {
    const updated = { ...attendanceData, [userId]: { ...attendanceData[userId], menus } };
    setAttendanceData(updated);
  };

  useEffect(() => {
    localStorage.setItem("attendanceData", JSON.stringify(attendanceData));
  }, [attendanceData]);

  return (
    <AttendanceContext.Provider value={{ attendanceData, updateAttendance, updateMenu }}>
      {children}
    </AttendanceContext.Provider>
  );
};
