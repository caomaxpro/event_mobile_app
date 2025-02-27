export const log = (label: string, ...messages: any[]): void => {
  console.log(`[${label}]:`, ...messages);
};

export const warn = (label: string, ...messages: any[]): void => {
  console.log(`[${label}]:`, ...messages);
};

export const error = (label: string, ...messages: any[]): void => {
  console.log(`[${label}]:`, ...messages);
};