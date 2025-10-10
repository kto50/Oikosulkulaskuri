import { useState } from "react"
import D1Taulu from "./kaapelit.json"

export default function Liittymispiste(props) {
    const styles = { margin: 0, marginLeft: 10}
    console.log(props)
    const [ik1, setIk1] = useState("")

    const impedanssi = 237 / (props.liittymispiste.ik3 * 1000)
    props.setLiittymispiste(prev => ({...prev, 
        resistanssiIk3: impedanssi * prev.cosfii,
        reaktanssiIk3: Math.sqrt(Math.pow(impedanssi, 2) - Math.pow(prev.resistanssiIk3), 2)
    }));


    /* const [laskuri, setLaskuri] = useState ({
        ik3: false,
        ik1: false,
    });

    const handleChange = (e) => {
        const { name, checked } = e.target;
        setLaskuri((prevLaskuri) => ({...prevLaskuri, [name]: checked}))
    } */

    return (
        <>
            <h2>Liittymispiste</h2>

            <form className="liittymispiste">
                <div className="form-row">
                    <label htmlFor="ik3">3-vaiheinen oikosukuvirta</label>
                    <input id="ik3" type="number" value={props.liittymispiste.ik3} onChange={(e) => props.setLiittymispiste.ik3(e.target.value)}  placeholder="kA"/>
                    </div>
                    <div className="form-row">
                    <label htmlFor="cos-fii">Tehokerroin*</label>
                    <input id="cos-fii" type="number" value={props.liittymispiste.cosfii} onChange={(e) => props.liittymispiste.setLiittymispiste.cosfii(e.target.value)}  />
                </div>
            </form>
            <p>*Verkkoyhtiöt pyrkivät pitämän jakeluverkon tehokertoimen hieman induktiivisena (n. 0,995).
                Tällöin liittymäpisteen yläpuolisen verkon impedanssi on käytännössä pelkkää resistanssia ja 
                jakeluverkon reaktanssia ei tarvitse huomioida.
            </p>               
                {/* <p style={{margin: 0}}>*Pienjänniteverkossa yleensä esiintyvät tehokertoimen arvot (yli 0,9) eivät juuri vaikuta Kappan arvoon.</p> */}
                {/* {laskuri.ik1 && (
                    <div className="form-row">
                        <label htmlFor="ik1">1-vaiheinen oikosukuvirta</label>
                        <input id="ik1" type="number" value={ik1} onChange={(e) => setIk1(e.target.value)} placeholder="kA" />
                    </div>
                )} */}
            
            <div className="verkko">
                {props.ik3 && (
                    <div>
                        <p>Annetun 3-vaiheisen oikosulkuvirran ja tehokertoimen perusteella liittymäpistettä edeltävän verkon 
                        impedanssiksi Z, resistanssiksi R ja reaktanssiksi X saadaan:</p>
                        <p style={styles}>Z = {impedanssi.toPrecision(3)} Ω / km</p>
                        <p style={styles}>R = {props.liittymispiste.resistanssiIk3.toPrecision(3)} Ω / km</p>
                        <p style={styles}>X = {props.liittymispiste.reaktanssiIk3.toPrecision(3)} Ω / km</p>
                    </div> ) }
                
            </div>
            {/* <p><b> Haluatko laskea 3- vai 1-vaiheisen oikosulkuvirran vai molemmat?</b> </p>
            <div>
                <label>3-vaiheinen, Ik3:
                <input id="" type="checkbox" name="ik3" checked={laskuri.ik3} onChange={handleChange} />
                </label>
                <label>1-vaiheinen, Ik1:
                <input id="" type="checkbox" name="ik1" checked={laskuri.ik1} onChange={handleChange} />
                </label>                
            </div> */}
            {/* <div>
                <label>3-vaiheinen, Ik3:
                <input id="" type="checkbox" value={props.checkedIk3} onChange={(e) => props.setCheckedIk3(e.target.checked)} />
                </label>
                <label>1-vaiheinen, Ik1:
                <input id="" type="checkbox" value={props.checkedIk1} onChange={(e) => props.setCheckedIk1(e.target.checked)} />
                </label>                
            </div> */}
            {/* <p>Oikosulkuvirtojen laskemista varten tarvitaan liittymispistettä edeltävän verkon resistanssi ja reaktanssi. 
                Verkkoyhtiöltä saadaan pyytämällä liittymäpisteen oikosulkuvirrat. Syöttävä verkko voidaan Thevenin menetelmän
                mukaisesti yksinkertaistaa liittymäpistettä edeltävien verkon komponenttien yhteiseksi impendanssiksi ja 
                liityntäpisteen käyttöjännitteeksi. Oikosulkuvirta on käyttöjännitteen (huomioi c) ja verkon impedanssin osammäärä. 
                Koska liittymäpisteen oikosulkuvirta tiedetään, voidaan tietojen perusteella laskea verkon impedanssi. 
                Impedanssi voidaan edelleen jakaa resistanssiksi ja reaktanssiksi, kun verkon tehokerroin tiedetään.
                Verkkoyhtiöt säätävät verkkonsa tehokertoimen arvoon 0,995 loistehohäviöiden välttämiseksi. 
                <b>Tommi: Voidaanko tällä oletuksella määrittää edeltävän verkon resistanssi ja reaktanssi oikein?
                Vai pitääkö tässä ottaa huomioon myös liittymän kuormana olevien laitteiden (yhteiskuorman) tehokerroin?
                Eikö 3-vaiheisessa oikosulussa kuorma tipahda pois kuormittamasta vikapaikan yläpuolista verkkoa,
                jolloin oikosulkuvirtaan ei vaikuta kuorman tehokerroin, vaan vain vikapaikan yläpuolisen verkon 
                resistanssin ja reaktanssi? </b> </p>
            <p>Tämän jälkeen liittymispisteen alapuolisten komponenttien (lähinnä kaapelit) resistanssit ja reaktanssi 
                lasketaan erikseen yhteen ja lopuksi pythagoraan lauseen avulla impedanssi.
            </p> */}
            {/* <form className="liittymispiste">
                {laskuri.ik3 && (
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
                {laskuri.ik1 && (
                    <div className="form-row">
                        <label htmlFor="ik1">1-vaiheinen oikosukuvirta</label>
                        <input id="ik1" type="number" value={ik1} onChange={(e) => setIk1(e.target.value)} placeholder="kA" />
                    </div>
                )}
            </form>
            <div className="verkko">
                {props.ik3 && (
                    <div>
                        <p>Annetun 3-vaiheisen oikosulkuvirran ja tehokertoimen perusteella liittymäpistettä edeltävän verkon 
                        impedanssiksi Z, resistanssiksi R ja reaktanssiksi X saadaan:</p>
                        <p style={styles}>Z = {props.impedanssi.toPrecision(3)} Ω / km</p>
                        <p style={styles}>R = {props.resistanssi.toPrecision(3)} Ω / km</p>
                        <p style={styles}>X = {props.reaktanssi.toPrecision(3)} Ω / km</p>
                    </div> ) }
                
            </div> */}
            
        </>
    )
}