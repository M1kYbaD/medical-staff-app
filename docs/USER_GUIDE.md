# MedicalStaffApp – User Guide

## Consigli per la ricerca 🔎

### Dottore/i

Per trovare i medici:

- usare `dr.`
- usare `dott.ssa`

Esempi:

- `dr. rossi`
- `dott.ssa ferri`

---

### Reparto

Per il campo `Reparto`, usare preferibilmente il **codice univoco**:

| Codice | Reparto          |
| ------ | ---------------- |
| R01    | Segreteria       |
| R02    | Medicina Interna |
| R03    | Cardiologia      |
| R04    | Neurologia       |
| ...    | ...              |

Esempio:

```txt
R03
```

Il risultato mostrerà lo staff medico del reparto `Cardiologia`.

---

### Data di nascita

Per filtrare la **data di nascita**, usare il formato `ISO 8601`:

Esempio completo (`YYYY-MM-DD`):

```txt
1985-05-12
```

Esempio ridotto (solo `YYYY`):

```txt
1976
```
