export const sleep = async (speed: number) =>
  await new Promise((resolve) => setTimeout(resolve, 101 - speed));
