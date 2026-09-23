Add-Type -AssemblyName System.Drawing
$imgPath = "c:\Users\Jayant\Desktop\saas\WeddingLook\LaunchKit\public\images\editorial\media_1790118434652.jpg"
$img = [System.Drawing.Bitmap]::FromFile($imgPath)

function Crop-Img($name, $x, $y, $w, $h) {
    $rect = New-Object System.Drawing.Rectangle($x, $y, $w, $h)
    $cropped = $img.Clone($rect, $img.PixelFormat)
    $outPath = "c:\Users\Jayant\Desktop\saas\WeddingLook\LaunchKit\public\images\editorial\" + $name + ".jpg"
    $cropped.Save($outPath, [System.Drawing.Imaging.ImageFormat]::Jpeg)
    $cropped.Dispose()
    Write-Host "Saved: $name"
}

# 1. Hero couple
Crop-Img "hero_couple" 270 38 405 290

# 2. Before & After
Crop-Img "before_girl" 292 708 130 156
Crop-Img "after_bride" 422 708 130 156

# 3. Occasions
Crop-Img "occ_haldi" 20 538 100 100
Crop-Img "occ_mehendi" 129 538 100 100
Crop-Img "occ_sangeet" 237 538 100 100
Crop-Img "occ_wedding" 346 538 100 100
Crop-Img "occ_reception" 454 538 100 100
Crop-Img "occ_guest" 563 538 100 100

# 4. Banner backdrop
Crop-Img "banner_couple" 0 868 682 150

$img.Dispose()
Write-Host "All assets cropped successfully!"
