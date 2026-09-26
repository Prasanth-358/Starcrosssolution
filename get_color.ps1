Add-Type -AssemblyName System.Drawing
$img = new-object System.Drawing.Bitmap 'C:\Users\Prasanth\.gemini\antigravity-ide\brain\6f5d55c5-a906-47a2-8f2f-cd862ba8feaa\.user_uploaded\media_1789250300720.png'
$pixel = $img.GetPixel(10, 10)
Write-Output ("Hex: #{0:X2}{1:X2}{2:X2}" -f $pixel.R, $pixel.G, $pixel.B)
