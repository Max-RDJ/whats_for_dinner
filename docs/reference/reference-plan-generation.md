# Plan Generation

## Overview

The meal plan generation feature generates a meal plan that is displayed on the home page and consists of a selection of meals chosen at random from the user's saved meal collection.

The feature is designed to reduce decision fatigue by presenting meal suggestions without requiring manual selection.

---

## Location

Home page (`/`)

---

## Inputs

The feature uses meal entries stored in the application's meal collection.

### Requirements

- At least one meal must exist in the meal collection.
- Each meal must have a name.
- Meals must have been saved successfully before they can be selected.

---

## Behaviour

When the 'Generate new meal plan' button is clicked, the application:

1. Retrieves meal collection.
2. Randomly selects meals from the available collection.
3. Displays the selected meals on the home page.

The selection process is performed automatically and does not require user interaction.

---

## Output

The home page displays a week plan consisting of days of the week that each have a randomly selected meal entry.

Each displayed day includes:

- Abbreviated day name
- Meal name
- Ingredients (if available)

---

## Data Source

The feature retrieves data from the application's stored meal collection.

Changes made to the meal collection are saved in local browser storage and are reflected in future meal plan generations.

---

## Limitations

- Generated results depend entirely on the meals available in the collection; the application only starts with a small selection of meal entries by default.
- A small meal collection may result in repeated suggestions.
- The feature does not currently take dietary preferences or meal categories into account.
- Clearing the browser cache will result in the custom meal list reverting to the default list.

---

## Related Features

- Meal Management
- Import and Export