import axios from "axios";
import apiHelper from "../config/apiHelper";
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
          axios.create({
            baseURL: process.env.REACT_APP_API_LINK,
            headers: {
              "Content-Type": "multipart/form-data",
              "Authorization": `Bearer ${localStorage.getItem('tedi-token')}`,
            },
          })
        );
      } catch (error) {
        console.log(error);
        showAlertError("Η δημιουργία νέου χρήστη ήταν ανεπιτυχής", error);
      }
    },
    getUser: async (userId) => {
      try {
        return await apiHelper.get(
          `users/${userId}`,
          {},
          axios.create({
            baseURL: process.env.REACT_APP_API_LINK,
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${localStorage.getItem('tedi-token')}`,
            }
          })
        );
      } catch (error) {
        showAlertError("Η ανάκτηση του δικτύου ήταν ανεπιτυχής", error);
      }
    },
    getNetwork: async (userId) => {
      try {
        return await apiHelper.get(
          `users/${userId}/network`,
          {},
          axios.create({
            baseURL: process.env.REACT_APP_API_LINK,
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${localStorage.getItem('tedi-token')}`,
            }
          })
        );
      } catch (error) {
        showAlertError("Η ανάκτηση του δικτύου ήταν ανεπιτυχής", error);
      }
    },
    getTimeline: async (userId) => {
      try {
        return await apiHelper.get(
          `users/${userId}/timeline`,
          {},
          axios.create({
            baseURL: process.env.REACT_APP_API_LINK,
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${localStorage.getItem('tedi-token')}`,
            }
          })
        );
      } catch (error) {
        showAlertError("Η ανάκτηση του χρονολογίου ήταν ανεπιτυχής", error);
    get_all_users: async () => {
      try {
        return await apiHelper.get(
          'users/',
          axios.create({
            baseURL: process.env.REACT_APP_API_LINK,
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${localStorage.getItem('tedi-token')}`,
            }
          })
        );
      } catch (error) {
        showAlertError("Αδυναμία φόρτωσης χρηστών", error);
      }
    },
  },
};