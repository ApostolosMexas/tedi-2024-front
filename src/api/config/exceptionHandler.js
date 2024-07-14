import Swal from "sweetalert2";

export const showAlertError = (type, text, error) => {
  Swal.fire({
    icon: type,
    text: error?.response?.data.detail,
    title: text,
  });
};
