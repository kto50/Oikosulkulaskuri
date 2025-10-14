import { useState } from 'react'
import Head from './Head.jsx'
import Ik3 from './Ik3.jsx'
import Ik1 from './Ik1.jsx'
// import Liittymispiste from "./Liittymispiste"
/* import Syottokaapelit from "./Syottokaapelit"
import Sahkokeskus from './Sahkokeskus.jsx'
 */
// funktiot
import { Zkaapeli } from './kaavat.js'
import { Rkaapeli } from './kaavat.js'
import { Xkaapeli } from './kaavat.js'

function Laskuri() {

    // HEAD
  const [checkedIk3, setCheckedIk3] = useState(false)    
  const [checkedIk1, setCheckedIk1] = useState(false)  
    // LIITTYMISPISTE
 /*  const [ik3, setIk3] = useState("")
  const [cosfii, setCosfii] = useState("0.995") 
  const lpImpedanssi = 237 / (ik3 * 1000) 
  const lpResistanssi = lpImpedanssi * cosfii
  const lpReaktanssi = Math.sqrt(Math.pow(lpImpedanssi, 2) - Math.pow(lpResistanssi, 2))   
  //   LIITTYMISKAAPELIT
  const [liittymisKaapeli, setliittymisKaapeli] = useState("") 
  const [lKPituus, setlKPituus] = useState("")
  const [lkCount, setlkCount] = useState(1)
  const lKResistanssi = Rkaapeli(liittymisKaapeli.resreka20, lKPituus, lkCount)
  const lKReaktanssi = Xkaapeli(liittymisKaapeli.reaktanssi, lKPituus, lkCount)
  const lKImpedanssi = Zkaapeli(lKResistanssi, lKReaktanssi)
  // PÄÄKESKUS
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
  const ak1Resistanssi = pkResistanssi + sK1Resistanssi
  const ak1Reaktanssi = pkReaktanssi  + sK1Reaktanssi
  const ak1Impedanssi = Zkaapeli(ak1Resistanssi, ak1Reaktanssi)
  console.log("Liittymiskaapeli") */

  return (
    <div className='laskurin-kuvaus' >
      <Head 
        checkedIk3={checkedIk3} setCheckedIk3={setCheckedIk3}
        checkedIk1={checkedIk1} setCheckedIk1={setCheckedIk1} 
      />
      {checkedIk3 && <Ik3 
        checkedIk3={checkedIk3} setCheckedIk3={setCheckedIk3}
      />}
      {checkedIk1 && <Ik1 
        checkedIk1={checkedIk1} setCheckedIk1={setCheckedIk1}
      />}
    
        {/* <Liittymispiste 
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
            count={sK1Count} setCount={setsK1Count} 
            resistanssi={sK1Resistanssi}
            reaktanssi={sK1Reaktanssi}
            impedanssi={sK1Impedanssi}
                    
        /> */}    
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
  )
}

export default Laskuri
