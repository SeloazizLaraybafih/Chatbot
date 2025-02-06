import PropTypes from 'prop-types'

const Modal = ({ isOpen, onClose, country }) => {
  if (!isOpen) return null

  return (
    <>
      <div className='flex fixed inset-0 items-center justify-center z-50'>
        <div className='bg-white p-6 rounded-xl shadow-lg w-80'>
          <div className='flex justify-center items-center'>
            {' '}
            <div className='mr-3'>{country.emoji}</div>
            <h2 className='text-xl font-bold mb-2'>{country.name}</h2>
          </div>
          <p className='mb-2'>
            {country.name !== country.native && (
              <span>a.k.a {country.native} in its native language.</span>
            )}{' '}
            This country is located in {country.continent?.name}
          </p>
          <div>
            {country.languages && country.languages.length > 0 && (
              <div className='flex justify-center items-center'>
                <p className='mr-1'>Languages:</p>
                <div
                  className={`flex-col p-2 rounded-2xl ${
                    country.languages.length > 1
                      ? 'border-b-gray-600 border-2'
                      : ''
                  }`}
                >
                  {country.languages.map((x, i) => (
                    <p key={i}>{x.name}</p>
                  ))}
                </div>
              </div>
            )}
          </div>
          <div className='flex justify-center'>
            {' '}
            <div
              onClick={onClose}
              className='mt-4 bg-blue-200 text-black w-40 py-2 rounded-2xl cursor-pointer justify-center'
            >
              Close
            </div>
          </div>
        </div>
      </div>
      <div className='fixed inset-0 z-0 bg-gray-200 opacity-45'></div>
    </>
  )
}

Modal.propTypes = {
  country: PropTypes.shape({
    continent: PropTypes.arrayOf(
      PropTypes.shape({
        code: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
      })
    ).isRequired,
    code: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    emoji: PropTypes.string.isRequired,
    capital: PropTypes.string,
    currencies: PropTypes.arrayOf(PropTypes.string),
    native: PropTypes.string,
    phones: PropTypes.arrayOf(PropTypes.string),
    languages: PropTypes.arrayOf(
      PropTypes.shape({
        code: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        native: PropTypes.string.isRequired,
        rtl: PropTypes.bool.isRequired,
      })
    ).isRequired,
  }),
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
}

export default Modal
