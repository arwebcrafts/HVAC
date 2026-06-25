#!/bin/bash

# Target folder
IMG_DIR="public/images"

echo "=== Starting Image Optimization ==="

# 1. Resize and convert Hero Background (to max 1600px width)
if [ -f "$IMG_DIR/hero-bg.jpg" ]; then
  echo "Optimizing hero-bg.jpg..."
  sips --resampleWidth 1600 "$IMG_DIR/hero-bg.jpg" --out "$IMG_DIR/hero-bg-resized.jpg" > /dev/null
  cwebp -q 82 "$IMG_DIR/hero-bg-resized.jpg" -o "$IMG_DIR/hero-bg.webp"
  rm "$IMG_DIR/hero-bg-resized.jpg"
  rm "$IMG_DIR/hero-bg.jpg"
fi

# 2. Resize and convert other before/after and gallery images (to max 1000px width)
for file in "$IMG_DIR"/*.jpg "$IMG_DIR"/*.png; do
  # Skip if file doesn't exist
  [ -e "$file" ] || continue
  
  # Get basename
  base_name=$(basename "$file")
  
  # Skip already deleted/processed files or webp files
  if [[ "$base_name" == *"hero-bg"* || "$base_name" == *.webp ]]; then
    continue
  fi
  
  echo "Optimizing $base_name..."
  
  # Output path for WebP
  name_without_ext="${base_name%.*}"
  output_webp="$IMG_DIR/$name_without_ext.webp"
  
  # Resize temp file
  temp_resized="$IMG_DIR/${name_without_ext}_temp.jpg"
  sips --resampleWidth 1000 "$file" --out "$temp_resized" > /dev/null
  
  # Convert to WebP
  cwebp -q 80 "$temp_resized" -o "$output_webp"
  
  # Clean up
  rm "$temp_resized"
  rm "$file"
done

echo "=== Image Optimization Complete ==="
ls -lh "$IMG_DIR"
