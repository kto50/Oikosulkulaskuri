import { useState } from "react"
import Syottokaapelit from "./Syottokaapelit"
import D1Taulu from "./csvjson.json"
import Liittymispiste from "./Liittymispiste"


const kaapeli = "Al 4 x 25"
const haeKaapelinOminaisuus = find((e) => e.kaapeli = kaapeli)


export default function Lahtotiedot() {

    
    

    return (
        <>
            <h2>Lähtötietoja</h2>
            <Liittymispiste />
                        
            <Syottokaapelit 
                kaapeli="Liittymiskaapeli"                
            />
            <Syottokaapelit
                kaapeli="Alakeskuksen syöttökaapeli" />
        </>
    
    )
}