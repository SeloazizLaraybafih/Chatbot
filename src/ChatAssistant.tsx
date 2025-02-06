import React, { useState } from 'react'
import axios from 'axios'

const API_URL =
  'https://thingproxy.freeboard.io/fetch/https://integrate.api.nvidia.com/v1/chat/completions'

const ChatAssistant: React.FC = () => {
  const [messages, setMessages] = useState<{ role: string; text: string }[]>([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)

  const sendMessage = async () => {
    if (!input.trim()) return

    const newMessage = { role: 'user', text: input }
    setMessages([...messages, newMessage])
    setInput('')
    setLoading(true)

    try {
      const response = await axios.post(
        API_URL,
        {
          model: 'meta/llama-3.1-405b-instruct',
          messages: [{ role: 'user', content: input }],
          temperature: 0.7,
          max_tokens: 512,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer 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`,
          },
        }
      )

      console.log('API Response:', response)

      setMessages([
        ...messages,
        newMessage,
        {
          role: 'assistant',
          text:
            response.data?.choices[0]?.message?.content ||
            'Sorry, I didn’t understand that.',
        },
      ])
    } catch (error) {
      console.error('API Error:', error)
      setMessages([
        ...messages,
        newMessage,
        { role: 'assistant', text: 'Error fetching response' },
      ])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='max-w-md w-7xl max-sm:w-[16.5rem] mx-auto bg-white shadow-lg rounded-lg p-4'>
      <h2 className='text-lg font-semibold text-gray-700 text-center mb-4'>
        selo's mind
      </h2>

      <div className='h-64 overflow-y-auto p-3 border border-gray-200 rounded-lg'>
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`p-2 my-2 rounded-lg w-fit max-w-xs ${
              msg.role === 'user'
                ? 'bg-blue-500 text-white ml-auto'
                : 'bg-gray-200 text-gray-800'
            }`}
          >
            {msg.text}
          </div>
        ))}
        {loading && <div className='text-gray-500 italic'>AI is typing...</div>}
      </div>

      <div className='flex items-center mt-4 space-x-2 '>
        <input
          type='text'
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder='Ask me anything...'
          className='w-20 flex-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400'
        />
        <div
          onClick={sendMessage}
          className='px-4 py-2 bg-blue-500 text-white rounded-md disabled:bg-gray-400 cursor-pointer hover:bg-blue-600 transition duration-200'
        >
          Send
        </div>
      </div>
    </div>
  )
}

export default ChatAssistant
