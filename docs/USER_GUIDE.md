# MedicalStaffApp – User Guide

Questa guida spiega come utilizzare al meglio i filtri di ricerca per trovare rapidamente il personale medico e sanitario all’interno dell’applicazione.

---

## 🔎 Ricerca del personale

La barra di ricerca consente di filtrare i risultati in base a nome, reparto e data di nascita.  
Di seguito sono riportati i formati consigliati per ottenere risultati accurati.

---

## 👨‍⚕️ Medici (Dottori e Dottoresse)

Per cercare un medico, includere il titolo professionale nel campo di ricerca.

### Formati supportati

- `dr.`
- `dott.ssa`

### Esempi

```txt
dr. sala

dott.ssa ferri
```

---

### Reparto

Per il campo `Reparto`, è preferibile il **codice univoco**:

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

Il risultato mostrerà **tutto** lo staff medico del reparto `Cardiologia`.

---

### Data di nascita

Per filtrare la **data di nascita**, utilizzare il formato `ISO 8601`.

- Esempio completo (`YYYY-MM-DD`):

```txt
1985-05-12
```

- Solo anno (`YYYY`):

```txt
1976
```
