const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

// Configuration
const sourceDir = 'src/assets/sponsors';
const targetDir = 'src/assets/sponsors/optimized';
const maxWidth = 320; // Max width for sponsor images in slider

// Ensure target directory exists
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

// Get all image files from source directory
const imageFiles = fs.readdirSync(sourceDir)
  .filter(file => {
    // Only process images, skip directories and non-image files
    const ext = path.extname(file).toLowerCase();
    const isDir = fs.statSync(path.join(sourceDir, file)).isDirectory();
    return !isDir && ['.png', '.jpg', '.jpeg', '.webp', '.gif', '.avif'].includes(ext);
  });

console.log(`Found ${imageFiles.length} images to process`);

// Process each image
async function processImages() {
  for (const file of imageFiles) {
    const inputPath = path.join(sourceDir, file);
    const fileExt = path.extname(file).toLowerCase();
    const fileName = path.basename(file, fileExt);
    const outputPath = path.join(targetDir, `${fileName}.webp`); // Convert all to webp for better compression
    
    try {
      // Get image metadata
      const metadata = await sharp(inputPath).metadata();
      
      // Only resize if image is larger than maxWidth
      if (metadata.width > maxWidth) {
        await sharp(inputPath)
          .resize({ width: maxWidth })
          .webp({ quality: 80 })
          .toFile(outputPath);
          
        console.log(`✅ Optimized: ${file} (${metadata.width}x${metadata.height} → ${maxWidth}px width)`);
      } else {
        // If image is already small enough, just convert to webp
        await sharp(inputPath)
          .webp({ quality: 80 })
          .toFile(outputPath);
          
        console.log(`✅ Converted: ${file} (already ${metadata.width}px width)`);
      }
    } catch (error) {
      console.error(`❌ Error processing ${file}:`, error.message);
    }
  }
}

// Run the optimization
processImages().then(() => {
  console.log('Image optimization complete!');
}); 