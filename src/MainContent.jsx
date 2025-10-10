import React from 'react'

const MainContent = () => {

  const lisaaKeskus = () => {
    <label htmlFor="">Anna uuden keskuksen nimi</label>
    
    /* keskuksen nimi */
  return (
    <>
        <p>Lisää keskus ja sille syöttökaapeli</p>
        <label htmlFor="lkm">Lukumäärä</label>
            <p style={{ border: "2px solid black", borderRadius: "6px", padding: "4px 12px"}} >{props.count}</p>
            <button 
                onClick={lisaaKeskus} 
                className="px-4 py-2 bg-red-500 text-white rounded-lg"
            >
            - Vähennä
            </button>
    </>
  )
}

export default MainContent