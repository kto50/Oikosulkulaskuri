import { useEffect, useRef, useState } from "react"
import { updateNumberByIndex } from "./kaavat";

export default function Liittymispiste(props) {
    const styles = { margin: 0, marginLeft: 10}
    console.log(props)

    const ikRef = useRef();
    const cosfiiRef = useRef();

    
    const handleSubmit = (e) => {
        e.preventDefault();
        const ik = parseFloat(ikRef.current.value);
        const cosfii = parseFloat(cosfiiRef.current.value);

        const impedanssi = 237 / (ik * 1000);
        const resistanssi = impedanssi * cosfii;
        const reaktanssi = Math.sqrt(Math.pow(impedanssi, 2) - Math.pow(resistanssi, 2));

        /* props.setIk(ik);
        props.setCosfii(cosfii); */
        props.setImpedanssi(impedanssi);
        props.setResistanssi(resistanssi);
        props.setReaktanssi(reaktanssi);
        console.log({ik, cosfii,  impedanssi, resistanssi, reaktanssi });
    }
    /* useEffect(() => {
        impedanssi = 237 / (props.ik * 1000)
        const resistanssi = impedanssi * props.cosfii
        updateNumberByIndex(0, resistanssi, props.setResistanssi)
        console.log(props.resistanssi)
    },[props.ik, props.cosfii])
     */

    return (
        <>
            <h2>Liittymispiste</h2>
            <p>Oikosulkuvirtojen laskemista varten tarvitaan liittymispistettä edeltävän verkon resistanssi ja reaktanssi. 
                Verkkoyhtiöltä saadaan pyytämällä liittymäpisteen oikosulkuvirrat. 
                Koska oikosulkuvirta on liittymäpisteen käyttöjännitteen ja sitä edeltävän verkon impedanssin osammäärä, 
                voidaan Thevenin menetelmällä selvittää liittymispistettä edeltävän verkon impedanssi.
                Impedanssi voidaan edelleen jakaa resistanssiksi ja reaktanssiksi, kun verkon tehokerroin tiedetään.
                Verkkoyhtiöt säätävät verkkonsa tehokertoimen arvoon 0,995 loistehohäviöiden välttämiseksi. 
                <b>Tommi: Voidaanko tällä oletuksella määrittää edeltävän verkon resistanssi ja reaktanssi?</b> </p>
            <form className="liittymispiste" onSubmit={handleSubmit} >
                <div className="form-row">
                    {props.checkedIk3 && (<label htmlFor="ik">3-vaiheinen oikosukuvirta</label>)}
                    {props.checkedIk1 && (<label htmlFor="ik">1-vaiheinen oikosukuvirta</label>)}
                    <input id="ik" type="number" ref={ikRef} placeholder="kA"/>
                </div>
                <div className="form-row">
                    <label htmlFor="cos-fii">Tehokerroin*</label>
                    <input id="cos-fii" type="number" min="0" max="1" step="0.001" ref={cosfiiRef} />
                </div>
                <button type="submit" >Laske</button>
                <p style={{margin: 0}}>*Pienjänniteverkossa yleensä esiintyvät tehokertoimen arvot (yli 0,9) eivät juuri vaikuta Kappan arvoon.</p>
                
            </form>
            <div className="verkko">
                {props.checkedIk3 && (props.resistanssi > 0) && (
                    <div>
                        <p>Annetun 3-vaiheisen oikosulkuvirran ja tehokertoimen perusteella liittymäpistettä edeltävän verkon 
                        impedanssiksi Z, resistanssiksi R ja reaktanssiksi X saadaan:</p>
                        <p style={styles}>Z = {props.impedanssi.toPrecision(3)} Ω (lpImpedanssi = 237 / (ik3 * 1000))</p>
                        <p style={styles}>R = {props.resistanssi.toPrecision(3)} Ω (lpResistanssi = lpImpedanssi * cosfii)</p>
                        <p style={styles}>X = {props.reaktanssi.toPrecision(3)} Ω (lpReaktanssi = Math.sqrt(Math.pow(lpImpedanssi, 2) - Math.pow(lpResistanssi, 2))) </p>
                    </div> ) }
                
            </div>
            
        </>
    )
}