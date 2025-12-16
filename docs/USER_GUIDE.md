# MedicalStaffApp – User Guide

Questa guida spiega come utilizzare al meglio i filtri di ricerca per trovare rapidamente il personale medico e sanitario all’interno dell’applicazione.

---

## 🔎 Ricerca del personale

La barra di ricerca consente di filtrare i risultati in base a nome, data di nascita, ruolo e reparto.  
Di seguito sono riportati i formati consigliati per ottenere risultati accurati.

### ⚠️ Sensibilità

- La barra di ricerca è **case-insensitive**: non distingue tra maiuscole e minuscole.

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

### 🏥 Reparto

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

Mostrerà **TUTTO** lo staff medico del reparto `Cardiologia`.

---

### 🎂 Data di nascita

Per filtrare la **data di nascita**, utilizzare il formato `ISO 8601`.

- Data completa (`YYYY-MM-DD`):

```txt
1985-05-12
```

- Solo anno (`YYYY`):

```txt
1976
```
