import { renderToStaticMarkup } from 'react-dom/server';
import swal from 'sweetalert';
import SweetAlert from 'sweetalert-react'; 
import 'sweetalert/dist/sweetalert.css';

<SweetAlert
    animation: PropTypes.oneOfType([ true, fales, 'pop', 'slide-from-top', 'slide-from-bottom' ])
    cancelButtonText: PropTypes.string,
    confirmButtonColor: PropTypes.string,
    confirmButtonText: PropTypes.string,
    customClass: PropTypes.string,
    html: PropTypes.bool,
    imageSize: PropTypes.string,
    imageUrl: PropTypes.string,
    inputPlaceholder: PropTypes.string,
    inputType: PropTypes.oneOf(ALLOWS_INPUT_TYPES),
    inputValue: PropTypes.string,
    onCancel: PropTypes.func,
    onClose: PropTypes.func,
    onConfirm: PropTypes.func, --- swal.showInputError('You need to write something!');
    onEscapeKey: PropTypes.func,
    onOutsideClick: PropTypes.func,
    show: PropTypes.bool,
    showCancelButton: PropTypes.bool,
    showConfirmButton: PropTypes.bool,
    showLoaderOnConfirm: PropTypes.bool,
    text: PropTypes.string --- text={renderToStaticMarkup(<HelloWorld />)}
    title: PropTypes.string.isRequired,
    type: PropTypes.oneOf(['warning', 'error', 'success', 'info', 'input']),
/>;