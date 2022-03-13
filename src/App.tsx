import { useState } from 'react'
import logo from './logo.svg'
import Select from './Select'

const countries = [
  { value: 'uz', title: 'Uzbekistan' },
  { value: 'ru', title: 'Russia' },
  { value: 'kz', title: 'Kazakhstan' },
  { value: 'us', title: 'USA' },
  { value: 'uk', title: 'United Kingdom' },
]
const langs = [
  { value: 'uz', title: 'Uzbek' },
  { value: 'ru', title: 'Russian' },
  { value: 'kz', title: 'Kazak' },
  { value: 'us', title: 'English(US)' },
  { value: 'uk', title: 'English(UK)' },
]

const App = () => {
  const [selectCity, setSelectCity] = useState<string | null>(null)
  const [selectCountry, setSelectCountry] = useState<string | null>(null)
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Hello Vite + React!</p>
        <div className="selects">
          <Select
            onChange={setSelectCity}
            options={countries}
            value={selectCity}
          />
          <Select
            onChange={setSelectCountry}
            options={langs}
            value={selectCountry}
            placeholder={'Choose country'}
          />
        </div>
      </header>
    </div>
  )
}

export default App
