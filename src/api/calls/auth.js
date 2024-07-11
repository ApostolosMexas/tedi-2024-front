import axios from "axios";
import apiHelper from "../config/apiHelper";
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
          axios.create({
            baseURL: process.env.REACT_APP_API_LINK,
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
          })
        );
      } catch (error) {
        showAlertError("Η αυθεντικοποίηση ήταν ανεπιτυχής", error);
      }
    }
  },
};