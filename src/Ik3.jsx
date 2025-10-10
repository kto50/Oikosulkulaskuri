import { useState } from 'react'
import './App.css'
import Head from './Head.jsx'
import Liittymispiste from "./Liittymispiste"
import Syottokaapelit from "./Syottokaapelit"
import Lahtotiedot from './Lahtotiedot.jsx'
import Sahkokeskus from './Sahkokeskus.jsx'
import Skeskus from './Skeskus.jsx'

function Ik3(cosfii, setCosfii) {
  // LIITTYMISPISTE
  /* const [ik3, setIk3] = useState("") */
  /* const [cosfii, setCosfii] = useState("0.90")  */
  /* const lpImpedanssi = 237 / (ik3 * 1000)
  const lpResistanssi =lpImpedanssi * cosfii
  const lpReaktanssi = Math.sqrt(Math.pow(lpImpedanssi, 2) - Math.pow(lpResistanssi, 2)) */ 
  // LIITTYMISKAAPELIT
  const [liittymisKaapeli, setliittymisKaapeli] = useState("") 
  const [lKPituus, setlKPituus] = useState("")
  const [lkCount, setlkCount] = useState(1)
  const lKResistanssi = liittymisKaapeli.resreka20 * lKPituus / 1000 /lkCount 
  const lKReaktanssi = liittymisKaapeli.reaktanssi * lKPituus / 1000 /lkCount
  const lKImpedanssi = Math.sqrt(lKResistanssi**2 + lKReaktanssi**2)
  // PÄÄKESKUS
  const pkResistanssi = lpResistanssi + lKResistanssi
  const pkReaktanssi = lpReaktanssi + lKReaktanssi
  const pkImpedanssi = Math.sqrt((pkResistanssi)**2 +(pkReaktanssi)**2)
  const voltageFactorC = 1.05
  const pkIcp = voltageFactorC * 237 / pkImpedanssi
  /* const pkIcp = 237 / pkImpedanssi  */
  const pkIp = pkIcp * 2.3
  /* const pkIpRajoitettu = pkIcp * 
  const pkIpRajoitettu = pkIp *  */
  //  ALAKESKUKSEN SYÖTTÖKAAPELIT
  const [syottoKaapeli1, setsyottoKaapeli1] = useState("")
  const [sK1pituus, setsK1Pituus] = useState("")
  const [sK1Count, setsK1Count] = useState(1)
  const sK1Resistanssi = syottoKaapeli1.resreka20 * sK1pituus / 1000 / sK1Count
  const sK1Reaktanssi = syottoKaapeli1.reaktanssi * sK1pituus / 1000 / sK1Count
  const sK1Impedanssi = Math.sqrt(sK1Resistanssi**2 + sK1Reaktanssi**2)
  //  ALAKESKUS
  const ak1Resistanssi = pkResistanssi + sK1Resistanssi
  const ak1Reaktanssi = pkReaktanssi  + sK1Reaktanssi
  const ak1Impedanssi = Math.sqrt((ak1Resistanssi)**2 
  +((ak1Reaktanssi)**2))
  const ak1Icp = 237 / ak1Impedanssi
  const ak1Ip = ak1Icp * 2.3
  console.log("sk1")
  const [keskukset, setKeskukset] = useState([]);
  const [keskuksenNimi, setKeskuksenNimi] = useState("");
  const uusikeskus = () => {
    if (keskuksenNimi.trim() === "") return; // Ei lisätä tyhjää nimeä
    const uusi = { id: Date.now(), keskus: keskuksenNimi.trim(), };
    setKeskukset([...keskukset, uusi]);
    setKeskuksenNimi("");  // Tyhjennetään inputin kenttä
  };
  const poistaKeskus = (id) => {
    setKeskukset(keskukset.filter((k) => k.id !== id));
  };
  const paivitakeskus = (id, uusiNimi) => {setKeskukset(
    keskukset.map((k) => k.id === id ? { ...k, keskukset: uusiNimi } : k)
    );
  };

  return (
    <>
      {/* <Liittymispiste 
        ik3={ik3} setIk3={setIk3}
        cosfii={cosfii} setCosfii={setCosfii}
        impedanssi={lpImpedanssi}
        resistanssi={lpResistanssi}
        reaktanssi={lpReaktanssi}
      />           */}
      <Syottokaapelit 
        cable="Liittymiskaapeli"
        valittuKaapeli={liittymisKaapeli} setValittuKaapeli={setliittymisKaapeli}
        pituus={lKPituus} setPituus={setlKPituus}  
        count={lkCount} setCount={setlkCount} 
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
        Ip={pkIp}          
        cosfii={cosfii}
      />
      {pkImpedanssi && (
          <div className="flex gap-2 mb-4">
            <div className="mt-4 space-y-2">
              {keskukset.map((item) => (
                <Skeskus 
                  key={item.id} 
                  id={item.id} 
                  keskus={item.keskus} 
                  poista={() => poistaKeskus(item.id)} 
                  paivita={paivitakeskus}/>
              ))}
            </div>
            <input
              type="text"
              value={keskuksenNimi}
              onChange={(e) => setKeskuksenNimi(e.target.value)}
              placeholder="Anna keskuksen nimi..."
              className="flex-1 border rounded px-3 py-2"
            />
            <button onClick={uusikeskus} 
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >Lisää keskus</button>
            
          </div>  
        ) 
      }
      <Syottokaapelit
        cable="Alakeskuksen syöttökaapeli" 
        valittuKaapeli={syottoKaapeli1} setValittuKaapeli={setsyottoKaapeli1}
        pituus={sK1pituus} setPituus={setsK1Pituus}
        count={sK1Count} setCount={setsK1Count} 
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
        Ip={ak1Ip}        
      />      
    </>
  )
}

export default Ik3
