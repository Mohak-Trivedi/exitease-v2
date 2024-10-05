import { authenticatedInstance } from "./axiosInstances.js";

export default async () => {
  try {
    Object.assign(authenticatedInstance.defaults, { headers: { Authorization: localStorage.getItem('token') } });
    // verify token
    let {
      data: { roles },
    } = await authenticatedInstance.get("/api/auth");
    localStorage.setItem("roles", JSON.stringify(roles));
    return {
      roles,
      isAuthenticated: true,
    };
  } catch (e) {
    console.log(">", e);
    return {
      isAuthenticated: false,
    };
  }
};
