export const existsAndIsOfType = (element: any, type: string): boolean => (
  !!element && typeof element === type);

export const safeParse = (variable: any) => {
  try {
    return JSON.parse(variable);
  } catch (err) {
    return variable;
  }
};
