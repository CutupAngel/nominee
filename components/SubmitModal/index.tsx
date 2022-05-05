import Modal from 'react-modal'
import { SelectedNominee } from '../../pages'
import { GrClose } from 'react-icons/gr'

interface Props {
  isOpen: boolean
  selectedNominees: SelectedNominee
  handleModalClose: () => void
}

const customStyles = {
  content: {
    maxWidth: '600px',
    minWidth: '400px',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bottom: 'auto',
    right: 'auto',
    paddingTop: '30px',
  },
}

const SubmitModal: React.FC<Props> = ({
  isOpen,
  handleModalClose,
  selectedNominees,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={handleModalClose}
      ariaHideApp={false}
      style={customStyles}
      contentLabel="Modal"
    >
      <button
        onClick={handleModalClose}
        className="absolute right-5 top-5 cursor-pointer"
      >
        <GrClose />
      </button>
      <h2 className="text-center text-3xl uppercase font-semibold mb-4">Success</h2>
      {selectedNominees &&
        Object.keys(selectedNominees).map((categoryId: string) => (
          <div className="mb-3" key={categoryId}>
            <h3 className="text-2xl capitalize mb-2">{categoryId}:</h3>
            <p className="pl-10">{selectedNominees[categoryId].title}</p>
          </div>
        ))}
    </Modal>
  )
}

export default SubmitModal
