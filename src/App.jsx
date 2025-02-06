import './App.css'
import { ApolloProvider } from '@apollo/client'
import client from './apolloClient'
import CountryList from './components/CountryList'
import ChatAssistant from './ChatAssistant'
// import Modal from './components/Modal'

const App = () => {
  return (
    <ApolloProvider client={client}>
      <div>
        <div className='grid grid-cols-1 gap-4'>
          <ChatAssistant />
          <CountryList />
        </div>
      </div>
    </ApolloProvider>
  )
}

export default App
