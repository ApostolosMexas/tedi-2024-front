import apiHelper from "../config/apiHelper";
import { apiBaseAxios, apiMultipartAxios } from "../config/axiosUtils";
import { showAlertError } from "../config/exceptionHandler";

export const apiCallsUser = {
  User: {
    signup: async (email, password, userInfo) => {
      try {
        const userCreate = {
          "Email": email,
          "Password": password,
          "Username": userInfo.Username,
          "Name": userInfo.Name,
          "Surname": userInfo.Surname,
          "Phone": userInfo.Phone,
          "Avatar": userInfo.Avatar.name,
          "UserRoleId": 'c20d8929-fc91-4e48-92a0-bb3b3fff55e1',
        }
        const formData = new FormData();
        formData.append('avatar', userInfo.Avatar);
        formData.append('user_create', JSON.stringify(userCreate));
        return await apiHelper.post(
          'users/',
          formData,
          apiMultipartAxios
        );
      } catch (error) {
        console.log(error);
        showAlertError("Η δημιουργία νέου χρήστη ήταν ανεπιτυχής", error);
      }
    },
    getNetwork: async (userId) => {
      try {
        return await apiHelper.get(
          `users/${userId}/network`,
          {},
          apiBaseAxios
        );
      } catch (error) {
        showAlertError("Η ανάκτηση του δικτύου ήταν ανεπιτυχής", error);
      }
    },
  },
};