// Carregar saldo do usuário
fetch('http://localhost:3000/api/saldo/1')
    .then(response => response.json())
    .then(data => {
        document.querySelector('#saldo').innerText = `Saldo: R$ ${data.saldo}`;
    })
    .catch(error => console.error('Erro ao carregar saldo:', error));

// Realizar investimento
document.querySelector('#btn-investir').addEventListener('click', () => {
    fetch('http://localhost:3000/api/investir', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: 1, valor: 50 })
    })
        .then(response => response.json())
        .then(data => {
            if (data.saldo !== undefined) {
                alert(data.mensagem);
                document.querySelector('#saldo').innerText = `Saldo: R$ ${data.saldo}`;
            } else {
                alert(data.error);
            }
        })
        .catch(error => console.error('Erro ao investir:', error));
});
