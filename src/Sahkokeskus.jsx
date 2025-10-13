import { useState } from 'react'
import Sulakkeet from "./sulake.json"
import {kappa} from "./kaavat"

const Paakeskus = (props) => {
  const styles = { margin: 0}  
  const [sulake, setSulake] = useState("")
  const [valmistaja, setValmistaja] = useState("")
  const valmistajat = [...new Set(Sulakkeet.map((s) => s.valmistaja))]
  const sulakekoot = Sulakkeet
    .filter((s) => s.valmistaja === valmistaja)
    .map((s) => s.sulake);
  const selectedSulake = Sulakkeet.find((s) => s.valmistaja === valmistaja && s.sulake == sulake)
  /* TEHOLLINEN JA HUIPPUOIKOSULKUVIRTA */
  /* const hasData = props.resistanssi && props.reaktanssi && props.impedanssi;
  let Icp = 0;
  let Ip = 0;
  let kappa1 = 0 */
  
 /*  if (hasData) { */
  const kappa1 = kappa(props.resistanssi, props.reaktanssi)
  const voltageFactorC = 1.05
  const Icp = voltageFactorC * 237 / props.impedanssi
  const Ip = kappa1 * Math.sqrt(2) * Icp
 
  /* SULAKKEEN RAJOITTAMA OIKOSULKUVIRTA */
  let IpRajoitettu = 0
  {selectedSulake && (IpRajoitettu = 10**selectedSulake.bToJson * Icp**selectedSulake.k_ka)}
  let IcpRajoitettu = IpRajoitettu / (kappa1 * Math.sqrt(2))
  
  return (
    <>        
      <h2>{props.keskus}</h2>      
      {Icp && (
      <div style={{ marginLeft: 10}}>
        <p style={{marginBottom: 0}}>Yläpuolinen verkko pääkeskuksen syöttöliittimistä nähtynä:</p>
        <p style={styles}>R = {props.resistanssi.toPrecision(3)} Ω (lpResistanssi + lKResistanssi) </p>
        <p style={styles}>X = {props.reaktanssi.toPrecision(3)} Ω (lpReaktanssi + lKReaktanssi) </p>
        <p style={styles}>Z = {props.impedanssi.toPrecision(3)} Ω (return Math.sqrt(r**2 + x**2)) </p>
        {Number.isFinite(Icp) && (
          <div style={{ marginLeft: 10 }}>
            <p style={styles}>Icp = {Icp.toPrecision(6)} A(voltageFactorC(1,05 pitäisikö olla 1?) * 237 / pkImpedanssi)</p>
            <p style={styles}>Ip = {Ip.toPrecision(6)} A  </p>
          </div>)}
        <p style={styles}>kappa1 = {kappa1}</p>
      
        <label>Haluatko laskea sulakkeen rajoittaman max oikosulkuvirran {props.keskus}en lähdössä?
          <input id="sulake" type="checkbox" value={props.checked} onChange={(e) => props.setChecked(e.target.checked)} />
        </label>
      </div>
      )}
      {props.checked && (
        <form>
          <div className="form-row">
            <label htmlFor="valmistaja">Valitse valmistaja</label>  
            <select id='valmistaja' value={valmistaja} 
                onChange={(e) => {
                    setValmistaja(e.target.value);
                    setSulake("");
                }}            >           
              <option value=""  >Valitse valmistaja</option>
              {valmistajat.map((val) => ( 
                <option key={val} value={val} > 
                    {val}
                </option>
              ))}
            </select>
              
            <label htmlFor="sulakekoko">Sulakekoko</label>  
            {<select id='sulakekoko' value={sulake} 
                onChange={(e) => setSulake(e.target.value)}
                disabled={!valmistaja} // ei voi valita ennen valmistajaa
            > 
              <option value=""  >Valitse sulake</option>
              {sulakekoot.map((val) => (
                <option key={val} value={val} >
                  {val}
                </option>
              ))}
            </select> }
          </div>          
        </form>        
      )}
      
      {selectedSulake && (
        <div style={{ marginLeft: 10}}>
          <p style={styles}>Ip rajoitetun laskemiseksi määritettiin  "cut-off" kuvaajasta 
            kyseisen sulakkeen suoran yhtälö. Yhtälöstä ratkaistiin Ip=10**b * Icp**k</p>
          <p style={styles}>Ip rajoitettu  {IpRajoitettu.toPrecision(6)}</p>
          <p style={styles}>Icp rajoitettu  {IcpRajoitettu.toPrecision(6)} (= Ip / (kappa1 * Math.sqrt(2)))</p>
        </div>
      )
      }
      { Ip && (<div>
        <p>Haluatko laskea oikosulkuvirrat myös seuraavalla alakeskuksella?</p> 
        <button className="px-4 py-2 bg-red-500 text-white rounded-lg"
        >Lisää syöttökaapeli ja keskus</button> 

      </div>) } 
    </>
  )
}

export default Paakeskus