import { Component, ChangeDetectionStrategy, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MedicalStaff } from './staff.types';

@Component({
  selector: 'app-staff',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, ReactiveFormsModule],
  host: { class: 'staff-page' },
  template: `
    <section class="staff-section-page" aria-labelledby="staff-title">
      <h2 id="staff-title" class="sr-only">Personale medico</h2>

      <!-- Search -->
      <div class="search-wrapper">
        <label for="staff-search" class="search-label">Tabella personale medico</label>
        <input
          id="staff-search"
          type="text"
          class="search-input"
          [formControl]="searchControl"
          placeholder="Cerca per 'nome', 'ruolo' o 'reparto'"
          aria-describedby="search-help"
        />
        <p id="search-help" class="sr-only">Inserisci il nome, il ruolo o il reparto da cercare.</p>

        <!-- Results message - nascosto di default -->
        @if (showResultsMessage()) {
        <p class="results-message">
          {{ resultsMessage() }}
        </p>
        }
      </div>

      <!-- Table -->
      @if (paginatedStaff().length > 0) {
      <table class="staff-table" aria-label="Tabella personale medico">
        <thead>
          <tr>
            <th scope="col">Id</th>
            <th scope="col">Nome</th>
            <th scope="col">Ruolo</th>
            <th scope="col">Reparto</th>
          </tr>
        </thead>
        <tbody>
          @for (person of paginatedStaff(); track person.id) {
          <tr>
            <td class="centered">{{ person.id }}</td>
            <td>{{ person.name }}</td>
            <td>{{ person.role }}</td>
            <td>{{ person.department }}</td>
          </tr>
          }
        </tbody>
      </table>

      <!-- Pagination -->
      <nav class="pagination" aria-label="Navigazione pagine personale medico">
        <!-- BOTTONE PAGINA PRECEDENTE -->
        <button
          type="button"
          class="pg-btn arrow-btn"
          [disabled]="currentPage() === 1"
          aria-label="Previous page"
          (click)="prevPage()"
        >
          &#8701;
        </button>

        <!-- NUMERI DELLE PAGINE -->
        @for (page of pages(); track page) {
        <button
          type="button"
          class="pg-btn"
          [class.active]="currentPage() === page"
          (click)="goToPage(page)"
        >
          {{ page }}
        </button>
        }

        <!-- BOTTONE PAGINA SUCCESSIVA -->
        <button
          type="button"
          class="pg-btn arrow-btn"
          [disabled]="currentPage() === totalPages()"
          aria-label="Next page"
          (click)="nextPage()"
        >
          &#8702;
        </button>
      </nav>
      }
    </section>
  `,
  styles: [
    `
      .staff-section-page {
        padding: 1rem;
      }

      .search-wrapper {
        margin-block-end: 1rem;
        display: flex;
        flex-direction: column;
        max-width: 320px;
      }

      .search-label {
        font-weight: 700;
        margin-block-end: 0.25rem;
      }

      .search-input {
        padding: 0.5rem 0.75rem;
        margin-block-end: 0.5rem;
        font-size: 1rem;
        border: 1px solid #808080;
        border-radius: 4px;
      }

      .staff-table {
        width: 100%;
        border-collapse: collapse;
      }

      .staff-table th {
        background: #bfbfbf;
        padding: 0.75rem;
        border: 1px solid #404040;
        text-align: center;
        text-decoration: underline 2px;
      }

      .staff-table td {
        padding: 0.75rem;
        border: 1px solid #808080;
        text-align: left;
      }

      .centered {
        text-align: center !important;
      }

      .pagination {
        margin-top: 1rem;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 0.75rem;
      }

      .pg-btn {
        padding: 0.4rem 0.75rem;
        font-size: 1rem;
        border: 1px solid #808080;
        background: #f5f5f5;
        border-radius: 16px;
        cursor: pointer;
      }

      .pg-btn:hover {
        background: #e6e6e6;
      }

      .pg-btn.active {
        background: #0000ff;
        color: #ffffff;
        border-color: #0000ff;
        font-weight: 600;
      }

      .pg-btn:disabled {
        opacity: 0.5;
        cursor: not-allowed;
      }

      .pg-info {
        font-weight: 600;
      }

      .empty-message {
        margin-top: 1rem;
        font-style: italic;
      }

      .sr-only {
        position: absolute;
        width: 1px;
        height: 1px;
        padding: 0;
        margin: -1px;
        overflow: hidden;
        clip: rect(0, 0, 0, 0);
        border: 0;
      }

      .results-message {
        color: #404040;
        font-weight: 400;
        margin: 0;
      }

      .arrow-btn {
        width: 2.2rem;
        text-align: center;
        font-size: 1.2rem;
        padding: 0.3rem;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
      }

      .arrow-btn:hover {
        background: #e6e6e6;
      }
    `,
  ],
})
export class StaffComponent {
  // -----------------------------------------------------
  // Local state
  // -----------------------------------------------------

  private readonly staff = signal<readonly MedicalStaff[]>([
    {
      id: 1,
      name: 'Martina Ricci',
      date_of_birth: '1985-05-12',
      role: 'Infermiera',
      department: 'Cardiologia (R03)',
    },
    {
      id: 2,
      name: 'Dr. Simone Ferrari',
      date_of_birth: '',
      role: 'Neurologo',
      department: 'Neurologia (R04)',
    },
    {
      id: 3,
      name: 'Chiara Morfello',
      date_of_birth: '',
      role: 'Tecnico ECG',
      department: 'Cardiologia (R03)',
    },
    {
      id: 4,
      name: 'Dr. Marco Colombo',
      date_of_birth: '',
      role: 'Medico Specialista',
      department: 'Medicina Interna (R02)',
    },
    {
      id: 5,
      name: 'Dott.ssa Giulia Ferri',
      date_of_birth: '',
      role: 'Oncologa',
      department: 'Oncologia (R05)',
    },
    {
      id: 6,
      name: 'Francesca Neri',
      date_of_birth: '',
      role: 'Infermiera Pediatrica',
      department: 'Pediatria (R07)',
    },
    {
      id: 7,
      name: 'Elena Verdone',
      date_of_birth: '',
      role: 'Infermiera',
      department: 'Neurologia (R04)',
    },
    {
      id: 8,
      name: 'Dr. Mario Fortenanni',
      date_of_birth: '',
      role: 'Ortopedico',
      department: 'Ortopedia (R06)',
    },
    {
      id: 9,
      name: 'Alessandro Galli',
      date_of_birth: '',
      role: 'Infermiere',
      department: 'Oncologia (R05)',
    },
    {
      id: 10,
      name: 'Dr. Paolo Marchetti',
      date_of_birth: '',
      role: 'Medico Cardiologo',
      department: 'Cardiologia (R03)',
    },
    {
      id: 11,
      name: 'Dr. Davide Fontana',
      date_of_birth: '',
      role: 'Assistente Ortopedico',
      department: 'Ortopedia (R06)',
    },
    {
      id: 12,
      name: 'Dott.ssa Chiara Romano',
      date_of_birth: '',
      role: 'Medico Assistente',
      department: 'Medicina Interna (R02)',
    },
    { id: 13, name: 'Luca Gatti', date_of_birth: '', role: 'OSS', department: 'Pediatria (R07)' },
    {
      id: 14,
      name: 'Roberto Corsi',
      date_of_birth: '',
      role: 'Tecnico Neurofisiopatologia',
      department: 'Neurologia (R04)',
    },
    {
      id: 15,
      name: 'Sara Vitali',
      date_of_birth: '',
      role: 'Psico-oncologa',
      department: 'Oncologia (R05)',
    },
    {
      id: 16,
      name: 'Dott.ssa Federica Moretti',
      date_of_birth: '',
      role: 'Medico Assistente',
      department: 'Cardiologia (R03)',
    },
    {
      id: 17,
      name: 'Dr. Davide Sala',
      date_of_birth: '',
      role: 'Chirurgo Ortopedico',
      department: 'Ortopedia (R06)',
    },
    {
      id: 18,
      name: 'Valerio Romano',
      date_of_birth: '',
      role: 'Infermiere',
      department: 'Medicina Interna (R02)',
    },
    {
      id: 19,
      name: 'Dr. Francesco Conti',
      date_of_birth: '',
      role: 'Emodinamista',
      department: 'Cardiologia (R03)',
    },
    {
      id: 20,
      name: 'Dott.ssa Giorgia Bandecchi',
      date_of_birth: '',
      role: 'Medico Assistente',
      department: 'Neurologia (R04)',
    },
    {
      id: 21,
      name: 'Chiara Gori',
      date_of_birth: '',
      role: 'Fisioterapista Pediatrica',
      department: 'Pediatria (R07)',
    },
    {
      id: 22,
      name: 'Dott.ssa Laura Fontana',
      date_of_birth: '',
      role: 'Gastroenterologa',
      department: 'Gastroenterologia (R08)',
    },
    {
      id: 23,
      name: 'Angela Riva',
      date_of_birth: '',
      role: 'Coordinatrice Infermieristica',
      department: 'Medicina Interna (R02)',
    },
    {
      id: 24,
      name: 'Marco Ricci',
      date_of_birth: '',
      role: 'OSS',
      department: 'Cardiologia (R03)',
    },
    {
      id: 25,
      name: 'Dott.ssa Simona Vitale',
      date_of_birth: '',
      role: 'Medico Assistente',
      department: 'Gastroenterologia (R08)',
    },
    {
      id: 26,
      name: 'Matteo Conti',
      date_of_birth: '',
      role: 'Medico Assistente',
      department: 'Pediatria (R07)',
    },
    {
      id: 27,
      name: 'Martina De Barbari',
      date_of_birth: '',
      role: 'OSS',
      department: 'Neurologia (R04)',
    },
    {
      id: 28,
      name: 'Paolo De Angelo',
      date_of_birth: '',
      role: 'Medico Assistente',
      department: 'Oncologia (R05)',
    },
    {
      id: 29,
      name: 'Giorgio Marchegiani',
      date_of_birth: '',
      role: 'Fisioterapista',
      department: 'Ortopedia (R06)',
    },
    {
      id: 30,
      name: 'Elena Russo',
      date_of_birth: '',
      role: 'Infermiera',
      department: 'Gastroenterologia (R08)',
    },
    {
      id: 31,
      name: 'Sara Greco',
      date_of_birth: '',
      role: 'OSS',
      department: 'Medicina Interna (R02)',
    },
    {
      id: 32,
      name: 'Giovanni Verdi',
      date_of_birth: '',
      role: 'Pediatra',
      department: 'Pediatria (R07)',
    },
    {
      id: 33,
      name: 'Filippo Piras',
      date_of_birth: '',
      role: 'Tecnico di Dermatologia',
      department: 'Dermatologia (R09)',
    },
    {
      id: 34,
      name: 'Francesca De Santis',
      date_of_birth: '',
      role: 'Infermiera',
      department: 'Ortopedia (R06)',
    },
    { id: 35, name: 'Carlos Sainz', date_of_birth: '', role: 'OSS', department: 'Oncologia (R05)' },
    {
      id: 36,
      name: 'Claudio Greco',
      date_of_birth: '',
      role: 'Fisioterapista',
      department: 'Neurologia (R04)',
    },
    {
      id: 37,
      name: 'Luca Rossi',
      date_of_birth: '',
      role: 'Segretario',
      department: 'Segreteria (R01)',
    },
    {
      id: 38,
      name: 'Valentina Serra',
      date_of_birth: '',
      role: 'Fisioterapista',
      department: 'Cardiologia (R03)',
    },
    {
      id: 39,
      name: 'Dr. Enrico Lombardi',
      date_of_birth: '',
      role: 'Epatologo',
      department: 'Gastroenterologia (R08)',
    },
    {
      id: 40,
      name: 'Davide Ricci',
      date_of_birth: '',
      role: 'Infermiere',
      department: 'Dermatologia (R09)',
    },
    {
      id: 41,
      name: 'Elisa Ferrato',
      date_of_birth: '',
      role: 'OSS',
      department: 'Dermatologia (R09)',
    },
    {
      id: 42,
      name: 'Giorgia Bianchi',
      date_of_birth: '',
      role: 'Dermatologa',
      department: 'Dermatologia (R09)',
    },
    {
      id: 43,
      name: 'Alessia Rinaldi',
      date_of_birth: '',
      role: 'Educatrice',
      department: 'Pediatria (R07)',
    },
    {
      id: 44,
      name: 'Matteo Rizzo',
      date_of_birth: '',
      role: 'Infermiere Strumentista',
      department: 'Chirurgia Generale (R10)',
    },

    {
      id: 45,
      name: 'Maria Grazia Morelli',
      date_of_birth: '',
      role: 'Fisioterapista',
      department: 'Medicina Interna (R02)',
    },
    { id: 46, name: 'Sara Martini', date_of_birth: '', role: 'OSS', department: 'Ortopedia (R06)' },
    {
      id: 47,
      name: 'Simone Vinci',
      date_of_birth: '',
      role: 'Tecnico di Laboratorio',
      department: 'Oncologia (R05)',
    },
    {
      id: 48,
      name: 'Maria Bianchi',
      date_of_birth: '',
      role: 'Accettazione',
      department: 'Segreteria (R01)',
    },
    {
      id: 49,
      name: 'Lorenzo Ferraro',
      date_of_birth: '',
      role: 'Amministrativo di Reparto',
      department: 'Cardiologia (R03)',
    },
    {
      id: 50,
      name: 'Francesca Nortano',
      date_of_birth: '',
      role: 'Segreteria di Reparto',
      department: 'Dermatologia (R09)',
    },
    {
      id: 51,
      name: 'Alessandro Pollini',
      date_of_birth: '',
      role: 'Infermiere Strumentista',
      department: 'Chirurgia Generale (R10)',
    },
    {
      id: 52,
      name: 'Giovanna Carborelli',
      date_of_birth: '',
      role: 'Segretaria',
      department: 'Segreteria (R01)',
    },
    {
      id: 53,
      name: 'Andrea Kimi Antonelli',
      date_of_birth: '',
      role: 'Tecnico EEG',
      department: 'Neurologia (R04)',
    },
    {
      id: 54,
      name: 'Dott.ssa Francesca Santoni',
      date_of_birth: '',
      role: 'Dietista',
      department: 'Gastroenterologia (R08)',
    },
    {
      id: 55,
      name: 'Giulia Scarfoni',
      date_of_birth: '',
      role: 'Fisioterapista',
      department: 'Oncologia (R05)',
    },
    {
      id: 56,
      name: 'Kassandra Terzoni',
      date_of_birth: '',
      role: 'Tecnico Laser',
      department: 'Dermatologia (R09)',
    },
    {
      id: 57,
      name: 'Riccardo Lartello',
      date_of_birth: '',
      role: 'Tecnico di Sala',
      department: 'Ortopedia (R06)',
    },
    {
      id: 58,
      name: 'Marianna Vulzo',
      date_of_birth: '',
      role: 'Tecnico di Laboratorio',
      department: 'Medicina Interna (R02)',
    },
    {
      id: 59,
      name: 'Giancarlo Agnelli',
      date_of_birth: '',
      role: 'Tecnico Endoscopia',
      department: 'Gastroenterologia (R08)',
    },
    {
      id: 60,
      name: 'Vanessa Daino',
      date_of_birth: '',
      role: 'Segreteria Reparto',
      department: 'Neurologia (R04)',
    },
    {
      id: 61,
      name: 'Dr. George William Russell',
      date_of_birth: '',
      role: 'Chirurgo Generale',
      department: 'Chirurgia Generale (R10)',
    },
    {
      id: 62,
      name: 'Dott.ssa Marta Farina',
      date_of_birth: '',
      role: 'Chirurgo Assistente',
      department: 'Chirurgia Generale (R10)',
    },
    {
      id: 63,
      name: 'Simona Parziali',
      date_of_birth: '',
      role: 'Accettazione',
      department: 'Segreteria (R01)',
    },
    {
      id: 64,
      name: 'Carlotta Vallechiesa',
      date_of_birth: '',
      role: 'Segreteria di Reparto',
      department: 'Pediatria (R07)',
    },
    {
      id: 65,
      name: 'Dario Cusino',
      date_of_birth: '',
      role: 'OSS',
      department: 'Chirurgia Generale (R10)',
    },
    {
      id: 66,
      name: 'Dr. Leonardo Passarino',
      date_of_birth: '',
      role: 'Assistente Neurologo',
      department: 'Neurologia (R04)',
    },

    {
      id: 67,
      name: 'Giovanna Russo',
      date_of_birth: '',
      role: 'Fisioterapista',
      department: 'Chirurgia Generale (R10)',
    },
    {
      id: 68,
      name: 'Tommaso Malatesta',
      date_of_birth: '',
      role: 'OSS',
      department: 'Gastroenterologia (R08)',
    },
    {
      id: 69,
      name: 'Delfina Esposito',
      date_of_birth: '',
      role: 'Medico Assistente',
      department: 'Dermatologia (R09)',
    },
    {
      id: 70,
      name: 'Dott.ssa Emma Costa',
      date_of_birth: '',
      role: 'Medico Anestesista',
      department: 'Chirurgia Generale (R10)',
    },
    {
      id: 71,
      name: 'Liviano Lori',
      date_of_birth: '',
      role: 'Segreteria di Reparto',
      department: 'Gastroenterologia (R08)',
    },
    {
      id: 72,
      name: 'Tiziana Marchesi',
      date_of_birth: '',
      role: 'Amministrativa di Reparto',
      department: 'Medicina Interna (R02)',
    },
    {
      id: 73,
      name: 'Corrado Baresi',
      date_of_birth: '',
      role: 'Amministrativo di Reparto',
      department: 'Oncologia (R05)',
    },
    {
      id: 74,
      name: 'Ferdinanda Fanucci',
      date_of_birth: '',
      role: 'Tecnico di Laboratorio',
      department: 'Pediatria (R07)',
    },
    {
      id: 75,
      name: 'Maurizio Conti',
      date_of_birth: '',
      role: 'Segreteria di Reparto',
      department: 'Chirurgia Generale (R10)',
    },
    {
      id: 76,
      name: 'Abelina Mancini',
      date_of_birth: '',
      role: 'Tecnico Laser',
      department: 'Chirurgia Generale (R10)',
    },
    {
      id: 77,
      name: 'Fedele Pugliesi',
      date_of_birth: '',
      role: 'OSS',
      department: 'Cardiologia (R03)',
    },

    {
      id: 78,
      name: 'Priscilla Mancini',
      date_of_birth: '',
      role: 'Fisioterapista',
      department: 'Dermatologia (R09)',
    },
    {
      id: 79,
      name: 'Eleonora Palermo',
      date_of_birth: '',
      role: 'Educatrice',
      department: 'Pediatria (R07)',
    },

    {
      id: 80,
      name: 'Azelio Beneventi',
      date_of_birth: '',
      role: 'Amministrativo di Reparto',
      department: 'Ortopedia (R06)',
    },
  ]);

  readonly searchControl = new FormControl('', { nonNullable: true });
  readonly searchSignal = signal('');

  constructor() {
    this.searchControl.valueChanges.subscribe((value) => {
      this.searchSignal.set(value ?? '');
      this.currentPage.set(1); // reset pagina alla ricerca
    });
  }

  // -----------------------------------------------------
  // Pagination state
  // -----------------------------------------------------
  readonly pageSize = 10;
  readonly currentPage = signal(1);

  readonly filteredStaff = computed(() => {
    const term = this.searchSignal().trim().toLowerCase();
    if (!term) return this.staff();

    return this.staff().filter((p) =>
      [p.name, p.role, p.department].some((field) => field.toLowerCase().includes(term))
    );
  });

  readonly totalPages = computed(() =>
    Math.max(1, Math.ceil(this.filteredStaff().length / this.pageSize))
  );

  readonly pages = computed(() => Array.from({ length: this.totalPages() }, (_, i) => i + 1));

  readonly paginatedStaff = computed(() => {
    const page = this.currentPage();
    const start = (page - 1) * this.pageSize;
    return this.filteredStaff().slice(start, start + this.pageSize);
  });

  readonly showResultsMessage = computed(() => {
    const term = this.searchSignal().trim();
    const count = this.filteredStaff().length;

    // Mostra solo quando c'è testo nella ricerca
    // OPPURE quando non ci sono risultati (anche se term è vuoto)
    return term.length > 0 || count === 0;
  });

  // Messaggi per riscontri risultati di ricerca
  readonly resultsMessage = computed(() => {
    const count = this.filteredStaff().length;
    if (count === 0) return 'Nessun elemento trovato.';
    if (count === 1) return '1 elemento trovato.';
    return `${count} elementi trovati.`;
  });

  // -----------------------------------------------------
  // Pagination actions
  // -----------------------------------------------------
  nextPage() {
    if (this.currentPage() < this.totalPages()) {
      this.currentPage.update((p) => p + 1);
    }
  }

  prevPage() {
    if (this.currentPage() > 1) {
      this.currentPage.update((p) => p - 1);
    }
  }

  goToPage(page: number) {
    this.currentPage.set(page);
  }
}
