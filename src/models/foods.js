let foods = [];

const initialFoods = [
  "No pedir comida",
  "Sánguche de milanesa con bebida",
  "Milanesa de pollo con ensalada",
  "Ensalada Caesar con pollo a la plancha",
  "Wrap vegano de garbanzos y palta",
  "Salteado de tofu con verduras",
  "Tarta sin gluten de espinaca",
  "Pollo al horno con papas sin TACC",
];

export const initializeFoods = () => {
  foods = [...initialFoods];
  console.log("Lista de comidas inicializada");
};

export const getFoods = () => foods;