import axios from "axios";
import apiHelper from "../config/apiHelper";
import { showAlertError } from "../config/exceptionHandler";

export const apiCallsData = {
  Data: {
    likePost: async (userId, postId) => {
      try {
        return await apiHelper.post(
          'likes/',
          {
            UserId: userId,
            PostId: postId,
          },
          axios.create({
            baseURL: process.env.REACT_APP_API_LINK,
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${localStorage.getItem('tedi-token')}`,
            },
          })
        );
      } catch (error) {
        showAlertError("Η δήλωση ενδιαφέροντος ήταν ανεπιτυχής", error);
      }
    },
    unlikePost: async (likeId) => {
      try {
        return await apiHelper.delete(
          `likes/${likeId}`,
          {},
          axios.create({
            baseURL: process.env.REACT_APP_API_LINK,
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${localStorage.getItem('tedi-token')}`,
            },
          })
        );
      } catch (error) {
        showAlertError("Η διαγραφή της δήλωσης ενδιαφέροντος ήταν ανεπιτυχής", error);
      }
    },
    addComment: async (postId, userId, text) => {
      try {
        return await apiHelper.post(
          'comments',
          {
            Commenter: userId,
            PostId: postId,
            Data: text,
          },
          axios.create({
            baseURL: process.env.REACT_APP_API_LINK,
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${localStorage.getItem('tedi-token')}`,
            },
          })
        );
      } catch (error) {
        showAlertError("Η διαγραφή της δήλωσης ενδιαφέροντος ήταν ανεπιτυχής", error);
      }
    },
  },
};