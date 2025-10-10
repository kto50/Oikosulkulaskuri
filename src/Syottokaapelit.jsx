import { useState } from "react"
import D1Taulu from "./kaapelit.json"

export default function Syottokaapelit(props) {
    // console.log(props)
    const styles = {  marginBottom: 0, marginTop: 0, marginLeft: 10}  
    
    const [penala, setPenala] =useState("")
    
    const handleChange = (e) => {
        const kaapeliNimi = e.target.value;
        const kaapeliObj = D1Taulu.find((k) =>
        props.cable === "Liittymiskaapeli"
            ? k.kaapeli4 === kaapeliNimi
            : k.kaapeli5 === kaapeliNimi
        );
        props.setValittuKaapeli(kaapeliObj);
    };

    return (
        <>
            <h2>{props.cable}</h2>
            <form className="kaapelit">
                <div className="form-row">
                    <label htmlFor="tyyppi">Tyyppi</label>
                    <select id="tyyppi" onChange={handleChange} defaultValue="" >
                        <option value="" disabled>
                            Valitse kaapeli
                        </option>
                        {D1Taulu.map((k, i) => {
                            const valinta = props.cable === "Liittymiskaapeli" ? k.kaapeli4 : k.kaapeli5;
                            return (
                            <option key={`${props.cable}-${i}`} value={valinta}>
                                {valinta}
                            </option>
                            );
                        })}
                        </select>                     
                </div>
                <div className="form-row">
                    <label htmlFor="pituus">Pituus</label>
                    <input id="pituus" type="number" min={1} value={props.pituus} onChange={(e) => props.setPituus(e.target.value)} placeholder="metriä"/>
                </div>
                </form>
                <div className="form-row">
                    <label htmlFor="lkm">Lukumäärä</label>
                    <p style={{ border: "2px solid black", borderRadius: "6px", padding: "4px 12px"}} >{props.count}</p>
                    <button 
                        onClick={() => props.setCount(props.count > 1 ? props.count - 1 : props.count)} 
                        className="px-4 py-2 bg-red-500 text-white rounded-lg"
                    >
                    - Vähennä
                    </button>
                    <button 
                        onClick={() => props.setCount(props.count + 1)} 
                        className="px-4 py-2 bg-green-500 text-white rounded-lg"
                    >
                    + Lisää
                    </button>                   
                </div> 
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
            
            <div>
                {props.valittuKaapeli && (
                    <div>
                        <p style={{marginBottom: 0}} >Kaapelityyppi: </p>
                        <p style={styles} >R = {props.valittuKaapeli.resreka20} Ω / km</p> 
                        <p style={styles} >X = {props.valittuKaapeli.reaktanssi} Ω / km - jos lopussa oli nollia, ne tippuivat pois json tiedostoa luotaessa</p>                       
                    </div>                
                )}
                {props.pituus && (
                    <div>
                        {(<p style={styles}>
                            Pituus: {props.pituus} metriä ja yhteensä {props.count} kaapelia </p>)}
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