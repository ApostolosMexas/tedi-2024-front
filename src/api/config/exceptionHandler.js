import Swal from "sweetalert2";

export const showAlertError = (text, error) => {
  Swal.fire({
    icon: "error",
    text: error?.response?.data.detail,
    title: text,
  });
};
