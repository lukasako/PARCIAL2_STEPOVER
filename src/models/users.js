import bcrypt from "bcryptjs";

let users = [];

const initialUsers = [
  {
    id: 1,
    username: "admin",
    password: "admin123",
    name: "Administrador General",
    role: "admin",
    area: "General",
  },
  {
    id: 2,
    username: "boss",
    password: "boss123",
    name: "María González",
    role: "boss",
    area: "Recursos Humanos",
  },
  {
    id: 3,
    username: "boss2",
    password: "boss123",
    name: "Juan Pérez",
    role: "boss",
    area: "Soporte",
  },
  {
    id: 4,
    username: "emp",
    password: "emp123",
    name: "Lucía Ríos",
    role: "employee",
    area: "Recursos Humanos",
  },
  {
    id: 5,
    username: "emp2",
    password: "emp123",
    name: "Tomás Blanco",
    role: "employee",
    area: "Recursos Humanos",
  },
  {
    id: 6,
    username: "emp3",
    password: "emp123",
    name: "Ana Morales",
    role: "employee",
    area: "Desarrolladores",
  },
  {
    id: 7,
    username: "emp4",
    password: "emp123",
    name: "Carlos Díaz",
    role: "employee",
    area: "Soporte",
  },
];

//ejecutar este seedeer cuando subo el serv
export const initializeUsers = async () => {
  users = await Promise.all(
    initialUsers.map(async (user) => {
      const hashedPassword = await bcrypt.hash(user.password, 10);
      return {
        ...user,
        password: hashedPassword,
      };
    })
  );

  console.log("Usuarios iniciados correctamente");
};

export const getUsers = () => users;