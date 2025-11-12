import { useAuth } from "../../context/AuthContext";
import { users } from "../../data/users";

export default function MyTeam() {
  const { user } = useAuth();
  const team = users.filter(
    (u) => u.area === user.area && u.role === "employee"
  );

  return (
    <div className="team">
      <h2>Mi área: {user.area}</h2>
      <ul>
        {team.map((emp) => (
          <li key={emp.username}>
            {emp.name} ({emp.username})
          </li>
        ))}
      </ul>
    </div>
  );
}
