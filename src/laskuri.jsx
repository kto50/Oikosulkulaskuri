import { useState } from 'react'
import Liittymispiste from "./Liittymispiste"
import Syottokaapelit from "./Syottokaapelit"
import Sahkokeskus from './Sahkokeskus.jsx'

// funktiot
import { Zkaapeli } from './kaavat.js'
import { Rkaapeli } from './kaavat.js'
import { Xkaapeli } from './kaavat.js'

function Laskuri() {

  // Liittymiste.jsx propsit:
  const [checkedIk3, setCheckedIk3] = useState(false)    
  const [checkedIk1, setCheckedIk1] = useState(false)  
  const [ik3, setIk3] = useState("")
  const [cosfii, setCosfii] = useState("0.995") 
  const lpImpedanssi = 237 / (ik3 * 1000) 
  const lpResistanssi = lpImpedanssi * cosfii
  const lpReaktanssi = Math.sqrt(Math.pow(lpImpedanssi, 2) - Math.pow(lpResistanssi, 2))   
  // Syottokaapelit.jsx propsit:
  //   LIITTYMISKAAPELIT
  const [liittymisKaapeli, setliittymisKaapeli] = useState("") 
  const [lKPituus, setlKPituus] = useState("")
  const [lkCount, setlkCount] = useState(1)
  const lKResistanssi = Rkaapeli(liittymisKaapeli.resreka20, lKPituus, lkCount)
  const lKReaktanssi = Xkaapeli(liittymisKaapeli.reaktanssi, lKPituus, lkCount)
  const lKImpedanssi = Zkaapeli(lKResistanssi, lKReaktanssi)
  // PÄÄKESKUS
  // const [lkLkm, setlkLkm] = useState(1)
  const pkResistanssi = lpResistanssi + lKResistanssi
  const pkReaktanssi = lpReaktanssi + lKReaktanssi
  const pkImpedanssi = Zkaapeli(pkResistanssi, pkReaktanssi)
  const [checkedSulake, setCheckedSulake] = useState("")

  //   ALAKESKUKSEN SYÖTTÖKAAPELIT
  const [syottoKaapeli1, setsyottoKaapeli1] = useState("")
  const [sK1pituus, setsK1Pituus] = useState("")
  const [sK1Count, setsK1Count] = useState(1)
  const sK1Resistanssi = syottoKaapeli1.resreka20 * sK1pituus / 1000 / sK1Count
  const sK1Reaktanssi = syottoKaapeli1.reaktanssi * sK1pituus / 1000 / sK1Count
  const sK1Impedanssi = Math.sqrt(sK1Resistanssi**2 + sK1Reaktanssi**2)
  //  ALAKESKUS
  // const [sK1Lkm, setsK1Lkm] = useState("1")
  const ak1Resistanssi = pkResistanssi + sK1Resistanssi
  const ak1Reaktanssi = pkReaktanssi  + sK1Reaktanssi
  const ak1Impedanssi = Zkaapeli(ak1Resistanssi, ak1Reaktanssi)
  console.log("Liittymiskaapeli")

  return (
    <>
      <h1>Oikosulkuvirtalaskuri</h1>
      <div className='laskurin-kuvaus'  >
        <p>Tällä laskurilla voidaan laskea oikosulkuvirrat määritettävässä kaapelissa tai keskuksessa. 
          Laskenta aloitetaan tallentamalla lomakkeelle verkkoyhtiöltä saadut 3-vaiheiset oikosulkuvirrat.
          Laskennassa tarvittava tehokerroin valitaan liittymäpisteen jälkeisen verkon kuormien perusteella.
          Tallennettujen tietojen perusteella laskuri laskee edeltävän liittymäpistettä edeltävän verkon 
          impedanssin, resistanssin ja reaktanssin.</p>
        <Liittymispiste 
          checkedIk3={checkedIk3} setCheckedIk3={setCheckedIk3}
          checkedIk1={checkedIk1} setCheckedIk1={setCheckedIk1}              
          ik3={ik3} setIk3={setIk3}
          cosfii={cosfii} setCosfii={setCosfii}
          impedanssi={lpImpedanssi}
          resistanssi={lpResistanssi}
          reaktanssi={lpReaktanssi}
        />          
        {ik3 && cosfii && (<Syottokaapelit 
          cable="Liittymiskaapeli"
          valittuKaapeli={liittymisKaapeli} setValittuKaapeli={setliittymisKaapeli}
          pituus={lKPituus} setPituus={setlKPituus}  
          // lkm={lkLkm} setLkm={setlkLkm} 
          count={lkCount} setCount={setlkCount}
          resistanssi={lKResistanssi}
          reaktanssi={lKReaktanssi}
          impedanssi={lKImpedanssi}     
        />)}
        <Sahkokeskus 
          keskus="Pääkeskus"            
          impedanssi={pkImpedanssi}
          resistanssi={pkResistanssi}
          reaktanssi={pkReaktanssi}
          checkedSulake={checkedSulake} setCheckedSulake={setCheckedSulake}
          cosfii={cosfii}
          checked={checkedSulake} setChecked={setCheckedSulake}
        />
        <Syottokaapelit
          cable="Alakeskuksen syöttökaapeli" 
          valittuKaapeli={syottoKaapeli1} setValittuKaapeli={setsyottoKaapeli1}
          pituus={sK1pituus} setPituus={setsK1Pituus}
          // lkm={sK1Lkm} setLkm={setsK1Lkm} 
          count={sK1Count} setCount={setsK1Count} 
          resistanssi={sK1Resistanssi}
          reaktanssi={sK1Reaktanssi}
          impedanssi={sK1Impedanssi}
                  
        />    
        {/* <Sahkokeskus
          keskus="Alakeskus"
          impedanssi={ak1Impedanssi}
          resistanssi={ak1Resistanssi}
          reaktanssi={ak1Reaktanssi}
          Icp={ak1Icp}
          //Ip={ak1Ip}
          
          /* pkIpRajoitettu={pkIpRajoitettu}
          pkIpRajoitettu={pkIpRajoitettu}  *
          checked={checkedSulake} setChecked={setCheckedSulake}
        />       */}
      </div>
         
    </>
  )
}

export default Laskuri
