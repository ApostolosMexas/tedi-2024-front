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
    getPosts: async (userId = null) =>{
      try { 
        return await apiHelper.get(
          'posts',{UserId: userId},
          axios.create({
            baseURL: process.env.REACT_APP_API_LINK,
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${localStorage.getItem('tedi-token')}`,
            },
          })
        );
      } catch (error) {
        showAlertError("Ανεπιτυχής φόρτωση άρθρων", error);
      }
    },
    getComments: async (userId = null) =>{
      try {
        return await apiHelper.get(
          'comments/get_all',{userId: userId},
          axios.create({
            baseURL: process.env.REACT_APP_API_LINK,
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${localStorage.getItem('tedi-token')}`,
            },
          })
        );
      } catch (error) {
        showAlertError("Ανεπιτυχής φόρτωση σχόλιων", error);
      }
    },
    getOffers: async (userId = null) =>{
      try {
        return await apiHelper.get(
          'offers',{userId : userId},
          axios.create({
            baseURL: process.env.REACT_APP_API_LINK,
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${localStorage.getItem('tedi-token')}`,
            },
          })
        );
       } catch (error) {
        showAlertError("Η δημιουργία δημοσίευσης ήταν ανεπιτυχής", error);
      }
    },
    addPost: async (userId, newPost) => {
      try {
        const formData = new FormData();

        formData.append('user_id', userId);
        formData.append('post_content', newPost.content);
        formData.append('post_title', newPost.title);
        newPost.files.forEach(file => {
          if (!(
            file.name.includes('.wav') || file.name.includes('.mp3') || file.name.includes('.docx') ||
            file.name.includes('.pdf') || file.name.includes('.txt')
          )) {
            formData.append('files', file);
          } 
        });

        return await apiHelper.post(
          'posts/',
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
        showAlertError("Ανεπιτυχής φόρτωση αγγελιών", error);
      }
    },
    sendMessage: async (message) => {
      try {
        return await apiHelper.post(
          'direct_messages/',
          message,
          axios.create({
            baseURL: process.env.REACT_APP_API_LINK,
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${localStorage.getItem('tedi-token')}`,
            },
          })
        );
      } catch (error) {
        showAlertError("Η αποστολή του μηνύματος ήταν ανεπιτυχής", error);
      }
    },
  },
};