import Swal from 'sweetalert2';

const SuccessMsg = ({ message }) => {
  Swal.fire({
    icon: 'success',
    title: 'Successfully Login',
    text: message,
  });
};

export default SuccessMsg;
