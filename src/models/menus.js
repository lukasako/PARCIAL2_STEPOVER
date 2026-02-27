let menus = [];

export const getMenuByUser = (userId) => {
  return menus.find(m => m.userId === userId);
};

export const saveMenu = (userId, selections) => {
  const existing = menus.find(m => m.userId === userId);

  if (existing) {
    existing.selections = selections;
    return existing;
  }

  const newMenu = { userId, selections };
  menus.push(newMenu);
  return newMenu;
};