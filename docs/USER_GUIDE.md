<h1 align="center">MedicalStaffApp – User Guide</h1>

<p align="center">
<em>The purpose of this guide is to explain how to use search filters to quickly find medical and healthcare personnel within the application.</em>
</p>

---

## Personnel research

The search bar allows you to filter results by `name`, `date_of_birth`, `role`, or `department`.

Below are the recommended formats to get accurate results.

> [!NOTE]
> ⚠️ The search bar is **Case-Insensitive**, so ignore the case difference.

## Doctors and Female Doctors

To search for a **doctor**, include the `professional title` in the search field.

### Supported formats

- **ALL** doctors:

```txt
Dr.

Dott.ssa
```

- For a **specific** doctor:

```txt
Dr. Simone Ferrari

Dott.ssa Giulia Ferri
```

> [!IMPORTANT]
> You **MUST** include the `professional title`, `first name`, and `last name` **together**.

## Department

For the `Department` field, the **unique code** is preferable.

| Code | Department         |
| ---- | ------------------ |
| R01  | Segreteria         |
| R02  | Medicina Interna   |
| R03  | Cardiologia        |
| ...  | ...                |
| R10  | Chirurgia Generale |

Example:

```txt
R03
```

> [!TIP]
> This will show **ALL** the medical staff of the `Cardiologia` department.

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
