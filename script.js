const table = document.querySelector('#myTable');
const rows = Array.from(table.querySelectorAll('tbody tr'));
const data = rows.map(row => {
  const cells = row.querySelectorAll('td');
  return {
    codigo: cells[0].textContent.trim(),
    descricao: cells[1].textContent.trim(),
    aplicacao: cells[2].textContent.trim(),
    preco: cells[3].textContent.trim()
  };
});

const input = document.querySelector('#search-input');
const button = document.querySelector('#search-btn');
const tbody = table.querySelector('tbody');

button.addEventListener('click', () => {
  const term = input.value.trim().toLowerCase();
  const filteredData = data.filter(item => {
    return item.codigo.toLowerCase().includes(term) ||
           item.descricao.toLowerCase().includes(term) ||
           item.aplicacao.toLowerCase().includes(term);
  });
  render(filteredData);
});

function render(data) {
  const html = data.map(item => {
    return `
      <tr>
        <td>${item.codigo}</td>
        <td>${item.descricao}</td>
        <td>${item.aplicacao}</td>
        <td>${item.preco}</td>
      </tr>
    `;
  }).join('');
  tbody.innerHTML = html;
}

