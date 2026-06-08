# Design Decisions

## Overview

This document explains the reasoning behind the design and implementation choices made in the *What's For Dinner?* application.

The goal of the application is to reduce decision fatigue by simplifying the process of weekly meal planning.

---

## Purpose of the Application

The application was designed to help users quickly generate a weekly meal plan based on a personalised list of meals.

The focus is on reducing cognitive load rather than providing a fully featured nutrition or recipe management system.

---

## Meal Plan Generation Approach

Meal plans are generated using a random selection process from the user's saved meal list.

This approach was chosen because:

- It keeps the system simple and easy to understand
- It avoids complex selection and planning logic
- It encourages variety in meal selection
- The purpose of the application is reduce decision-making in the meal planning process

---

## Data Storage Strategy

The application uses browser-based local storage to persist user data.

This decision was made to:

- Avoid the need for a backend service
- Simplify deployment and development
- Ensure user data remains local to the device

Trade-offs include:

- No cross-device synchronisation
- Data may be lost if browser storage is cleared
- No built-in backup mechanism

---

## Authentication and User Accounts

The application does not include user accounts or authentication.

This decision reduces complexity and allows users to access functionality immediately without onboarding.

However, it limits the ability to persist data across devices or after clearing the browser cache.

The import/export feature is intended as a lightweight alternative to maintaining a user authentication system.

---

## User Interface Approach

The interface prioritises simplicity and clarity.

Meal items are displayed in a structured format to make scanning and selection easy.

This approach was chosen over more complex layouts to reduce cognitive load and improve usability.

---

## Trade-offs

Several trade-offs were made to prioritise simplicity:

- Functionality over extensibility
- Simplicity over scalability
- Local storage over cloud infrastructure
- Minimal UI and performance over feature-rich interfaces

---

## Future Improvements

If the application were extended, potential improvements could include:

- Cloud-based data storage
- User accounts and authentication
- Meal categorisation and filtering
- Dietary preference support
- Shopping list generation
- Item price fetching and shopping list cost
- Partnerships with supermarket chains
    - API integration for fetching data such as prices
    - Automatically add items on generated shopping list to online basket