let attendance = [];

export const getAttendanceByUser = (userId) => {
  return attendance.find(a => a.userId === userId);
};

export const saveAttendance = (userId, days) => {
  const existing = attendance.find(a => a.userId === userId);

  if (existing) {
    existing.days = days;
    return existing;
  }

  const newAttendance = { userId, days };
  attendance.push(newAttendance);
  return newAttendance;
};