// Kaapelin resistanssi ohm/m
export function Rkaapeli(r, pituus, count) {
    return r * pituus / 1000 / count
}

// Kaapelin reaktanssi ohm/m
export function Xkaapeli(x, pituus, count) {
    return x * pituus / 1000 / count
}

// Kaapelin impedanssi,  yksikkö ohm.
export function Zkaapeli(r, x) {
    return Math.sqrt(r**2 + x**2)
}

export function kappa(r, x) {
    return 1.02 + 0.98*Math.E**(-3*(r/x))
}

export function Ip(r, x) {
    return kappa(r, x) 
}

export function peR(materiaali,ala) {
    if (materiaali === 'Al') {
        return 35.898 * ala**-0.985
    } if (materiaali === 'Cu') {
        return 21.717 * ala**-0.986
    }
    
}