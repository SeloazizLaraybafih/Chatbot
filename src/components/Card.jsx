import PropTypes from 'prop-types'

const Card = ({ country, openModal }) => {
  return (
    <div
      onClick={openModal}
      className='bg-white shadow-lg rounded-xl p-4 border cursor-pointer'
    >
      <div className='flex justify-center items-center mb-3'>
        {' '}
        <div className='mr-3'>{country.emoji}</div>
        <h2 className='font-semibold'>{country.name}</h2>
      </div>
      <div className='flex justify-center items-center'>
        {' '}
        <p className='mr-1.5'>capital:</p>
        <p>{country.capital}</p>
      </div>
      <div className='flex justify-center items-center'>
        {' '}
        <p className='mr-1.5'>currency:</p>
        {country.currencies.slice(0, 4).map((x, i) => (
          <p className='mr-1' key={i}>
            {x}
          </p>
        ))}
      </div>
    </div>
  )
}

Card.propTypes = {
  country: PropTypes.shape({
    code: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    emoji: PropTypes.string.isRequired,
    emojiU: PropTypes.string.isRequired,
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
  }).isRequired,
  openModal: PropTypes.func.isRequired,
}

export default Card
