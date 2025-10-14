import React from 'react'

const Head = ( props ) => {
  return (
    <>
       <h1>Oikosulkuvirtalaskuri</h1>
        <p>Tällä laskurilla voidaan laskea oikosulkuvirrat määritettävässä kaapelissa tai keskuksessa. 
            Laskenta aloitetaan tallentamalla lomakkeelle verkkoyhtiöltä saadut 3-vaiheiset oikosulkuvirrat.
            Laskennassa tarvittava tehokerroin valitaan liittymäpisteen jälkeisen verkon kuormien perusteella.
            Tallennettujen tietojen perusteella laskuri laskee edeltävän liittymäpistettä edeltävän verkon 
            impedanssin, resistanssin ja reaktanssin.</p> 
        <p><b> Haluatko laskea 3- vai 1-vaiheisen oikosulkuvirran vai molemmat?</b> </p>
        <div>
            <label>3-vaiheinen, Ik3:
            <input id="" type="checkbox" value={props.checkedIk3} onChange={(e) => props.setCheckedIk3(e.target.checked)} />
            </label>
            <label>1-vaiheinen, Ik1:
            <input id="" type="checkbox" value={props.checkedIk1} onChange={(e) => props.setCheckedIk1(e.target.checked)} />
            </label>                
        </div>
    </>
  )
}

export default Head