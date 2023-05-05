# SQL for JetsonNano 


## install sqlite3

```
sudo apt install sqlite3
```


## create db

Make the database. We'll have dev.db and prod.db.
After creating, set the schema and then populate with some fake data.

```
sqlite3 dev.db
sqlite3 dev.db < schema.sql
sqlite3 dev.db < dev_data.sql
```