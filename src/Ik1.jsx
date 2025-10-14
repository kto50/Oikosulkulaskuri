import React from 'react'
import { useState } from 'react'
import Liittymispiste from './Liittymispiste'

const Ik1 = ( props ) => {

  /* const [ik, setIk] = useState("")
  const [cosfii, setCosfii] = useState("0.995") */
  const [impedanssi, setImpedanssi] = useState([])
  const [resistanssi, setResistanssi] = useState([])
  const [reaktanssi, setReaktanssi] = useState([])
  
    return (
        <>
            <Liittymispiste 
                checkedIk1={props.checkedIk1} 
               /*  ik={ik} setIk={setIk}
                cosfii={cosfii} setCosfii={setCosfii} */
                resistanssi={resistanssi} setResistanssi={setResistanssi}
                reaktanssi={reaktanssi} setReaktanssi={setReaktanssi}
                impedanssi={impedanssi} setImpedanssi={setImpedanssi}
            />
            {/* {ik3 && cosfii && (<Syottokaapelit 
                cable="Liittymiskaapeli"
                valittuKaapeli={liittymisKaapeli} setValittuKaapeli={setliittymisKaapeli}
                pituus={lKPituus} setPituus={setlKPituus}  
                count={lkCount} setCount={setlkCount}
                resistanssi={lKResistanssi}
                reaktanssi={lKReaktanssi}
                impedanssi={lKImpedanssi}     
            />)} */}
        </>
  )
}

export default Ik1