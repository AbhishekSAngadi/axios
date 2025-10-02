#!/usr/bin/env node
// csv_to_json.js
// Simple Node.js script to convert a CSV file to JSON
// Usage:
//   node csv_to_json.js input.csv output.json

import fs from 'fs';
import path from 'path';

// Helper to parse CSV lines
function parseCSV(data) {
  const lines = data.split(/\r?\n/).filter(line => line.trim() !== '');
  if (lines.length === 0) return [];

  const headers = lines[0].split(',').map(h => h.trim());
  const rows = lines.slice(1).map(line => {
    const values = line.split(',').map(v => v.trim());
    const obj = {};
    headers.forEach((h, i) => {
      obj[h] = values[i] || null;
    });
    return obj;
  });
  return rows;
}

// Main function
function main() {
  const args = process.argv.slice(2);
  if (args.length < 2) {
    console.error('Usage: node csv_to_json.js <input.csv> <output.json>');
    process.exit(1);
  }

  const [inputFile, outputFile] = args;
  if (!fs.existsSync(inputFile)) {
    console.error(`Input file "${inputFile}" does not exist.`);
    process.exit(1);
  }

  const csvData = fs.readFileSync(inputFile, 'utf-8');
  const jsonData = parseCSV(csvData);

  fs.writeFileSync(outputFile, JSON.stringify(jsonData, null, 2), 'utf-8');
  console.log(`Converted ${inputFile} → ${outputFile} ✅`);
}

main();
