import { useState } from 'react'
import './App.css'
import Liittymispiste from "./Liittymispiste"
import Syottokaapelit from "./Syottokaapelit"
import Sahkokeskus from './Sahkokeskus.jsx'

function App() {

  // Liittymiste.jsx propsit:
  const [checkedIk3, setCheckedIk3] = useState(false)    
  const [checkedIk1, setCheckedIk1] = useState(false)  
  const [ik3, setIk3] = useState("")
  const [cosfii, setCosfii] = useState("0.995") 
  const lpImpedanssi = 237 / (ik3 * 1000)
  const lpResistanssi =lpImpedanssi * cosfii
  const lpReaktanssi = Math.sqrt(Math.pow(lpImpedanssi, 2) - Math.pow(lpResistanssi, 2))   
  // Syottokaapelit.jsx propsit:
  //   LIITTYMISKAAPELIT
  const [liittymisKaapeli, setliittymisKaapeli] = useState("") 
  const [lKPituus, setlKPituus] = useState("")
  const lKResistanssi = liittymisKaapeli.resistanssi * lKPituus / 1000  
  const lKReaktanssi = liittymisKaapeli.reaktanssi * lKPituus / 1000
  const lKImpedanssi = Math.sqrt(lKResistanssi**2 + lKReaktanssi**2)
  // PÄÄKESKUS
  const [lkLkm, setlkLkm] = useState(1)
  const pkResistanssi = lpResistanssi + lKResistanssi
  const pkReaktanssi = lpReaktanssi + lKReaktanssi
  const pkImpedanssi = Math.sqrt(((pkResistanssi)/lkLkm)**2
  +((pkReaktanssi)/lkLkm)**2)
  const voltageFactorC = 1.05
  const pkIcp = voltageFactorC * 237 / pkImpedanssi
  //const pkIp = pkIcp * 2.3
  /* const pkIpRajoitettu = pkIcp * 
  const pkIpRajoitettu = pkIp *  */
  const [checkedSulake, setCheckedSulake] = useState("")

  console.log("PK")
  //   ALAKESKUKSEN SYÖTTÖKAAPELIT
  const [syottoKaapeli1, setsyottoKaapeli1] = useState("")
  const [sK1pituus, setsK1Pituus] = useState("")
  const sK1Resistanssi = syottoKaapeli1.resistanssi * sK1pituus / 1000
  const sK1Reaktanssi = syottoKaapeli1.resistanssi * sK1pituus / 1000
  const sK1Impedanssi = Math.sqrt(sK1Resistanssi**2 + sK1Reaktanssi**2)
  //  ALAKESKUS
  const [sK1Lkm, setsK1Lkm] = useState("1")
  const ak1Resistanssi = pkResistanssi + sK1Resistanssi
  const ak1Reaktanssi = pkReaktanssi  + sK1Reaktanssi
  const ak1Impedanssi = Math.sqrt(((ak1Resistanssi)/sK1Lkm)**2 
  +((ak1Reaktanssi)/sK1Lkm)**2)
  const ak1Icp = voltageFactorC * 237 / ak1Impedanssi
  //const ak1Ip = ak1Icp * 2.3
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
        <Syottokaapelit 
          cable="Liittymiskaapeli"
          valittuKaapeli={liittymisKaapeli} setValittuKaapeli={setliittymisKaapeli}
          pituus={lKPituus} setPituus={setlKPituus}  
          lkm={lkLkm} setLkm={setlkLkm} 
          resistanssi={lKResistanssi}
          reaktanssi={lKReaktanssi}
          impedanssi={lKImpedanssi}     
        />
        <Sahkokeskus 
          keskus="Pääkeskus"            
          impedanssi={pkImpedanssi}
          resistanssi={pkResistanssi}
          reaktanssi={pkReaktanssi}
          Icp={pkIcp}
          //Ip={pkIp}          
          checkedSulake={checkedSulake} setCheckedSulake={setCheckedSulake}
          cosfii={cosfii}
          
          /* pkIpRajoitettu={pkIpRajoitettu}
          pkIpRajoitettu={pkIpRajoitettu}  */
          checked={checkedSulake} setChecked={setCheckedSulake}
        />
        <Syottokaapelit
          cable="Alakeskuksen syöttökaapeli" 
          valittuKaapeli={syottoKaapeli1} setValittuKaapeli={setsyottoKaapeli1}
          pituus={sK1pituus} setPituus={setsK1Pituus}
          lkm={sK1Lkm} setLkm={setsK1Lkm} 
          resistanssi={sK1Resistanssi}
          reaktanssi={sK1Reaktanssi}
          impedanssi={sK1Impedanssi}
                  
        />    
        <Sahkokeskus
          keskus="Alakeskus"
          impedanssi={ak1Impedanssi}
          resistanssi={ak1Resistanssi}
          reaktanssi={ak1Reaktanssi}
          Icp={ak1Icp}
          //Ip={ak1Ip}
          
          /* pkIpRajoitettu={pkIpRajoitettu}
          pkIpRajoitettu={pkIpRajoitettu}  */
          checked={checkedSulake} setChecked={setCheckedSulake}
        />      
      </div>
         
    </>
  )
}

export default App
