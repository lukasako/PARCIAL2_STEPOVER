import { useEffect, useState } from "react";
import { getFoods } from "../services/foodService";
import { getMenuByUser, updateMenu } from "../services/menuService";

export default function MenuSelection({ user, attendanceDays }) {
  const [mealOptions, setMealOptions] = useState([]);
  const [menus, setMenus] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const foodsData = await getFoods();
      const menuData = await getMenuByUser(user.id);

      setMealOptions(foodsData);
      setMenus(menuData.selections || {});
    } catch (error) {
      console.error("Error cargando menú", error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = async (day, meal) => {
    try {
      const updatedMenus = { ...menus, [day]: meal };
      setMenus(updatedMenus);
      await updateMenu(user.id, updatedMenus);
    } catch (error) {
      console.error("Error actualizando menú", error);
    }
  };

  if (loading) return <p>Cargando menú...</p>;

  return (
    <div>
      <h2>Mi menú semanal</h2>

      {attendanceDays.length === 0 ? (
        <p style={{ color: "#666" }}>
          No tenés días de asistencia asignados.
        </p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Día</th>
              <th>Comida</th>
            </tr>
          </thead>
          <tbody>
            {attendanceDays.map((day) => (
              <tr key={day}>
                <td>{day}</td>
                <td>
                  <select
                    value={menus[day] || ""}
                    onChange={(e) => handleChange(day, e.target.value)}
                  >
                    {mealOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}