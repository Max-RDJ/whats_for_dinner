# Import / Export

## Overview

This document provides reference information for the Import and Export feature.

The Import/Export feature allows users to persist and restore generated meal plans by saving them locally and importing them back into the application.

---

## Data Portability Model

The application supports exporting a generated meal plan to a local file and importing previously exported files to restore plan data.

This enables basic persistence of generated meal plans outside the browser session.

---

## Export Plan

### Description

The export functionality generates a downloadable file containing the currently displayed meal plan.

### Output

- A file is generated and saved to the user’s local machine.
- The file contains the structured representation of the meal plan at the time of export.

### Behaviour

- A file selection dialog is used to select a JSON file for import.
- Imported data replaces the currently displayed meal plan.
- The application renders meals according to the imported structure.
- Imported files must match the expected format of exported plans.

---

## Import Plan

### Description

The import functionality loads a previously exported meal plan file and renders its contents in the application.

### Input

| Field | Description |
|---------|-------------|
| Meal Plan File | A previously exported meal plan file |

### Behaviour

- Imported data replaces the currently displayed meal plan.
- The application renders meals according to the imported structure.
- Imported files must match the expected format of exported plans.

---

## Data Structure

Exported meal plans are stored in JSON format, with keys representing days of the week and values containing meal details.

---

### Example Structure

```JSON
{
  "mon": {
    "name": "Chickpea Coconut Curry",
    "ingredients": "Chickpeas, coconut milk, passata, bell pepper"
  },
  "tue": {
    "name": "Sausages & Mash",
    "ingredients": "Sausage, potato, peas, butter, milk"
  },
  "wed": {
    "name": "Beans on Toast",
    "ingredients": "Baked beans, butter, bread"
  },
  "thu": {
    "name": "Spaghetti and Meatballs",
    "ingredients": "Spaghetti, bolognese sauce, meatballs"
  },
  "fri": {
    "name": "Thai Green Curry",
    "ingredients": "Thai green paste, chickpeas, coconut milk, tenderstem broccoli, rice"
  },
  "sat": {
    "name": "Stir Fry",
    "ingredients": "Fake chicken, bell pepper, noodles, teryaki sauce"
  },
  "sun": {
    "name": "Tacos",
    "ingredients": "Beef mince, salsa, taco shells, lettuce, cheese"
  }
}
```

---

## Constraints

- Imported files must be valid JSON matching the expected schema.
- Malformed or incorrectly structured files are not supported.
- Imported plans replace the current in-memory plan state.

---

## Related Features

- Meal Planning
- Plan Generation