import { useState } from 'react'
import Sulakkeet from "./sulake.json"

const Paakeskus = (props) => {
  const styles = { margin: 0}  
  const [sulake, setSulake] = useState("")
  const [valmistaja, setValmistaja] = useState("")
  const valmistajat = [... new Set(Sulakkeet.map((s) => s.valmistaja))]
  const sulakekoot = Sulakkeet
    .filter((s) => s.valmistaja === valmistaja)
    .map((s) => s.sulake);
  const selectedSulake = Sulakkeet.find((s) => s.valmistaja === valmistaja && s.sulake == sulake)


  const NeperinLuku = 2.718281
  const kappa = (1.02 + 0.98*NeperinLuku**(-3*(props.resistanssi/props.reaktanssi)))
  const Ip = kappa * Math.sqrt(2) * props.Icp

  /* Ip RAJOITETTU */
/*   const IpRajoitettu = 10**selectedSulake.bToJson * pkIcp**selectedSulake.k_ka
  const IcpRajoitettu = IpRajoitettu**(1/k) * 10**(-selectedSulake.bToJson/selectedSulake.k_ka)
 */  return (
    <>        
      <h2>{props.keskus}</h2>      
      {props.Icp > 0  && (
      <div style={{ marginLeft: 10}}>
        <p style={styles}>Z = {props.impedanssi.toPrecision(3)} Ω</p>
        <p style={styles}>R = {props.resistanssi.toPrecision(3)} Ω</p>
        <p style={styles}>X = {props.reaktanssi.toPrecision(3)} Ω</p>
        <p style={styles}>Icp = {props.Icp.toPrecision(6)} A</p>
        <p style={styles}>Ip = {Ip.toPrecision(6)} A</p>
      
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
                disabled={!valmistaja} defaultValue="" // ei voi valita ennen valmistajaa
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
          <p>Ip rajoitettu  {10**selectedSulake.bToJson * props.Icp**selectedSulake.k_ka}</p>
        </div>
      )
      }    
    </>
  )
}

export default Paakeskus