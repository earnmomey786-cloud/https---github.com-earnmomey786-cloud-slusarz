/*
Simple script to wrap an existing PNG into a .ico container.
It reads public/favicon.png, extracts width/height from the PNG IHDR chunk,
creates a minimal ICO header (ICONDIR + one ICONDIRENTRY) and appends the PNG bytes.
No external dependencies required. Run with: node scripts/generate-favicon.js
*/
const fs = require('fs');
const path = require('path');

const pngPath = path.join(__dirname, '..', 'public', 'favicon.png');
const icoPath = path.join(__dirname, '..', 'public', 'favicon.ico');

if (!fs.existsSync(pngPath)) {
  console.error('Source PNG not found:', pngPath);
  process.exit(2);
}

const png = fs.readFileSync(pngPath);
// Very small validation: PNG signature
if (png.readUInt32BE(0) !== 0x89504e47 || png.readUInt32BE(4) !== 0x0d0a1a0a) {
  console.error('File does not look like a PNG (invalid signature)');
  process.exit(3);
}
// IHDR chunk starts at offset 8 + 4(length) + 4('IHDR') = 16
const ihdrOffset = 16;
const width = png.readUInt32BE(ihdrOffset);
const height = png.readUInt32BE(ihdrOffset + 4);
console.log('Detected PNG size:', width, 'x', height);

// ICONDIR (6 bytes): Reserved (2) = 0, Type (2) = 1 (icon), Count (2) = 1
const iconDir = Buffer.alloc(6);
iconDir.writeUInt16LE(0, 0); // reserved
iconDir.writeUInt16LE(1, 2); // type = 1 for icon
iconDir.writeUInt16LE(1, 4); // count = 1

// ICONDIRENTRY (16 bytes)
const entry = Buffer.alloc(16);
entry.writeUInt8(width >= 256 ? 0 : width, 0); // width, 0 means 256
entry.writeUInt8(height >= 256 ? 0 : height, 1); // height
entry.writeUInt8(0, 2); // color palette count
entry.writeUInt8(0, 3); // reserved
entry.writeUInt16LE(0, 4); // color planes (0 for PNG data)
entry.writeUInt16LE(0, 6); // bits per pixel (0 for PNG)
entry.writeUInt32LE(png.length, 8); // bytes in resource
const imageOffset = iconDir.length + entry.length; // typically 22
entry.writeUInt32LE(imageOffset, 12);

const ico = Buffer.concat([iconDir, entry, png]);
fs.writeFileSync(icoPath, ico);
console.log('Wrote ICO to', icoPath, 'size:', ico.length);
