import React from 'react'
import { useState } from "react"

const Head = ( props ) => {
  /* const [laskuri, setLaskuri] = useState ({
      ik3: false,
      ik1: false,
  }); */

 /*  const handleChange = (e) => {
      const { name, checked } = e.target;
      props.setLaskuri((prevLaskuri) => ({...prevLaskuri, [name]: checked}))
  } */

  return (
    <>
        <h1>Oikosulkuvirtalaskuri</h1>
            <div>
              <p>Tällä laskurilla voidaan laskea oikosulkuvirrat pienjänniteverkon kaapelissa tai keskuksessa. 
                Laskenta aloitetaan tallentamalla lomakkeelle verkkoyhtiöltä saadut 3-vaiheiset oikosulkuvirrat.</p>
              <p><b> Haluatko laskea 3- vai 1-vaiheisen oikosulkuvirran vai molemmat?</b> </p>
              {/* <p>Laskennassa tarvittava tehokerroin valitaan liittymäpisteen jälkeisen verkon kuormien perusteella.
                Tallennettujen tietojen perusteella laskuri laskee edeltävän liittymäpistettä edeltävän verkon 
                impedanssin, resistanssin ja reaktanssin.</p> */}
              <div>
                <label>3-vaiheinen, Ik3:
                <input id="" type="checkbox" value={props.checkedIk3} onChange={(e) => props.setCheckedIk3(e.target.value)} />
                </label>
                <label>1-vaiheinen, Ik1:
                <input id="" type="checkbox" value={props.checkedIk1} onChange={(e) => props.setCheckedIk1(e.target.value)} />
                </label>                
            </div>
              {/* <div>
                <label>3-vaiheinen, Ik3:
                <input id="" type="checkbox" name="ik3" checked={props.laskuri.ik3} onChange={handleChange} />
                </label>
                <label>1-vaiheinen, Ik1:
                <input id="" type="checkbox" name="ik1" checked={props.laskuri.ik1} onChange={handleChange} />
                </label>                
            </div> */}
            </div>
    </>
  )
}

export default Head