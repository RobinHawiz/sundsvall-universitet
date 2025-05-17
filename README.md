# Sundsvall universitet 🏫

> **Disclaimer**  
> This website is a **fictional project created for educational purposes** as part of a university assignment.  
> It is **not affiliated with or representative of any real university**, government-run or otherwise — including but not limited to any institution named "Sundsvall universitet."  
> All content, branding, and data used herein are entirely simulated.

A fictional university web app that displays available courses and allows users to create and manage their own course list.

---

### ✅ Basic Requirements

- Built with [Angular](https://angular.dev/) v19.2.8 and TypeScript.
- Contains at least two pages:
  - One for searching/filtering course data.
  - One for displaying the user's course list (ramschema).
- Implements components and routing.
- Includes two services:
  - One for retrieving course data.
  - One for managing the user-created course list.
- Prevents duplicate courses from being added to the list.
- The course list updates in real-time (no page reload) and persists via `localStorage`.
- Responsive design using Angular Material — works well across screen sizes.
- Source code is version-controlled with Git.
- Deployed via Firebase 👉 [https://sundsvall-universitet.web.app](https://sundsvall-universitet.web.app)

---

### 📚 Course Page Features

- Displays course data clearly and accessibly.
- Supports sorting by course code, name, points, and subject.
- Allows filtering by course code or name.
- Subject-based filtering — e.g., show only "Datateknik" courses.
- Users can add courses to their custom course list.
- Displays number of matching courses based on current filter.

---

### 🗂 Ramschema Page Features

- Displays selected courses (stored in `localStorage`).
- Shows total number of credits (högskolepoäng).
- Allows removal of courses from the list.

---

### 🚀 Additional Features

- Dark/light theme support based on system preferences.
- Lazy-loaded routes for faster initial load.
- Pagination on course list for better usability and performance.
- Homepage with:
  - Hero image
  - Call-to-action (CTA) to navigate to course list
  - Statistics about number of courses, subjects, and university founding year
- Custom course list interface:
  - Displays data in a table on desktop, and in a card-based layout on mobile for improved usability.
  - Implemented custom sorting and filtering logic to work with the card layout, since Angular Material’s built-in table utilities (e.g., `@angular/material/sort`) only work with `mat-table`.
