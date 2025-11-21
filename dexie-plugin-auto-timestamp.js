/**
 * Dexie Auto-Timestamp Plugin
 * Automatically adds 'createdAt' and 'updatedAt' timestamps to records.
 * Uses the 'creating' and 'updating' hooks.
 */
export function AutoTimestampAddon(db) {
    db.tables.forEach(table => {
        // Hook for 'creating' (add/put operations on new objects)
        table.hook('creating', function (primKey, obj, trans) {
            const now = new Date();
            if (obj.createdAt === undefined) {
                obj.createdAt = now;
            }
            obj.updatedAt = now;
        });

        // Hook for 'updating' (modify operations)
        table.hook('updating', function (modifications, primKey, obj, trans) {
            // Only set updatedAt if it's not explicitly being modified to something else
            if (modifications.updatedAt === undefined) {
                return {
                    updatedAt: new Date()
                };
            }
        });
    });
}

// Example Usage:
/*
import Dexie from 'dexie';
import { AutoTimestampAddon } from './dexie-plugin-auto-timestamp.js';

const db = new Dexie('MyDatabase');
db.version(1).stores({
    users: '++id, name, createdAt, updatedAt'
});

db.use(AutoTimestampAddon);

// Now, any object added or updated will automatically have timestamps.
*/
