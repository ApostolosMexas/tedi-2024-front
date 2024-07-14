import axios from "axios";
import apiHelper from "../config/apiHelper";
import { showAlertError } from "../config/exceptionHandler";

export const apiCallsUser = {
  User: {
    get_all_users: async () => {
      try {
        return await apiHelper.get(
          'users',{},
          axios.create({
            baseURL: process.env.REACT_APP_API_LINK,
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${localStorage.getItem('tedi-token')}`,
            }
          })
        );
      } catch (error) {
        showAlertError('error', "Αδυναμία φόρτωσης χρηστών", error);
      }
    },
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
        showAlertError('error', "Η δημιουργία νέου χρήστη ήταν ανεπιτυχής", error);
      }
    },
    updateUser: async (userId, email, password, userUpdate) => {
      try {
        const formData = new FormData();
        formData.append('email', email);
        formData.append('password', password);
        formData.append('user_update', JSON.stringify(userUpdate));

        const response = await apiHelper.post(
          `users/${userId}`,
          formData,
          axios.create({
            baseURL: process.env.REACT_APP_API_LINK,
            headers: {
              "Content-Type": "multipart/form-data",
              "Authorization": `Bearer ${localStorage.getItem('tedi-token')}`,
            }
          })
        );
        
        showAlertError('success', "Η ενημέρωση των στοιχείων ήταν επιτυχής", '');
        return response;
      } catch (error) {
        showAlertError('error', "Η ενημέρωση των στοιχείων ήταν ανεπιτυχής", error);
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
        showAlertError('error', "Η ανάκτηση του δικτύου ήταν ανεπιτυχής", error);
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
        showAlertError('error', "Η ανάκτηση του δικτύου ήταν ανεπιτυχής", error);
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
        showAlertError('error', "Η ανάκτηση του χρονολογίου ήταν ανεπιτυχής", error);
      }
    },
    getChats: async (userId) => {
      try {
        return await apiHelper.get(
          `users/${userId}/chats`,
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
        showAlertError('error', "Η ανάκτηση των συζητήσεων ήταν ανεπιτυχής", error);
      }
    },
    getChat: async (userId, connectionId) => {
      try {
        return await apiHelper.get(
          `users/${userId}/chats/${connectionId}`,
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
        showAlertError('error', "Η ανάκτηση της συζήτησης ήταν ανεπιτυχής", error);
      }
    },
    getConnectionRequests: async (userId, status) => {
      try {
        return await apiHelper.get(
          `connections?user_id=${userId}&connection_status=${status}`,
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
        showAlertError('error', "Η ανάκτηση της αιτημάτων σύνδεσης ήταν ανεπιτυχής", error);
      }
    },
    updateConnectionRequest: async (connectionId, connectionUpdate) => {
      try {
        return await apiHelper.post(
          `connections/${connectionId}`,
          connectionUpdate,
          axios.create({
            baseURL: process.env.REACT_APP_API_LINK,
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${localStorage.getItem('tedi-token')}`,
            }
          })
        );
      } catch (error) {
        showAlertError('error', "Η αποδοχή του αιτήματος σύνδεσης ήταν ανεπιτυχής", error);
      }
    },
    getPostActivity: async (userId, limit, page) => {
      try {
        return await apiHelper.get(
          `notifications?receiver_id=${userId}&limit=${limit}&page=${page}`,
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
        showAlertError('error', "Η ανάκτηση της δραστηριότητας δημοσιέυσεων ήταν ανεπιτυχής", error);
      }
    },
    createConnectionRequest: async (request) => {
      try {
        return await apiHelper.post(
          "connections/",
          request,
          axios.create({
            baseURL: process.env.REACT_APP_API_LINK,
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${localStorage.getItem('tedi-token')}`,
            }
          })
        );
      } catch (error) {
        showAlertError('error', "Η δημιουργία αιτήματος σύνδεσης ήταν ανεπιτυχής", error);
      }
    },
  },
};