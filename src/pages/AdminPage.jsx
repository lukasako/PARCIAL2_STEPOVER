import React, { useState } from "react";
import "../styles/panel.css";
import { getUsers, createUser, updateUser, deleteUser } from "../services/userService";
import { getRoles, createRole } from "../services/roleService";
import { getAreas, createArea } from "../services/areaService";
import { getFoods, createFood, updateFood, deleteFood } from "../services/foodService";
import { useEffect } from "react";

export default function AdminPage() {
  const [users, setUsers] = useState([]);
  const [foods, setFoods] = useState([]);
  const [roles, setRoles] = useState([]);
  const [areas, setAreas] = useState([]);

  const [newFood, setNewFood] = useState("");
  const [pageUsers, setPageUsers] = useState(1);
  const [pageFoods, setPageFoods] = useState(1);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showRoleModal, setShowRoleModal] = useState(false);
  const [showAreaModal, setShowAreaModal] = useState(false);
  const [newRole, setNewRole] = useState("");
  const [newArea, setNewArea] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [formData, setFormData] = useState({ id: "", username: "", name: "", password: "", area: "", role: "" });

  const itemsPerPage = 5;
  const totalPagesUsers = Math.ceil(users.length / itemsPerPage);
  const visibleUsers = users.slice((pageUsers - 1) * itemsPerPage, pageUsers * itemsPerPage);
  const totalPagesFoods = Math.ceil(foods.length / itemsPerPage);
  const visibleFoods = foods.slice((pageFoods - 1) * itemsPerPage, pageFoods * itemsPerPage);

  useEffect(() => {
    loadUsers();
    loadRoles();
    loadAreas();
    loadFoods();
  }, []);

  const loadRoles = async () => {
    try {
      const data = await getRoles();
      setRoles(data);
    } catch (error) {
      console.error("Error cargando roles", error);
    }
  };

  const loadFoods = async () => {
    try {
      const data = await getFoods();
      setFoods(data);
    } catch (error) {
      console.error("Error cargando comidas", error);
    }
  };

  const loadAreas = async () => {
    try {
      const data = await getAreas();
      setAreas(data);
    } catch (error) {
      console.error("Error cargando áreas", error);
    }
  };

  const loadUsers = async () => {
    try {
      const data = await getUsers();
      setUsers(data);
    } catch (error) {
      console.error("Error cargando usuarios", error);
    }
  };

  const handleAddFood = (e) => {
    if (e.key === "Enter" && newFood.trim()) {
      setFoods([...foods, newFood.trim()]);
      setNewFood("");
    }
  };

  const handleOpenEditModal = (user) => {
    setSelectedUser(user);
    setFormData({ ...user, password: "" });
    setShowEditModal(true);
  };

  const handleSaveEdit = async () => {
    try {
      await updateUser(selectedUser.id, formData);
      setShowEditModal(false);
      loadUsers();
    } catch (error) {
      console.error("Error actualizando usuario", error);
    }
  };

  const handleDeleteUser = async () => {
    try {
      await deleteUser(selectedUser.id);
      setShowEditModal(false);
      loadUsers();
    } catch (error) {
      console.error("Error borrando usuario", error);
    }
  };

  const handleOpenCreateModal = () => {
    setFormData({ id: "", username: "", name: "", password: "", area: "", role: "" });
    setShowCreateModal(true);
  };

  const handleSaveNewUser = async () => {
    try {
      await createUser(formData);
      setShowCreateModal(false);
      loadUsers();
    } catch (error) {
      console.error("Error creando usuario", error);
    }
  };

  const handleSaveNewRole = async () => {
    try {
      await createRole(newRole);
      setShowRoleModal(false);
      setNewRole("");
      loadRoles();
    } catch (error) {
      console.error("Error creando rol", error);
    }
  };

  const handleSaveNewArea = async () => {
    try {
      await createArea(newArea);
      setShowAreaModal(false);
      setNewArea("");
      loadAreas();
    } catch (error) {
      console.error("Error creando área", error);
    }
  };

  const handleSaveNewFood = async () => {
    try {
      await createFood(newFood);
      setShowFoodModal(false);
      setNewFood({ name: "", description: "", price: "" });
      loadFoods();
    } catch (error) {
      console.error("Error creando comida", error);
    }
  };

  const handleSaveEditFood = async () => {
    try {
      await updateFood(selectedFood.id, foodFormData);
      setShowEditFoodModal(false);
      loadFoods();
    } catch (error) {
      console.error("Error actualizando comida", error);
    }
  };

  const handleDeleteFood = async () => {
    try {
      await deleteFood(selectedFood.id);
      setShowEditFoodModal(false);
      loadFoods();
    } catch (error) {
      console.error("Error eliminando comida", error);
    }
  };

  const stats = {
    activeUsers: users.length,
    bosses: users.filter((u) => u.role === "boss").length,
    employees: users.filter((u) => u.role === "employee").length,
    totalFoods: foods.length,
  };

  return (
    <div className="admin-page">
      <section>
        <h2>Gestión General</h2>
        <div className="action-buttons">
          <button className="btn-primary" onClick={handleOpenCreateModal}>Agregar usuario</button>
          <button className="btn-primary" onClick={() => setShowRoleModal(true)}>Agregar Rol</button>
          <button className="btn-primary" onClick={() => setShowAreaModal(true)}>Agregar Área</button>
        </div>
      </section>

      <section>
        <h2>Usuarios Registrados</h2>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Usuario</th>
              <th>Nombre</th>
              <th>Área</th>
              <th>Rol</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {visibleUsers.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.username}</td>
                <td>{user.name}</td>
                <td>{user.area}</td>
                <td>{user.role}</td>
                <td className="action-buttons">
                  <button className="btn-more" onClick={() => handleOpenEditModal(user)}>...</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="pagination">
          <button disabled={pageUsers === 1} onClick={() => setPageUsers(pageUsers - 1)} className="btn-outline">Anterior</button>
          <span>Página {pageUsers} de {totalPagesUsers}</span>
          <button disabled={pageUsers === totalPagesUsers} onClick={() => setPageUsers(pageUsers + 1)} className="btn-outline">Siguiente</button>
        </div>
      </section>

      <section>
        <h2>Comidas Registradas</h2>
        <div className="food-list">
          {visibleFoods.map((food, index) => (
            <div key={index} className="food-item">
              <span>{food}</span>  
            </div>
          ))}
        </div>

        <div className="pagination">
          <button disabled={pageFoods === 1} onClick={() => setPageFoods(pageFoods - 1)} className="btn-outline">Anterior</button>
          <span>Página {pageFoods} de {totalPagesFoods}</span>
          <button disabled={pageFoods === totalPagesFoods} onClick={() => setPageFoods(pageFoods + 1)} className="btn-outline">Siguiente</button>
        </div>

        <input
          type="text"
          value={newFood}
          placeholder="Agregar nueva comida y presionar Enter"
          onChange={(e) => setNewFood(e.target.value)}
          onKeyDown={handleAddFood}
          className="food-input"
        />
      </section>

      <section>
        <h2>Estadísticas</h2>
        <div className="stats-grid">
          <div className="stat-card">
            <span className="stat-label">Usuarios activos</span>
            <span className="stat-value">{stats.activeUsers}</span>
          </div>
          <div className="stat-card">
            <span className="stat-label">Jefes</span>
            <span className="stat-value">{stats.bosses}</span>
          </div>
          <div className="stat-card">
            <span className="stat-label">Empleados</span>
            <span className="stat-value">{stats.employees}</span>
          </div>
          <div className="stat-card">
            <span className="stat-label">Opciones registradas</span>
            <span className="stat-value">{stats.totalFoods}</span>
          </div>
        </div>
      </section>

      {showEditModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Editar Usuario</h3>
            <input type="text" placeholder="Nombre" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
            <input type="text" placeholder="Username" value={formData.username} onChange={(e) => setFormData({ ...formData, username: e.target.value })} />
            <input type="password" placeholder="Contraseña" value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} />
            <select value={formData.area} onChange={(e) => setFormData({ ...formData, area: e.target.value })}>
              <option value="">Seleccionar área</option>
              {areas.map((a) => <option key={a} value={a}>{a}</option>)}
            </select>
            <select value={formData.role} onChange={(e) => setFormData({ ...formData, role: e.target.value })}>
              <option value="">Seleccionar rol</option>
              {roles.map((r) => <option key={r} value={r}>{r}</option>)}
            </select>
            <div className="modal-actions">
              <button className="btn-primary" onClick={handleSaveEdit}>Guardar</button>
              <button className="btn-danger" onClick={handleDeleteUser}>Borrar</button>
              <button className="btn-outline" onClick={() => setShowEditModal(false)}>Cancelar</button>
            </div>
          </div>
        </div>
      )}

      {showCreateModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Crear Nuevo Usuario</h3>
            <input type="text" placeholder="Username" value={formData.username} onChange={(e) => setFormData({ ...formData, username: e.target.value })} />
            <input type="text" placeholder="Nombre" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
            <input type="password" placeholder="Contraseña" value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} />
            <select value={formData.area} onChange={(e) => setFormData({ ...formData, area: e.target.value })}>
              <option value="">Seleccionar área</option>
              {areas.map((a) => <option key={a} value={a}>{a}</option>)}
            </select>
            <select value={formData.role} onChange={(e) => setFormData({ ...formData, role: e.target.value })}>
              <option value="">Seleccionar rol</option>
              {roles.map((r) => <option key={r} value={r}>{r}</option>)}
            </select>
            <div className="modal-actions">
              <button className="btn-primary" onClick={handleSaveNewUser}>Guardar</button>
              <button className="btn-outline" onClick={() => setShowCreateModal(false)}>Cancelar</button>
            </div>
          </div>
        </div>
      )}

      {showRoleModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Agregar Nuevo Rol</h3>
            <input type="text" placeholder="Nombre del rol" value={newRole} onChange={(e) => setNewRole(e.target.value)} />
            <div className="modal-actions">
              <button className="btn-primary" onClick={handleSaveNewRole}>Agregar</button>
              <button className="btn-outline" onClick={() => setShowRoleModal(false)}>Cancelar</button>
            </div>
          </div>
        </div>
      )}

      {showAreaModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Agregar Nueva Área</h3>
            <input type="text" placeholder="Nombre del área" value={newArea} onChange={(e) => setNewArea(e.target.value)} />
            <div className="modal-actions">
              <button className="btn-primary" onClick={handleSaveNewArea}>Agregar</button>
              <button className="btn-outline" onClick={() => setShowAreaModal(false)}>Cancelar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
