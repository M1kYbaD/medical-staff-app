<h1 align="center">MedicalStaffApp – User Guide</h1>

<p align="center">
<em>The purpose of this guide is to explain how to use search filters to quickly find medical and healthcare personnel within the application.</em>
</p>

---

## Personnel research

The search bar allows you to filter results by `name`, `date_of_birth`, `role`, or `department`.

Below are the recommended formats to get accurate results.

### ⚠️ Case sensitivity

- The search bar is **Case-Insensitive**, so ignore the case difference.

## Doctors and Female Doctors

To search for a **doctor**, include the `professional title` in the search field.

### Supported formats:

- `Dr.` or `dr.`
- `Dott.ssa` or `dott.ssa`

Examples:

```txt
Dr. Simone Ferrari

Dott.ssa Giulia Ferri
```

## Department

For the `Department` field, the **unique code** is preferable.

| Code | Department        |
| ---- | ----------------- |
| R01  | Secretary         |
| R02  | Internal Medicine |
| R03  | Cardiology        |
| R04  | Neurology         |
| ...  | ...               |

Example:

```txt
R03
```

This will show **ALL** the medical staff of the **`Cardiology`** department.

## Date of birth

To filter the **date of birth**, use the `ISO 8601` format.

- Full date (`YYYY-MM-DD`):

```txt
1985-05-12
```

- Year only (`YYYY`):

```txt
1976
```
