import React from 'react'
import { useState } from 'react'
import Liittymispiste from './Liittymispiste'
import Syottokaapelit from './Syottokaapelit'

/* LIITTYMISPISTE */
const Ik3 = ( props ) => {
    console.log(props)
  /* const [ik, setIk] = useState()
  const [cosfii, setCosfii] = useState() */
  const [impedanssi, setImpedanssi] = useState([])
  const [resistanssi, setResistanssi] = useState([])
  const [reaktanssi, setReaktanssi] = useState([])
/* LIITTYMISKAAPELIT */

  return (
    <>
        <Liittymispiste 
            checkedIk3={props.checkedIk3} 
            /* ik={ik} setIk={setIk}
            cosfii={cosfii} setCosfii={setCosfii} */
            resistanssi={resistanssi} setResistanssi={setResistanssi}
            reaktanssi={reaktanssi} setReaktanssi={setReaktanssi}
            impedanssi={impedanssi} setImpedanssi={setImpedanssi}
        />
        {(impedanssi > 0) && (<Syottokaapelit 
            cable="Liittymiskaapeli"
            checkedIk3={props.checkedIk3} 
            resistanssi={resistanssi} setResistanssi={setResistanssi}
            reaktanssi={reaktanssi} setReaktanssi={setReaktanssi}
            impedanssi={impedanssi} setImpedanssi={setImpedanssi}
            /* valittuKaapeli={liittymisKaapeli} setValittuKaapeli={setliittymisKaapeli}
            pituus={lKPituus} setPituus={setlKPituus}  
            count={lkCount} setCount={setlkCount}
            resistanssi={lKResistanssi}
            reaktanssi={lKReaktanssi}
            impedanssi={lKImpedanssi}  */    
        />)}
    </>
  )
}

export default Ik3