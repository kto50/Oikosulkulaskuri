//import * as XLSX from "xlsx";
//import { writeFileSync } from "fs";

export function d1tojson() {

    // Lataa Excel
    const workbook = XLSX.readFile("./d1taulu.xlsx");

    // Ota ensimmäinen taulukko
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];

    // Muunna JSONiksi
    const rows = XLSX.utils.sheet_to_json(sheet);

    // Muokkaa haluttuun muotoon
    /* const populationData = {};
    rows.forEach(row => {
    const country = row.Maa.toLowerCase();
    const year = row.Vuosi.toString();
    const value = row.Väestö;
    if (!populationData[country]) populationData[country] = {};
    populationData[country][year] = value;
    }); */

    // Tallenna JSON-tiedostoksi
    writeFileSync("data.json", JSON.stringify(rows, null, 2));

    console.log("Muunnettu data.json tiedosto luotu!");
}