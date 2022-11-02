import { useState } from 'react';
import Modal from 'react-modal';
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
  const [isOpen, setIsOpen] = useState(true);
  const onCloseModal = () => {
    setIsOpen(false);
  };
  return (
    <>
      <Modal
        className="modal"
        overlayClassName="modal-fondo"
        closerTimeoutMS={200}
        isOpen={isOpen}
        onRequestClose={onCloseModal}
        style={customStyles}
      >
        <h1>Hola mundo</h1>
        <hr />
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis nemo
          repudiandae aspernatur magnam enim, illum accusantium similique unde
          doloribus voluptas molestiae reiciendis pariatur nulla nobis aut quod
          ipsum consectetur? Impedit.
        </p>
      </Modal>
    </>
  );
};
