import React from 'react'
import { useState } from 'react';

function Skeskus({ id, keskus, poista, paivita }) {
  const [muokkaustila, setMuokkaustila] = useState(false);
  const [uusiNimi, setUusiNimi] = useState(keskus);

  const tallenna = () => {
    if (uusiNimi.trim() === "") return;
    paivita(id, uusiNimi);
    setMuokkaustila(false);
  };

  return (
    <div className="border rounded p-3 shadow flex justify-between items-center">
      {muokkaustila ? (
        <input
          type="text"
          value={uusiNimi}
          onChange={(e) => setUusiNimi(e.target.value)}
          className="flex-1 border rounded px-2 py-1 mr-2"
        />
      ) : (
        <h2 className="font-medium flex-1">{keskus}</h2>
      )}

      <div className="flex gap-2">
        {muokkaustila ? (
          <button
            onClick={tallenna}
            className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600"
          >
            Tallenna
          </button>
        ) : (
          <button
            onClick={() => setMuokkaustila(true)}
            className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600"
          >
            Muokkaa
          </button>
        ) }
        <button
          onClick={poista}
          className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
        >
          Poista
        </button>
      </div>
    </div>
  );
}

export default Skeskus