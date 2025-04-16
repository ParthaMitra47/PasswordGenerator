import { useState, useCallback, useEffect, useRef } from 'react'
import './App.css'
import { use } from 'react'
function App() {
  const [length, setLength] = useState(8)
  const [numberAllowed, setNumberAllowed] = useState(false)
  const [charAllowed, setCharAllowed] = useState(false)
  const [password, setPassword] = useState("")
  const passwordRef =useRef(null)
  const [buttonText, setButtonText] = useState("Copy");
  const [buttonStyle, setButtonStyle] = useState({});  
  
  


  const passwordGenarator = useCallback(()=>{
    let pass =""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    
    if(numberAllowed) str+="0123456789"
    if(charAllowed) str+="!@#$%^&*-_+={}[]`~"
    
    for (let i = 1; i <=length; i++) {
      let char = Math.floor(Math.random()*str.length+1);
      pass = pass+str.charAt(char)
    }

    setPassword(pass);
   
    
  }, [length, numberAllowed, charAllowed, setPassword])


useEffect(()=>{

  passwordGenarator();
  setButtonText("Copy");
  setButtonStyle({
    backgroundColor: "green",
    color: "white",
    border: "none",
  });




},[length, numberAllowed, charAllowed, setPassword])

const copyPasswordToClipboard = useCallback(()=>{
  passwordRef.current?.select();
  window.navigator.clipboard.writeText(password).then(()=>
  {
    setButtonText("🗸 Copied");

    setButtonStyle({
      backgroundColor: "#32CF6C",
      
  
    });
  })


 
},[password])




 const buttonElem = () => (
    <button
      id="copyButton"
      style={buttonStyle}
      onClick={copyPasswordToClipboard}
      className="text-white outline-none bg-green-600 px-3 py-1 shrink-0 rounded-md mx-1 cursor-pointer"
    >
      {buttonText}
    </button>
  );


 
  return(
    <>
    <div className='w-full text-orange-500 font-bold p-6 max-w-md mx-auto shadow-md rounded-lg px-4 my-8 bg-gray-700 p-'>Password Generator

      <div className='flex shadow p-4 rounded-lg overflow-hidden mb-4'>

      <input type="text" 
      value={password}
      className='outline-none w-full py-1 px-3 rounded-lg '
      placeholder='password'
      readOnly 
      ref={passwordRef}
      />

   
      <div
      className='flex'>
        {buttonElem()} 
      </div>

      </div>

      <div className="flex flex-wrap text-sm  gap-x-2">
      <div className="flex items-center gap-x-1">
        <input type='range'
        min={7}
        max={100}
        value={length}
        className='cursor-pointer'
        onChange={(e)=> {setLength(e.target.value)}}
        
        />
        
        <label>Length:{length}</label>
      </div>
        <div className="flex items-center gap-x-1">
          <input type="checkbox" 
          defaultChecked={numberAllowed}
          id='numberInput'
          onChange={()=>{
            setNumberAllowed((prev)=>!prev);
          }}
          />
           <label>Numbers</label>

        </div>
        <div className="flex items-center gap-x-1">
        <input type="checkbox"
          defaultChecked={numberAllowed}
          id='numberInput'
          onChange={()=>{
            setCharAllowed((prev)=>!prev);
          }}
          />
           <label>Characters</label>


        </div>
    </div>

    <div className='flex mt-7 font-thin text-xs flex-row-reverse'>
      Designed & developed by &nbsp; ~ Partha Mitra
    </div>
    </div>
    
    </>
  )
}

export default App


// Made by Partha Mitrs
// Learned From :- Hitesh Chaudhury sir, React docs, Copilot