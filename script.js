// Elementi forme i liste
const forma = document.getElementById('formaDestinacije');
const lista = document.getElementById('listaDestinacija');

// Učitavanje postojećih destinacija iz Local Storage-a
let destinacije = JSON.parse(localStorage.getItem('destinacije')) || [];

// Funkcija za prikaz svih destinacija
function prikaziDestinacije() {
  lista.innerHTML = "";

  if (destinacije.length === 0) {
    lista.innerHTML = `<p class="text-center text-muted">Još nema unesenih destinacija. Dodaj svoju prvu! 🌍</p>`;
    return;
  }

  destinacije.forEach((d, index) => {
    const card = document.createElement('div');
    card.className = 'col-md-4';
    card.innerHTML = `
      <div class="card h-100 shadow-sm">
        <div class="card-body d-flex flex-column justify-content-between">
          <div>
            <h5 class="card-title">${d.grad}, ${d.zemlja}</h5>
            <p class="card-text">${d.napomena || "Bez bilješki."}</p>
          </div>
          <button class="btn btn-danger mt-3 obrišiBtn">🗑️ Ukloni</button>
        </div>
      </div>
    `;
    card.querySelector('.obrišiBtn').addEventListener('click', () => obrisiDestinaciju(index));
    lista.appendChild(card);
  });
}

// Funkcija za dodavanje nove destinacije
forma.addEventListener('submit', function(e) {
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
