# Script de Teste Completo do DeliveryApp
# Executa testes manuais das principais funcionalidades

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "TESTE COMPLETO - DELIVERYAPP" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

$baseUrl = "http://localhost:3000"
$testResults = @()

function Test-Endpoint {
    param($name, $url)
    Write-Host "Testando: $name..." -NoNewline
    try {
        $response = Invoke-WebRequest -Uri $url -Method GET -TimeoutSec 10 -UseBasicParsing -ErrorAction Stop
        if ($response.StatusCode -eq 200) {
            Write-Host " OK (200)" -ForegroundColor Green
            return $true
        } else {
            Write-Host " ERRO ($($response.StatusCode))" -ForegroundColor Red
            return $false
        }
    } catch {
        Write-Host " ERRO: $($_.Exception.Message)" -ForegroundColor Red
        return $false
    }
}

Write-Host "1. TESTANDO PAGINAS PRINCIPAIS" -ForegroundColor Yellow
Write-Host "================================" -ForegroundColor Yellow
$testResults += Test-Endpoint "Home Page" "$baseUrl/"
$testResults += Test-Endpoint "Login Page" "$baseUrl/login"
$testResults += Test-Endpoint "Registro Page" "$baseUrl/registro"
$testResults += Test-Endpoint "Carrinho Page" "$baseUrl/carrinho"
$testResults += Test-Endpoint "Checkout Page" "$baseUrl/checkout"
Write-Host ""

Write-Host "2. TESTANDO CATEGORIAS" -ForegroundColor Yellow
Write-Host "=======================" -ForegroundColor Yellow
$testResults += Test-Endpoint "Categoria: Lanches" "$baseUrl/categoria/lanches"
$testResults += Test-Endpoint "Categoria: Pizzas" "$baseUrl/categoria/pizzas"
$testResults += Test-Endpoint "Categoria: Bebidas" "$baseUrl/categoria/bebidas"
$testResults += Test-Endpoint "Categoria: Sobremesas" "$baseUrl/categoria/sobremesas"
Write-Host ""

Write-Host "3. TESTANDO PRODUTOS" -ForegroundColor Yellow
Write-Host "=====================" -ForegroundColor Yellow
$testResults += Test-Endpoint "Produto: X-Bacon" "$baseUrl/produto/x-bacon"
$testResults += Test-Endpoint "Produto: Pizza Calabresa" "$baseUrl/produto/pizza-calabresa"
$testResults += Test-Endpoint "Produto: Coca-Cola" "$baseUrl/produto/coca-cola-2l"
$testResults += Test-Endpoint "Produto: Sorvete" "$baseUrl/produto/sorvete-2-bolas"
Write-Host ""

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "RESUMO DOS TESTES" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
$passedTests = ($testResults | Where-Object { $_ -eq $true }).Count
$totalTests = $testResults.Count
$percentage = [math]::Round(($passedTests / $totalTests) * 100, 2)

Write-Host "Testes Aprovados: $passedTests de $totalTests" -ForegroundColor $(if ($percentage -eq 100) { "Green" } elseif ($percentage -ge 80) { "Yellow" } else { "Red" })
Write-Host ""

if ($percentage -eq 100) {
    Write-Host "TODOS OS TESTES PASSARAM!" -ForegroundColor Green
} else {
    Write-Host "ALGUNS TESTES FALHARAM!" -ForegroundColor Yellow
}
Write-Host ""
