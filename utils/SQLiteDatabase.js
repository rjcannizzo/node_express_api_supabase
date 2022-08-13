// A wrapper around better-sqlite3
// 2022-08-09

const Database = require('better-sqlite3');

class SQLiteDatabase {
    constructor(filepath) {
        this.db = new Database(filepath, { verbose: console.log });
    }

    backup_db(filepath, close_db=true) {
		// backup the database to filepath. Option to close the database which defaults to true.
        this.db.backup(filepath)
        .then(() => {
            console.log('Backup complete!');
            if(close_db) {
                this.db.close()
            }
        })
        .catch((err) => {
            console.error('Backup failed:', err);
            if(close_db) {
                this.db.close()
            }
        });
    }

    close() {
        // closes the database
        this.db.close()
    }

    execute_query(query, data=[]) {
        // Runs any query. Returns an object: { changes: 1, lastInsertRowid: 0 }
        const stmt = this.db.prepare(query)
        return stmt.run(data)        
    }
    
    fetch_all(query, data=[]) {
        // return all - returns an array of objects
        const stmt = this.db.prepare(query)
        return stmt.all(data)        
    }

    fetch_one(query, data=[]) {
        const stmt = this.db.prepare(query)
        return stmt.get(data)        
    }

    insert_many(query, data=[]) {
        // Inserts multiple records at once. Returns the last id inserted. 
        // Warning: data must be an array!
        let lastId;        
        const stmt = this.db.prepare(query)
        data.forEach(item => {
            let {changes, lastInsertRowid} = stmt.run(item)
            lastId = lastInsertRowid
        })
        return lastId
    }
    
    insert_one(query, data=[]){
        // insert data and return the last id inserted
        const stmt = this.db.prepare(query)
        const info = stmt.run(data)        
        return info.lastInsertRowid
    }

    iterate_all(query, data=[]) {
        // returns an iterator of objects
        const stmt = this.db.prepare(query)
        return stmt.iterate(data)       
    } 
}

module.exports = SQLiteDatabase