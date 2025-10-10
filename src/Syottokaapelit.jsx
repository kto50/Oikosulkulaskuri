import { useState } from "react"
import D1Taulu from "./csvjson.json"

export default function Syottokaapelit(props) {
    // console.log(props)
    const styles = {  marginBottom: 0, marginTop: 0, marginLeft: 10}  
    
    const [penala, setPenala] =useState("")
    //console.log(props)

    const handleChange = (e) => {
        const kaapeliNimi = e.target.value;
        const kaapeliObj = D1Taulu.find((k) => k.kaapeli === kaapeliNimi);
        props.setValittuKaapeli(kaapeliObj);
    }

    return (
        <>
            <h2>{props.cable}</h2>
            <form className="kaapelit"  onClick={e => e.preventDefault()} >
                <div className="form-row">
                    <label htmlFor="tyyppi">Tyyppi</label>
                    <select id="tyyppi" onChange={handleChange} defaultValue="" >
                        <option value="" disabled>
                            Valitse kaapeli
                        </option>
                        {D1Taulu.map((k) => (
                            <option key={k.kaapeli} value={k.kaapeli}  >
                                {k.kaapeli}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="form-row">
                    <label htmlFor="pituus">Pituus</label>
                    <input id="pituus" type="number" value={props.pituus} onChange={(e) => props.setPituus(e.target.value)} placeholder="metriä"/>
                </div>
                <div className="form-row">
                <label htmlFor="lkm">Lukumäärä</label>
                <p style={{ border: "2px solid black", borderRadius: "6px", padding: "4px 12px"}} >{props.lkm}</p>
                <button 
                    onClick={() => props.setLkm(props.lkm > 1 ? props.lkm - 1 : props.lkm)} 
                    className="px-4 py-2 bg-red-500 text-white rounded-lg"
                >
                - Vähennä
                </button>
                <button 
                    onClick={() => props.setLkm(props.lkm + 1)} 
                    className="px-4 py-2 bg-green-500 text-white rounded-lg"
                >
                + Lisää
                </button>                   
            </div>  
                {/* <div className="form-row">
                    <label htmlFor="lkm">Lukumäärä</label>
                    <input id="lkm" type="number" value={props.lkm} onChange={(e) => props.setLkm(e.target.value)} />
                </div>  */}
                {/* <div className="form-row">
                    <label htmlFor="pen-ala">PEN poikkipinta-ala</label>
                    <input id="pen-ala" type="number" placeholder="neliömilliä" min="1.5" max="300" value={penala} onChange={(e) => setPenala(e.target.value)} />
                </div>
                <div className="form-row">
                    <label htmlFor="pen-materiaali">PEN materiaali</label>
                    <select id="pen-materiaali" name="materiaali" >
                        <option value="Al">Alumiini</option>
                        <option value="Cu">Kupari</option>
                    </select>

                </div> */}         
            </form>
                 
            <div>
                {props.valittuKaapeli && (
                    <div>
                        <p style={{marginBottom: 0}} >Kaapelityyppi: {props.valittuKaapeli.kaapeli}</p>
                        <p style={styles} >R = {props.valittuKaapeli.resistanssi} Ω / km</p> 
                        <p style={styles} >X = {props.valittuKaapeli.reaktanssi} Ω / km - jos lopussa oli nollia, ne tippuivat pois json tiedostoa luotaessa</p>                       
                    </div>                
                )}
                {props.pituus && (
                    <div>
                        {(<p style={styles}>
                            Pituus: {props.pituus} metriä</p>)}
                        {(<p style={styles}>
                            R = {props.resistanssi} Ω / syöttökaapeli</p> ) }
                        {(<p style={styles}>
                            X = {props.reaktanssi} Ω / syöttökaapeli</p> ) }
                        {(<p style={styles}>
                            Z = {props.impedanssi.toPrecision(4)} Ω / syöttökaapeli</p> ) }

                    </div>
                )}
            </div>
        </>
    )
}