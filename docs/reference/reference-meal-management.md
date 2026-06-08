# Meal Management

## Overview

This document provides reference information for the Meal Management feature.

Meal Management is responsible for storing and maintaining a collection of meals and their ingredients. This data is used as the source for meal plan generation.

This page describes the structure, behaviour and constraints of the feature.

---

## Location

Meal Manager (`/meal_manager`)

---

## Meal Collection

The meal collection contains all meals available for use in meal plan generation.

### Behaviour

- Meals can be added to the collection.
- The name and ingredients of existing meals can be edited.
- Meals can be removed from the collection.
- Changes to the collection are reflected in future meal plans.
- The list of meals is displayed on the Meal Manager page.

---

## Operations

## Add Meal

Creates a new meal entry in the meal collection.

### Required Fields

| Field | Description |
|---------|-------------|
| Meal name | The name of the meal |
| Ingredients | Ingredients associated with the meal |

### Result

The meal is added to the collection, displayed on the Meal Manager page, and becomes available for meal plan generation.

## Edit Meal

Updates an existing meal in the collection.

### Behaviour

- Select the meal name, ingredients or edit icon to edit a meal.
- Existing values are displayed in the edit form.
- Changes are saved when the update is confirmed.
- Updated meals remain available for future meal plans.

## Delete Meal

Removes a meal from the collection.

### Behaviour

- Deleted meals are removed from the collection.
- Deleted meals are no longer displayed on the Meal Manager page.
- Deleted meals cannot be selected for future meal plan generation.

---

## Constraints

- At least one meal must exist in the collection before a meal plan can be generated.
- Deleted meals are permanently removed from the collection.
- Clearing the browser cache will reset the meal collection to the default state.

---

## Relationship to Other Features

- Plan Generation uses the meal collection as its data source.