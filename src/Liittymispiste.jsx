import { useState } from "react"

export default function Liittymispiste(props) {
    const styles = { margin: 0, marginLeft: 10}
    // console.log(props)
    const [ik1, setIk1] = useState("")

    return (
        <>
            <h2>Liittymispiste</h2>
            <p><b> Haluatko laskea 3- vai 1-vaiheisen oikosulkuvirran vai molemmat?</b> </p>
            <div>
                <label>3-vaiheinen, Ik3:
                <input id="" type="checkbox" value={props.checkedIk3} onChange={(e) => props.setCheckedIk3(e.target.checked)} />
                </label>
                <label>1-vaiheinen, Ik1:
                <input id="" type="checkbox" value={props.checkedIk1} onChange={(e) => props.setCheckedIk1(e.target.checked)} />
                </label>                
            </div>
            <p>Oikosulkuvirtojen laskemista varten tarvitaan liittymispistettä edeltävän verkon resistanssi ja reaktanssi. 
                Verkkoyhtiöltä saadaan pyytämällä liittymäpisteen oikosulkuvirrat. 
                Koska oikosulkuvirta on liittymäpisteen käyttöjännitteen ja sitä edeltävän verkon impedanssin osammäärä, 
                voidaan Thevenin menetelmällä selvittää liittymispistettä edeltävän verkon impedanssi.
                Impedanssi voidaan edelleen jakaa resistanssiksi ja reaktanssiksi, kun verkon tehokerroin tiedetään.
                Verkkoyhtiöt säätävät verkkonsa tehokertoimen arvoon 0,995 loistehohäviöiden välttämiseksi. 
                <b>Tommi: Voidaanko tällä oletuksella määrittää edeltävän verkon resistanssi ja reaktanssi?</b> </p>
            <form className="liittymispiste">
                {props.checkedIk3 && (
                    <>
                        <div className="form-row">
                        <label htmlFor="ik3">3-vaiheinen oikosukuvirta</label>
                        <input id="ik3" type="number" value={props.ik3} onChange={(e) => props.setIk3(e.target.value)}  placeholder="kA"/>
                        </div>
                        <div className="form-row">
                        <label htmlFor="cos-fii">Tehokerroin*</label>
                        <input id="cos-fii" type="number" value={props.cosfii} onChange={(e) => props.setCosfii(e.target.value)}  />
                        </div>
                        <p style={{margin: 0}}>*Pienjänniteverkossa yleensä esiintyvät tehokertoimen arvot (yli 0,9) eivät juuri vaikuta Kappan arvoon.</p>

                    </>
                )}
                
                {props.checkedIk1 && props.checkedIk1 && (
                    <div className="form-row">
                        <label htmlFor="ik1">1-vaiheinen oikosukuvirta</label>
                        <input id="ik1" type="number" value={ik1} onChange={(e) => setIk1(e.target.value)} placeholder="kA" />
                    </div>
                )}
            </form>
            <div className="verkko">
                {props.checkedIk3 && props.ik3 && (
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