import { useState } from 'react'
import './App.css'
import { ToastContainer, toast } from 'react-toastify'


function App() {

  const [num, setNum] = useState(12)
  const [type, setType] = useState('linear')
  const [refresh, setRefresh] = useState(0)


  const hexColorGenarator = () => {
    const rgb = 255*255*255
    const random = Math.random() * rgb
    const int = Math.floor(random)
    const hex = int.toString(16)
    const hexColor = hex.padEnd(6, "0")

    return `#${hexColor}`
  }

  function onCopy(gradientCode){
    navigator.clipboard.writeText(gradientCode)
    toast.success("Gradient code copied !", {position: 'top-center'})
  }

  return (
    <>
        <div className='min-h-screen selection:bg-black selection:text-white
        [background-image:radial-gradient(circle,var(--color-neutral-300)_1px,transparent_1px)]
        [background-size:10px_10px]
        '>
          <div className='w-9/12 mx-auto'>
            <div className='flex flex-col lg:flex-row md:flex-col sm:flex-col sm:justify-between gap-5 justify-center pt-7 items-center'>
           
              <h1
              style={{ fontFamily: '"Special Gothic Expanded One", sans-serif' }}
               className='newFont
              font-bold
               sm:text-4xl text-center text-2xl pb-3 sm:pb-0 '>Gradient Genarator - {num} {type}</h1>
              <div className='flex flex-col sm:flex-row'>
                <div className='flex mb-3 sm:mb-0'>
                    <input value={num} onChange={(e) => setNum(Number(e.target.value))} type="text" className='border-3 font-medium bg-white border-neutral-800 rounded-md w-25 h-9.5 px-2' />

                  <select value={type} onChange={(e) => setType(e.target.value)} className='cursor-pointer z-10 inset-0 ml-3 border-3 border-neutral-800 rounded-md h-9.5 px-3 font-semibold focus:outline-none '>
                    <option className='checked:bg-black checked:text-white  font-semibold' value={'linear'}>Linear</option>
                    <option className='checked:bg-black checked:text-white  font-semibold' value={'radial'}>Radial</option>  
                    <option className='checked:bg-black checked:text-white  font-semibold' value={'conic'}>Conic</option>  
                  </select>
                </div>
                
              
              <button className='cursor-pointer shadow:md sm:ml-5 h-9.5 border-2 w-51 sm:w-35 rounded-md border-neutral-800 bg-neutral-900 hover:bg-neutral-700 active:scale-95 transition-all duration-150 text-white text-lg shadow-md' onClick={() => setRefresh(prev => prev + 1)}>Genarate</button>
              </div>
            </div>

      
            <div className='grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-2 gap-4 mt-20'>

              {Array.from({length: num}).map((_, i) => {

                const degree = Math.floor(Math.random() * 360)

                const gradient = 
                  type === 'linear' ? 
                    `linear-gradient(${degree}deg, ${hexColorGenarator()}, ${hexColorGenarator()})` 
                  : type === 'radial' ?
                    `radial-gradient(circle,${hexColorGenarator()}, ${hexColorGenarator()})`
                  :
                   `conic-gradient(${hexColorGenarator()}, ${hexColorGenarator()})`

                const gradientCode = `background: ${gradient}`


                return(
                  <div key={i + refresh} className='relative h-40 rounded-lg' style={{
                  background: gradient
                }}>
                
                  <button onClick={() => onCopy(gradientCode)} className='absolute bg-black/50 hover:bg-black/65 active:scale-98 transition-all duration-100 text-white text-[12px] rounded-sm p-1 px-2 bottom-3 right-3' >Copy</button>
                </div>
                )
              })}
            </div>
             
          </div>
          <ToastContainer />
        </div>
    </>
  )
}

export default App
