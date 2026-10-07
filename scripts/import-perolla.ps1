$BASE    = "https://facilzap.com.br/perolladotapajos"
$IMG_DIR = "C:\Users\eliez\Downloads\lumiere-semijoias\public\imgs\perolla"
$OUT_DIR = "C:\Users\eliez\Downloads\lumiere-semijoias\src\data"

$TYPOS = @{ "Brincco"="Brinco"; "Brancelete"="Bracelete"; "Chocker"="Choker"; "Semijoias"="Semijoia"; "Pulseiras"="Pulseira"; "Braceletes"="Bracelete"; "Colares"="Colar"; "Conjuntos"="Conjunto"; "Cravejadas"="Cravejada" }
$GENERICS = @("Brinco","Anel","Bracelete","Pulseira","Colar","Semijoia","Corrente","Argola","Conjunto","Choker","Cravejada")

function Fix-Name($name, $desc) {
  $f = $name.Trim()
  foreach ($k in $TYPOS.Keys) { if ($f -eq $k) { $f = $TYPOS[$k]; break } }
  if ($GENERICS -contains $f -and $desc -and $desc.Length -gt 3) {
    $words = (($desc -replace '\.$','') -split '\s+') | Select-Object -First 4
    $suffix = ($words -join ' ').Trim()
    if ($suffix.Length -gt 2) { $f = "$f $suffix" }
  }
  return (Get-Culture).TextInfo.ToTitleCase($f.ToLower())
}

Write-Host "Baixando catalogo..."
$cat = (Invoke-WebRequest "$BASE/catalogo.md" -UseBasicParsing).Content

$products = @()
foreach ($line in ($cat -split "`n")) {
  if ($line -match '^\-\s+\[(.+?)\]\(https://facilzap\.com\.br/perolladotapajos/produto/(\d+)\.md\):\s+R\$\s+([\d.,]+)\s+-\s+([^-\n]+?)(?:\s+-\s+(.+))?$') {
    $products += [PSCustomObject]@{ nome_original=$Matches[1].Trim(); id=$Matches[2]; preco_raw=$Matches[3].Trim(); categoria=$Matches[4].Trim(); desc_curta=if($Matches[5]){$Matches[5].Trim()}else{""} }
  }
}
Write-Host "Produtos: $($products.Count)"

$enriched = @(); $sem_foto = @(); $total = $products.Count; $i = 0

foreach ($p in $products) {
  $i++
  Write-Host "[$i/$total] $($p.id)"
  $detail = $null
  try { $detail = (Invoke-WebRequest "$BASE/produto/$($p.id).md" -UseBasicParsing).Content } catch {}

  $desc = ""; $sku = "FZ$($p.id)"; $estoque = 0; $imgUrls = @()
  if ($detail) {
    if ($detail -match '## Descricao\r?\n+([^\n#]+)') { $desc = $Matches[1].Trim() }
    if ($detail -match '\*\*SKU:\*\*\s*(\S+)') { $sku = $Matches[1] }
    if ($detail -match 'Em estoque \((\d+)') { $estoque = [int]$Matches[1] }
    elseif ($detail -match 'Em estoque') { $estoque = 99 }
    foreach ($ln in ($detail -split "`n")) {
      if ($ln -match 'https://arquivos\.facilzap\.app\.br/produtos/([^\s\)]+)') { $imgUrls += $Matches[0].Trim() }
    }
  }
  if (-not $desc -and $p.desc_curta) { $desc = $p.desc_curta }
  $preco = try { [decimal]($p.preco_raw -replace '\.(?=\d{3})' -replace ',','.') } catch { 0 }
  $nome = Fix-Name $p.nome_original $desc

  $localImgs = @()
  $n = 0
  foreach ($url in $imgUrls) {
    $n++
    $fname = "$($p.id)-$n.webp"
    $fpath = "$IMG_DIR\$fname"
    if (-not (Test-Path $fpath)) { try { Invoke-WebRequest $url -OutFile $fpath -UseBasicParsing; Start-Sleep -Milliseconds 150 } catch {} }
    if ((Test-Path $fpath) -and (Get-Item $fpath).Length -gt 0) { $localImgs += "/imgs/perolla/$fname" }
  }
  if ($localImgs.Count -eq 0) { $sem_foto += $p.id }

  $enriched += [PSCustomObject]@{
    id=$p.id; sku=$sku; nome=$nome; nome_original=$p.nome_original; preco=$preco
    categoria=$p.categoria; subcategoria=""; descricao=$desc; estoque=$estoque
    disponivel=($estoque -gt 0); sem_foto=($localImgs.Count -eq 0); imagens=$localImgs; url_origem="$BASE/produto/$($p.id)"
  }
  Start-Sleep -Milliseconds 200
}

$json = $enriched | ConvertTo-Json -Depth 5
[System.IO.File]::WriteAllText("$OUT_DIR\perolla-products.json", $json, [System.Text.Encoding]::UTF8)

$csvRows = $enriched | ForEach-Object {
  $imgs = $_.imagens -join "|"
  [PSCustomObject]@{ id=$_.id; sku=$_.sku; nome=$_.nome; nome_original=$_.nome_original; preco=$_.preco; categoria=$_.categoria; descricao=$_.descricao; estoque=$_.estoque; disponivel=$_.disponivel; sem_foto=$_.sem_foto; imagens=$imgs; url_origem=$_.url_origem }
}
$csvRows | Export-Csv "$OUT_DIR\perolla-products.csv" -NoTypeInformation -Encoding UTF8

Write-Host "=== RELATORIO ==="
Write-Host "Total: $($enriched.Count)"
Write-Host "Sem foto: $($sem_foto.Count) — IDs: $($sem_foto -join ', ')"
$enriched | Group-Object categoria | Sort-Object Name | ForEach-Object { Write-Host "  $($_.Name): $($_.Count)" }
Write-Host "Arquivos salvos em $OUT_DIR"
