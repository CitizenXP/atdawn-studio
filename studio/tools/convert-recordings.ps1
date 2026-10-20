# ============================================================
#  Turn studio recordings into editable MP4s
#  ============================================================
#  Guests' local recordings arrive as .webm. The video inside is already
#  H.264, so the video is copied rather than re-encoded: a two-hour show
#  converts in seconds, not hours. Only the audio is re-encoded, from Opus
#  to AAC, because Premiere and Resolve refuse Opus inside an MP4.
#
#  Usage:
#      .\convert-recordings.ps1                     # converts .\ into .\converted
#      .\convert-recordings.ps1 -Path D:\Show       # converts that folder
#      .\convert-recordings.ps1 -AudioOnly          # also write a .m4a per guest
#
#  Needs ffmpeg on PATH:  winget install Gyan.FFmpeg
# ============================================================
param(
    [string]$Path = ".",
    [string]$Out = "",
    [switch]$AudioOnly
)

$ErrorActionPreference = "Stop"

if (-not (Get-Command ffmpeg -ErrorAction SilentlyContinue)) {
    Write-Host "ffmpeg not found on PATH." -ForegroundColor Red
    Write-Host "Install it with:  winget install Gyan.FFmpeg" -ForegroundColor Yellow
    Write-Host "then close and reopen this terminal."
    exit 1
}

$src = Resolve-Path $Path
if ($Out -eq "") { $Out = Join-Path $src "converted" }
if (-not (Test-Path $Out)) { New-Item -ItemType Directory -Path $Out | Out-Null }

$files = Get-ChildItem -Path $src -Filter *.webm -File
if ($files.Count -eq 0) {
    Write-Host "No .webm files found in $src" -ForegroundColor Yellow
    Write-Host "Guests' recordings normally land in their Downloads folder."
    exit 0
}

Write-Host "Converting $($files.Count) recording(s) from $src" -ForegroundColor Cyan
Write-Host ""

$ok = 0
$failed = @()
foreach ($f in $files) {
    $name = [System.IO.Path]::GetFileNameWithoutExtension($f.Name)
    $dest = Join-Path $Out "$name.mp4"
    Write-Host ("  {0,-45}" -f $f.Name) -NoNewline

    # video stream-copied, audio to AAC
    & ffmpeg -v error -y -i $f.FullName -c:v copy -c:a aac -b:a 192k -movflags +faststart $dest 2>$null
    if ($LASTEXITCODE -ne 0) {
        # the take may predate the H.264 setting, so fall back to a real encode
        & ffmpeg -v error -y -i $f.FullName -c:v libx264 -preset veryfast -crf 18 -c:a aac -b:a 192k -movflags +faststart $dest 2>$null
    }

    if ((Test-Path $dest) -and ((Get-Item $dest).Length -gt 0)) {
        $mb = [math]::Round((Get-Item $dest).Length / 1MB, 1)
        Write-Host " -> $name.mp4  ($mb MB)" -ForegroundColor Green
        $ok++
        if ($AudioOnly) {
            $wav = Join-Path $Out "$name.m4a"
            & ffmpeg -v error -y -i $f.FullName -vn -c:a aac -b:a 256k $wav 2>$null
        }
    } else {
        Write-Host " FAILED" -ForegroundColor Red
        $failed += $f.Name
    }
}

Write-Host ""
Write-Host "Converted $ok of $($files.Count) into $Out" -ForegroundColor Green
if ($failed.Count -gt 0) {
    Write-Host "Could not convert:" -ForegroundColor Red
    $failed | ForEach-Object { Write-Host "  $_" }
    Write-Host "Keep the original .webm files: they still hold the recording."
}
