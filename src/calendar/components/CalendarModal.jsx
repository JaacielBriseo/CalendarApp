import { addHours, differenceInSeconds } from 'date-fns';
import { useMemo, useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Modal from 'react-modal';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';
import { useUiStore } from '../../hooks/useUiStore';
const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};
Modal.setAppElement('#root');

export const CalendarModal = () => {
  const { isDateModalOpen, closeDateModal } = useUiStore();
  const [formSubmitted, setFormSubmitted] = useState(false);

  const [formValues, setFormValues] = useState({
    title: 'Jaaciel',
    notes: 'Briseño',
    start: new Date(),
    end: addHours(new Date(), 2),
  });

  const titleClass = useMemo(() => {
    if (!formSubmitted) return '';
    return formValues.title.length > 0 ? '' : 'is-invalid';
  }, [formValues.title, formSubmitted]);

  const onInputChange = ({ target }) => {
    setFormValues({
      ...formValues,
      [target.name]: target.value,
    });
  };
  const onDateChange = (event, changing) => {
    setFormValues({
      ...formValues,
      [changing]: event,
    });
  };
  const onCloseModal = () => {
    closeDateModal();
  };

  const onSubmit = (event) => {
    event.preventDefault();
    setFormSubmitted(true);
    const difference = differenceInSeconds(formValues.end, formValues.start);
    if (isNaN(difference) || difference <= 0) {
      Swal.fire('Fechas incorrectas', 'Revisar las fechas ingresadas', 'error');
      return;
    }
    if (formValues.title.length <= 0) return;
    console.log(formValues);
  };
  return (
    <>
      <Modal
        className="modal"
        overlayClassName="modal-fondo"
        closerTimeoutMS={200}
        isOpen={isDateModalOpen}
        onRequestClose={onCloseModal}
        style={customStyles}
      >
        <h1> New event </h1>
        <hr />
        <form className="container" onSubmit={onSubmit}>
          <div className="form-group mb-2">
            <label>Start date and time</label>
            <DatePicker
              className="form-control"
              selected={formValues.start}
              onChange={(event) => onDateChange(event, 'start')}
              dateFormat="Pp"
              showTimeSelect
            />
          </div>

          <div className="form-group mb-2">
            <label>End date and time</label>
            <DatePicker
              minDate={formValues.start}
              className="form-control"
              selected={formValues.end}
              onChange={(event) => onDateChange(event, 'end')}
              dateFormat="Pp"
              showTimeSelect
            />
          </div>

          <hr />
          <div className="form-group mb-2">
            <label>Title and notes</label>
            <input
              type="text"
              className={`form-control ${titleClass}`}
              placeholder="Título del evento"
              name="title"
              autoComplete="off"
              value={formValues.title}
              onChange={onInputChange}
            />
            <small id="emailHelp" className="form-text text-muted">
              Short description
            </small>
          </div>

          <div className="form-group mb-2">
            <textarea
              type="text"
              className="form-control"
              placeholder="Notas"
              rows="5"
              name="notes"
              value={formValues.notes}
              onChange={onInputChange}
            ></textarea>
            <small id="emailHelp" className="form-text text-muted">
              Additional info
            </small>
          </div>

          <button type="submit" className="btn btn-outline-primary btn-block">
            <i className="far fa-save"></i>
            <span> Save</span>
          </button>
        </form>
      </Modal>
    </>
  );
};
