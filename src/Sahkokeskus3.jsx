import React, { useState } from 'react'
import Sulakkeet from "./sulake.json"

const Paakeskus = (props) => {
  const styles = { margin: 0}  
  const [sulake, setSulake] = useState("")
  const [valmistaja, setValmistaja] = useState("")

  const handleChange = (e) => {
    const sulakeKoko = e.target.value;
    const sulakeObj = Sulakkeet.find((s) => s.sulake === sulakeKoko);
    setSulake(sulakeObj);  
  }
  const handleValmistaja = (e) => {
    const sulakeValmistaja = e.target.value;
    const valmistajaObj = Sulakkeet.find((s) => s.valmistaja === sulakeValmistaja);
    setValmistaja(valmistajaObj.valmistaja)
  }
  const selectedSulake = Sulakkeet.find((s) => s.valmistaja === valmistaja && s.sulake === sulake);

  console.log({selectedSulake})
  const NeperinLuku = 2.718281
  const kappa = (1.02 + 0.98*NeperinLuku**(-3*(props.resistanssi/props.reaktanssi)))
  const Ip = kappa * Math.sqrt(2) * props.Icp

  /* Ip RAJOITETTU */
  
    /* const IpRajoitettu = 10**b * pkIcp**k
  const IcpRajoitettu = pkIp *  */
  return (
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
            <label htmlFor="valmistaja">Valmistaja</label>  
            {<select id='valmistaja' onChange={handleValmistaja} defaultValue="" > 
            {/* <select id='valmistaja' onChange={(e => setValmistaja(e.target.value))} defaultValue="" >    */}        
              <option value=""  >Valitse valmistaja</option>
              {Sulakkeet.filter((s, index, array) => index == array.map(s2=>s2.valmistaja).indexOf(s.valmistaja)).map((s) => (
                <option key={s.valmistaja} value={s.valmistaja} > 
                {s.valmistaja}
                  </option>
              ))}
                </select>}
              
            {/* </select> */}
            <label htmlFor="sulakekoko">Sulakekoko</label>  
            {<select id='sulakekoko' onChange={handleChange} defaultValue="" > 
              <option value="" disabled >Valitse sulake</option>
              {Sulakkeet.filter((s) => s.valmistaja == valmistaja).map((s) => (
                <option key={s.valmistaja + s.sulake} value={s.sulake} >
                  {s.sulake}
                </option>
              ))}
            </select> }
          </div>          
        </form>        
      )}
      
      {valmistaja && sulake && (
        <div style={{ marginLeft: 10}}>
          <p>tosi </p>
        </div> 
      )
      }    
    </>
  )
}

export default Paakeskus