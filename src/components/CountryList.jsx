import { useQuery, gql } from '@apollo/client'
import Card from './Card'
import Modal from './Modal'
import { useState } from 'react'

const GET_COUNTRIES = gql`
  query {
    countries {
      continent {
        code
        name
      }
      code
      name
      emoji
      emojiU
      capital
      currencies
      native
      phones
      languages {
        code
        name
        native
        rtl
      }
    }
  }
`

const CountryList = () => {
  const [selectedCountry, setSelectedCountry] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleCardClick = (country) => {
    setSelectedCountry(country)
    setIsModalOpen(true)
  }

  const { loading, error, data } = useQuery(GET_COUNTRIES)

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error: {error.message}</p>

  return (
    <>
      <div className='grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4'>
        {data.countries.map((country) => (
          <Card
            openModal={() => handleCardClick(country)}
            key={country.code}
            country={country}
          />
        ))}
      </div>
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        country={selectedCountry}
      ></Modal>
    </>
  )
}

export default CountryList
