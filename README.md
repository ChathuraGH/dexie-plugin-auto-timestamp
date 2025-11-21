# Dexie Auto-Timestamp Plugin

A simple yet powerful plugin for Dexie.js that automatically manages `createdAt` and `updatedAt` timestamps on your database records. This ensures data integrity and simplifies your application logic by handling common timestamping requirements at the database layer.

## Features

*   **Automatic `createdAt`:** Sets the timestamp only when a record is first created.
*   **Automatic `updatedAt`:** Updates the timestamp on every modification to the record.
*   **Non-Intrusive:** Does not override explicitly provided `createdAt` or `updatedAt` values during an update.

## Installation

Since this is a custom plugin, you can simply copy the `dexie-plugin-auto-timestamp.js` file into your project.

## Usage

1.  **Define Schema:** Ensure your table schema includes the `createdAt` and `updatedAt` fields. While not strictly required by the plugin, indexing them is often useful.

    \`\`\`javascript
    const db = new Dexie('MyDatabase');
    db.version(1).stores({
        users: '++id, name, createdAt, updatedAt' // Include the fields in your schema
    });
    \`\`\`

2.  **Register Plugin:** Import the addon function and register it using `db.use()`.

    \`\`\`javascript
    import { AutoTimestampAddon } from './dexie-plugin-auto-timestamp.js';

    db.use(AutoTimestampAddon);
    \`\`\`

3.  **Example:**

    \`\`\`javascript
    // Adding a new record
    const userId = await db.users.add({ name: 'Alice' });
    // The record now has both createdAt and updatedAt set to the current time.

    // Updating the record
    await db.users.update(userId, { name: 'Alice Smith' });
    // The updatedAt field is automatically updated, while createdAt remains the same.
    \`\`\`

## Implementation Details

The plugin utilizes Dexie's powerful **`creating`** and **`updating`** hooks:

*   **`creating` hook:** Used to set both `createdAt` and `updatedAt` to the current time for new records.
*   **`updating` hook:** Used to return a modification object `{ updatedAt: new Date() }` to update the timestamp only when the record is being modified.
\`\`\`
