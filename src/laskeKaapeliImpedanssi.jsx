export function laskeKaapeliImpedanssi(kaapeli, pituus) {
  const p = Number(pituus) || 0;
  if (!kaapeli || typeof kaapeli.resreka20 !== "number" || typeof kaapeli.reaktanssi !== "number" || p <= 0) {
    return { R: 0, X: 0, Z: 0 };
  }
  const R = kaapeli.resreka20 * p / 1000;
  const X = kaapeli.reaktanssi * p / 1000;
  const Z = Math.sqrt(R * R + X * X);
  return { R, X, Z };
}

