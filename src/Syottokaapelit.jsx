import { useEffect, useState } from "react"

import Kaapelit from "./kaapelit.json"
import { peR, Rkaapeli, Xkaapeli, Zkaapeli } from "./kaavat"

export default function Syottokaapelit(props) {
    // console.log(props)
    const styles = {  marginBottom: 0, marginTop: 0, marginLeft: 10}  
    
    const [values, setValues] = useState({
        pituus: null,
        penAla: null,
        materiaali: null,
        resistanssi: null,
        reaktanssi: null,
        impedanssi: null,
    });
    const handleValues = (e) => {
        const { name, value } = e.target;
        setValues({ ...values, [name]: value });
    };

    const [count, setCount] = useState(1)
    const handleCountUp = () => {
        setCount(count + 1);
    }
    const handleCountDown = () => {
        setCount(count > 1 ? count - 1 : count);

    };
    /* const peR1 = peR(materiaali, penala ) */
    //console.log(props)
    const [valittuKaapeli, setValittuKaapeli] =useState("")
    const handleChange = (e) => {
        const kaapeliNimi = e.target.value;
        const kaapeliObj = Kaapelit.find((k) =>
            props.cable === "Liittymiskaapeli"
                ? k.kaapeli4 === kaapeliNimi
                : k.kaapeli5 === kaapeliNimi
            );
        setValittuKaapeli(kaapeliObj);
    };

    useEffect(() =>{
        if (!valittuKaapeli || !values.pituus) return;
        setValues((prevValues) => {
            const calculatedResistanssi = Rkaapeli(valittuKaapeli.resreka20, prevValues.pituus, count);
            const calculatedReaktanssi = Xkaapeli(valittuKaapeli.reaktanssi,  prevValues.pituus, count);
            return {
                ...prevValues,
                resistanssi: calculatedResistanssi,
                reaktanssi: calculatedReaktanssi,
                impedanssi: Zkaapeli(calculatedResistanssi, calculatedReaktanssi)
            };
        });
    }, [valittuKaapeli, values.pituus, count])

    /* useEffect(() => {
        impedanssi = 237 / (props.ik * 1000)
        const resistanssi = impedanssi * props.cosfii
        updateNumberByIndex(0, resistanssi, props.setResistanssi)
        console.log(props.resistanssi)
    },[props.ik, props.cosfii])
     */


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
                        {Kaapelit.map((k, i) => {
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
                    <input id="pituus" name="pituus" type="number" value={values.pituus} onChange={handleValues} placeholder="metriä"/>
                </div>
                <div className="form-row">
                    <label htmlFor="lkm">Lukumäärä</label>
                    <p style={{ border: "2px solid black", borderRadius: "6px", padding: "4px 12px"}} >{count}</p>
                    <button 
                        onClick={handleCountDown} 
                        className="px-4 py-2 bg-red-500 text-white rounded-lg"
                    >
                    - Vähennä
                    </button>
                    <button 
                        onClick={handleCountUp} 
                        className="px-4 py-2 bg-green-500 text-white rounded-lg"
                    >
                    + Lisää
                    </button>                   
                </div>  
                {props.checkedIk1 && (<div>
                    <div className="form-row">
                        <label htmlFor="penAla">PEN poikkipinta-ala</label>
                        <input id="penAla" name="penAla" type="number" placeholder="neliömilliä" min="1.5" max="300" value={values.penAla} onChange={handleValues} />
                    </div>
                    <div className="form-row">
                        <label htmlFor="pen-materiaali">PEN materiaali</label>
                        <select id="pen-materiaali" name="pen-materiaali" value={values.materiaali} onChange={handleValues} >
                            <option value="Al">Alumiini</option>
                            <option value="Cu">Kupari</option>
                        </select>
                    </div> 
                </div>)}        
            </form>
                 
            <div>
                {valittuKaapeli && (
                    <div>
                        {props.checkedIk1 ? 
                        <>
                            <h3 style={{margin: 0}}>Ik1</h3> RESISTANSSIT OVAT IK3:N MUKAISET. MUUTA!            
                            <p style={{marginBottom: 0}} >Kaapelityyppi: (kaapelin arvot Prysmian taulukosta. En verrannut vielä kaikkia k.tyyppejä Rekan vastaaviin, mutta arvot näyttivät samoilta))</p>
                            <p style={styles} >R = {valittuKaapeli.resreka20} Ω / km</p> 
                            <p style={styles} >X = {valittuKaapeli.reaktanssi} Ω / km - jos lopussa oli nollia, ne tippuivat pois json tiedostoa luotaessa</p>                       
                        </>
                            : <h3 style={{margin: 0}}>Ik3</h3>}
                            <p style={{marginBottom: 0}} >Kaapelityyppi: (kaapelin arvot Prysmian taulukosta. En verrannut vielä kaikkia k.tyyppejä Rekan vastaaviin, mutta arvot näyttivät samoilta))</p>
                            <p style={styles} >R = {valittuKaapeli.resreka20} Ω / km</p> 
                            <p style={styles} >X = {valittuKaapeli.reaktanssi} Ω / km - jos lopussa oli nollia, ne tippuivat pois json tiedostoa luotaessa</p>                       
                       
                    </div>                
                )}
                {values.pituus && (
                    <div>
                        {(<p style={styles}>
                            Pituus: {values.pituus} metriä</p>)}
                        {(<p style={styles}>
                            R = {values.resistanssi?.toPrecision(6) ?? "-"} Ω / syöttökaapeli (return R * values.pituus / 1000 / count) </p> ) }
                        {(<p style={styles}>
                            X = {values.reaktanssi?.toPrecision(6) ?? "-"} Ω / syöttökaapeli (return X * values.pituus / 1000 / count) </p> ) }
                        {(<p style={styles}>
                            Z = {values.impedanssi?.toPrecision(6) ?? "-"} Ω / syöttökaapeli </p> ) }

                    </div>
                )}
                {/* {peR1 && (
                    <div>
                        <h3>Ik1</h3>
                        <p>{(peR1 * values.pituus + props.impedanssi).toPrecision(6)}</p>
                    </div>
                )} */}
            </div>
        </>
    )
}