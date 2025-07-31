# Finance App

Keep an eye on your spending, budgets, recurring bills, and savings goals — all in one place.

This project is my solution to **Frontend Mentor's [Finance App Challenge](https://www.frontendmentor.io/challenges/personal-finance-app-JfjtZgyMt1)**.

## 🔗 Live Demo

[Try it here](https://finance-app-modern.netlify.app/)

## Features

- **Overview Dashboard:**

    - See your balance and financial health at a glance
    - Quick links to all sections
    - Visual summaries

- **Transactions:**

    - Review all transactions
    - Filter and sort by category or date
    - Search and paginate through the history

- **Recurring Bills:**

    - Track monthly bills with status indicators
    - See what's due, paid, or upcoming
    - Categorize and manage bills easily

- **Budgets:**

    - Set and monitor budgets by category
    - Visual progress bars

- **Savings Pots:**

    - Create savings goals ("pots")
    - Track progress visually

- **Responsive UI:**

    - Works great on mobile and desktop
    - Supports fun randomized color themes

## Screenshots

<img width="1920" height="1031" alt="finance-app-modern netlify app_overview" src="https://github.com/user-attachments/assets/4ea4a4a5-8e93-4d70-b88c-cfad31f982fc" />

## Tech Stack

- React + Vite + TS
- TanStack Router + Query
- Tailwind CSS + Shadcn/ui
- Supabase

## Installation

```sh
git clone https://github.com/nirajbagdi/finance-app.git

npm install

# Set up your Supabase environment variables
cp .env.example .env
# Add your Supabase project credentials to .env:
# VITE_SUPABASE_ANON_KEY=your_anon_key
# VITE_SUPABASE_PROJECT_ID=your_project_id
# VITE_SUPABASE_URL=your_project_url

npm start
```

Runs on http://localhost:5173

> **Note:** You'll need to create a Supabase project and add your project credentials to the `.env` file. You can find these in your Supabase project settings.
