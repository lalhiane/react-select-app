import { useState } from "react"

import Select, { SelectOption } from "./Select"

const options = [

  { label: "First", value: 1 },

  { label: "Second", value: 2 },

  { label: "Third", value: 3 },

  { label: "Fourth", value: 4 },

  { label: "Fifth", value: 5 },

  { label: "Sexth", value: 6 },

  { label: "Seventh", value: 7 },

  { label: "Eighth", value: 8 },

  { label: "Ninth", value: 9 },

  { label: "Tenth", value: 10 },

]

function App() {

  const [currentOption, setCurrentOption] = useState<SelectOption | undefined>(options[0])

  const [currentOptions, setCurrentOptions] = useState<SelectOption[]>([])

  return (<>
    
    <Select
      
      multiple={false}
      
      options={options}
      
      currentOption_s={currentOption}
      
      onChange={option => setCurrentOption(option)}
    
    />

    <br />

    <Select
      
      multiple={true}
      
      options={options}
      
      currentOption_s={currentOptions}
      
      onChange={options => setCurrentOptions(options)}
    
    />
    
  </>)

}

export default App
