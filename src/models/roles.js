let roles = ["admin", "boss", "employee"];

export const getRoles = () => roles;

export const addRole = (role) => {
  if (!roles.includes(role)) {
    roles.push(role);
  }
  return roles;
};

export const deleteRole = (role) => {
  roles = roles.filter(r => r !== role);
  return roles;
};