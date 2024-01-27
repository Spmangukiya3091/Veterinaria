import Swal from "sweetalert2";

export const success = () => {
  Swal.fire({
    title: "",
    text: "Operación completada exitosamente.",
    icon: "success",
    width: 400,
    showCancelButton: false,
    confirmButtonColor: "#336CFB",
    confirmButtonText: "OK",
  });
};
export const failer = (message) => {
  Swal.fire({
    icon: "error",
    title: "Oops...",
    text: message ? message : "Something went wrong!",
    width: 400,
    showCancelButton: false,
    confirmButtonColor: "#336CFB",
  });
};
