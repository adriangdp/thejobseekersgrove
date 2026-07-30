# The Jobseeker's Grove

[![Netlify Status](https://api.netlify.com/api/v1/badges/8b9d2488-44c5-4f73-98b8-b9114afa4776/deploy-status)](https://app.netlify.com/projects/thejobseekersgrove/deploys)

[Live Demo](https://thejobseekersgrove.netlify.app)

*A whimsical walk through the jobposting grove. In the grove of job postings, there might be great opportunities or, at least, funny little critters.*

![/mockup.webp](/public/mockup.webp)

## Table of contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project structure](#project-structure)
- [Getting Started](#getting-started)
    - [Prerequisites](#prerequisites)
    - [Install](#install)
    - [Scripts](#scripts)
        - [Dev](#dev)
        - [Production build](#production-build)
        - [Preview](#preview)
- [Known limitations and TODOs](#known-limitations-and-todos)

## Features

The Jobseeker's Grove is a lightweight application to keep track of Job applications with a humorous touch (so you can keep the spirits up!). 

- **Job Application Tracking:** Uses supabase to store job applications, so you can access to your tracked offers on any platform.<s>Uses local IndexedDB and DexieDB for reactivity and ease of use with Svelte</s>.
- **Sorting and filtering tools:** Job applications can be filtered and sorted by status, salary, application date.
- **A more compact approach:** The information can be displayed as easily readable cards or as a compact table.
- **Keep it up to date:** Job applications can be updated when needed, and even deleted.
- **Track anywhere:** Responsive design works on mobile, tablet, and desktop.

## Tech Stack

- **Svelte 5** - Light reactive framework using runes and modern syntax.
- **TypeScript** - Type safety.
- **TailwindCSS** - Fast, utility oriented styling.
- **Supabase** - SQL based BAAS, with automatically generated APIs and RLS secured, so only you can access to your data.
- **Zod** - Runtime schema validation used in forms.
- <s>**DexieDB** - IndexedDB wrapper facilitating CRUD operations and reactivity.</s>

## Project structure

```
src/
├─ lib/                          # UI components
│   └─ common/                   # Reusable UI components
├─ data/
│   ├─  enums.ts                 # Enum for safely handling states with specific values.
│   ├─  jobStates.ts             # Dictionary for flavour text and styles based on enum state.
│   ├─  types.ts                 # Typescript types and Zod inferred types
│   └─  validation-schemas.ts    # Zod validation schema
│
├─ service/
│   ├─ auth.svelte.ts            # Supabase auth functions and events.
│   ├─ data-functions.svelte.ts  # Supabase CRUD functions.
│   └─ supabase-client.svelte.ts # Supabase client.
|
├─ store/
│   ├─ data-store.svelte.ts      # Optimistically updated copy from the database.
│   ├─ filter-store.svelte.ts    # Filtering and sorting states and logic.
│   └─ session-store.svelte.ts   # JWT state updated by supabase client events.
├─ app.css                       # Tailwind setup and global styling.
├─ App.svelte                    # Root component.
└─ main.ts                       # Svelte's Root component mount function.
```
## Getting started

### Prerequisites
- [Node.js ^18](https://nodejs.org/)
- [NPM](https://www.npmjs.com/)/[PNPM](https://pnpm.io/)

### Install

* Create a [Supabase](https://supabase.com/) account and project.
* Follow the [instructions](https://supabase.com/docs/guides/auth/social-login/auth-google?queryGroups=platform&platform=web&queryGroups=environment&environment=client) to set up Google oAuth (implicit flow).
* Create a table named 'jobtrack' with the following columns:
```js
"id":int8
"user_id":uuid
"status":text
"position":text
"company":text
"mode":text
"salary":float8
"link":text
"notes":text
"applied_date":date
```
* Apply the following RLS rules:
```sql
    ## INSERT (Target Roles Authenticated)
    alter policy "User can create rows using their uid"
    on "public"."jobtrack"
    to authenticated
    with check (
        (user_id = ( SELECT auth.uid() AS uid))
    );

    ## UPDATE (Target Roles Authenticated)
    alter policy "Users can change data with their uid only"
    on "public"."jobtrack"
    to authenticated
    using(
        (user_id = ( SELECT auth.uid() AS uid))
    )
    with check (
        (user_id = ( SELECT auth.uid() AS uid))
    );

    ## DELETE (Target Roles Authenticated)
    alter policy "Users can delete only the rows using their uid"
    on "public"."jobtrack"
    to authenticated
    using (
        (user_id = ( SELECT auth.uid() AS uid))
    );

    ## SELECT (Target Roles Authenticated)
    alter policy "Users can read only rows using their uid"
    on "public"."jobtrack"
    to authenticated
    using (
        (user_id = ( SELECT auth.uid() AS uid))
    );
```
* Proceeding with the front-end, reach the desired folder path and introduce the following commands in your console:

```bash 
git clone https://github.com/adriangdp/thejobseekersfate
```
```bash 
cd thejobseekersfate
```
```bash 
pnpm install
-or-
npm install
```
* Create a .env on the root directory and inform the following fields:
```
VITE_G_AUTH -> Google's AUTH token
VITE_G_ID -> Google's APP ID
VITE_S_URL -> Supabase project URL (found on the project's dashboard)
VITE_S_KEY -> Supabase Publishable Key (found on the project's dashboard)
```

* Finally, run the local server introducing this in your console:

```bash 
npm run dev
-or-
pnpm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Scripts
#### Dev
```bash
npm run dev
-or-
pnpm run dev
```
*Note it runs on port 3000 instead of the default. It can be changed on package.json*
#### Production build
```bash
npm run build
-or-
pnpm run build
```
#### Preview
```bash
npm run preview
```

#### Test:unit single run
```bash
npm run testrun
```

#### Test:unit default watch mode
```bash
npm run test
```

## Known limitations and TODOs
* <s> Rename repository</s>
* <s> Zod validates forms correctly, but handling errors gracefully is not yet implemented.</s>
* <s>More form validation flexibility: defaults, optionals...</s>
* Improve accesibility and aria attributes.
* <s>Add application form needs to take into account unkown salary</s>.
* <s>Possibility of adding notes.</s>
* <s>Right now, updating job applications is limited to status; but would be nice to be able to edit all fields.</s>
* Component and unit tests.
* Job Application statistics: compile and show an history of job application and status, salary trends, etc.
* Add some details and decorations to certain aspects.
* Another color theme.
