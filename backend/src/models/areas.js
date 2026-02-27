let areas = ["Recursos Humanos", "Finanzas", "Soporte", "Desarrolladores", "General"];

export const getAreas = () => areas;

export const addArea = (area) => {
  if (!areas.includes(area)) {
    areas.push(area);
  }
  return areas;
};

export const deleteArea = (area) => {
  areas = areas.filter(a => a !== area);
  return areas;
};