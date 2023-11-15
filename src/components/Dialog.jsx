import '../styles/Dialog.css'

export default function Dialog ({ card, showDialog, setShowDialog }) {
  if (showDialog) {
    document.body.classList.add('active-modal')
  } else {
    document.body.classList.remove('active-modal')
  }

  return (
    <>
      {showDialog && (
        <div className='modal'>
          <div onClick={() => setShowDialog(false)} className='overlay' />
          <div className='modal-content'>
            <h3>{card.name}</h3>
            <p className=''># {card.number}/{card.set_size}</p>
            <img
              className='dialog-image'
              src={card.image_url} alt={card.number}
            />
            <button className='close-modal' onClick={() => setShowDialog(false)}>
              X
            </button>
          </div>
        </div>
      )}
    </>
  )
}
