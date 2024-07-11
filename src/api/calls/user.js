import apiHelper from "../config/apiHelper";
import { apiBaseAxios } from "../config/axiosUtils";
import { showAlertError } from "../config/exceptionHandler";

export const apiCallsUser = {
  User: {
    signup: async (email, password) => {
      try {
        return await apiHelper.post(
          'users/',
          {
            Email: email,
            Password: password,
            UserRoleId: 'c20d8929-fc91-4e48-92a0-bb3b3fff55e1',
          },
          apiBaseAxios
        );
      } catch (error) {
        showAlertError("Η δημιουργία νέου χρήστη ήταν ανεπιτυχής", error);
      }
    },
    get_all_users: async () => {
      try {
        return await apiHelper.get(
          'users/',
          apiBaseAxios
        );
      } catch (error) {
        showAlertError("Αδυναμία φόρτωσης χρηστών", error);
      }
    },
  },
};