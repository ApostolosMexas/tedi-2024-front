import apiHelper from "../config/apiHelper";
import { authAxios } from "../config/axiosUtils";
import { showAlertError } from "../config/exceptionHandler";

export const apiCallsAuth = {
  Authentication: {
    login: async (email, password) => {
      try {
        return await apiHelper.post(
          'auth/token',
          {
            username: email,
            password: password,
          },
          authAxios
        );
      } catch (error) {
        showAlertError("Η αυθεντικοποίηση ήταν ανεπιτυχής", error);
      }
    }
  },
};