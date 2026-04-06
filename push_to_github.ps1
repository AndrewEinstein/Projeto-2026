# Script para inicializar, commitar e dar push para o remote GitHub
$proj = "c:\Users\Andrew - Faculdade\OneDrive - SENAI\5º Sementre\Quinta - QUALIDADE DE SOFTWARE\Sistema\sistema-react-minimo"
Set-Location -Path $proj

if (-not (git rev-parse --is-inside-work-tree 2>$null)) {
    git init
    Write-Host 'Repositório Git inicializado.'
} else {
    Write-Host 'Já é um repositório Git.'
}

git add .
try {
    git commit -m "Initial commit"
    Write-Host 'Commit criado.'
} catch {
    Write-Host 'Nenhuma alteração para commitar ou commit falhou.'
}

git branch -M main

if (git remote get-url origin 2>$null) {
    git remote set-url origin 'https://github.com/AndrewEinstein/Projeto-2026.git'
    Write-Host 'Remote origin atualizado.'
} else {
    git remote add origin 'https://github.com/AndrewEinstein/Projeto-2026.git'
    Write-Host 'Remote origin adicionado.'
}

git push -u origin main

Write-Host 'Execução finalizada.'