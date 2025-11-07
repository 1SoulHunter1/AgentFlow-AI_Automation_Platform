# AgentFlow Setup Script (Plain Text, Safe)

param(
    [string]$ProjectPath = "$PSScriptRoot\AgentFlow",
    [switch]$InstallPnpm
)

Write-Host "== AgentFlow setup =="

if ($InstallPnpm) {
    Write-Host "Installing pnpm globally..."
    npm install -g pnpm
}

if (-not (Test-Path $ProjectPath)) {
    Write-Error "Project folder not found: $ProjectPath"
    exit 1
}

Set-Location $ProjectPath

# Ensure .env.local exists
$envFile = Join-Path $ProjectPath ".env.local"
if (-not (Test-Path $envFile)) {
    $envContent = @"
# === AgentFlow Environment ===

# LLM Providers
OPENAI_API_KEY=

# Tools
TAVILY_API_KEY=
FAL_KEY=

# Optional Integrations
COMPOSIO_API_KEY=
"@
    Set-Content -Path $envFile -Value $envContent -Encoding UTF8
    Write-Host "Created .env.local with placeholders."
}
else {
    Write-Host ".env.local already exists; not overwriting."
}

Write-Host "Installing dependencies with pnpm..."
pnpm install

Write-Host "Starting dev server on http://localhost:3000"
pnpm dev
