export const routeMatcher = (pathname: string, route: string) => {
  return new RegExp(route.replace(/:[^\s/]+/g, "([\\w-]+)")).test(pathname);
};
