# Program Name: pyEL (EL: Extract & Load)
# Author: Oscar Valles
# Date Created: August 1, 2017

# import needed libraries
import petl as etl
import sys
from sqlalchemy import *
import mysql.connector

# handle characters outside of ascii
# reload(sys)
# sys.setdefaultencoding('utf8')

# declare connection properties within dictionary
imdbOriginal = mysql.connector.connect(
    host="localhost",
    user="root",
    password="Disgaea___4",
    database="imdb_ijs"
)

imdbWarehouse = mysql.connector.connect(
    host="localhost",
    user="root",
    password="Disgaea___4",
    database="imdb_warehouse"
)


originalCursor = imdbOriginal.cursor()
warehouseCursor = imdbWarehouse.cursor()

originalCursor.execute("Show databases")
for db in originalCursor:
    print(db)


table = etl.fromdb(imdbOriginal, 'SELECT * FROM movies')
print(table)


# set connections and cursors
# grab value by referencing key dictionary
#sourceConn = pg.connect(dbCnxns['imdb_ijs'])
# grab value by referencing key dictionary
#targetConn = pg.connect(dbCnxns['imdb_warehouse'])
#sourceCursor = sourceConn.cursor()
#targetCursor = targetConn.cursor()

# retrieve the names of the source tables to be copied
# originalCursor.execute(
#    """select table_name from information_schema.columns where table_name in ('orders','returns') group by 1""")
#sourceTables = originalCursor.fetchall()

# iterate through table names to copy over
# for t in sourceTables:
#    targetCursor.execute("drop table if exists %s" % (t[0]))
#    sourceDs = etl.fromdb(sourceConn, 'select * from %s' % (t[0]))
#    etl.todb(sourceDs, targetConn, t[0], create=True, sample=10000)
