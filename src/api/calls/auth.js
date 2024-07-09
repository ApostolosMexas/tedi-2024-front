import apiHelper from "../config/apiHelper";
import { authAxios } from "../config/axiosUtils";
import { showAlertError } from "../config/exceptionHandler";

export const apiCalls = {
  Authentication: {
    login: async (email, password) => {
      console.log(process.env)
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