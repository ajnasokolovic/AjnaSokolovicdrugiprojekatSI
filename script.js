const forma = document.getElementById('formaDestinacije');
const lista = document.getElementById('listaDestinacija');
let destinacije = JSON.parse(localStorage.getItem('destinacije')) || [];

// Funkcija za prikaz svih destinacija
function prikaziDestinacije() {
  lista.innerHTML = "";

  if (destinacije.length === 0) {
    lista.innerHTML = `
      <div class="text-center text-secondary">
        <p>Još nema unesenih destinacija. Dodaj prvu destinaciju i započni svoje putovanje! 🌍</p>
      </div>`;
    return;
  }

  destinacije.forEach((d, index) => {
    const col = document.createElement('div');
    col.className = 'col-md-4';
    col.innerHTML = `
      <div class="card h-100 p-3">
        <div class="card-body d-flex flex-column justify-content-between">
          <div>
            <h5 class="card-title">${d.grad}, ${d.zemlja}</h5>
            <p class="card-text text-muted">${d.napomena || "Bez bilješki."}</p>
          </div>
          <button class="btn btn-danger mt-3 obrišiBtn">Ukloni</button>
        </div>
      </div>`;
    col.querySelector('.obrišiBtn').addEventListener('click', () => obrisiDestinaciju(index));
    lista.appendChild(col);
  });
}

// Dodavanje destinacije
forma.addEventListener('submit', e => {
  e.preventDefault();

  const zemlja = document.getElementById('zemlja').value.trim();
  const grad = document.getElementById('grad').value.trim();
  const napomena = document.getElementById('napomena').value.trim();

  if (!zemlja || !grad) {
    alert("Molimo unesite i zemlju i grad!");
    return;
  }

  destinacije.push({ zemlja, grad, napomena });
  localStorage.setItem('destinacije', JSON.stringify(destinacije));

  forma.reset();
  prikaziDestinacije();
});

// Brisanje destinacije
function obrisiDestinaciju(index) {
  destinacije.splice(index, 1);
  localStorage.setItem('destinacije', JSON.stringify(destinacije));
  prikaziDestinacije();
}

// Prikaz pri učitavanju
prikaziDestinacije();
