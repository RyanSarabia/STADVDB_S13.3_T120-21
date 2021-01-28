# Program Name: pyEL (EL: Extract & Load)
# Author: Oscar Valles
# Date Created: August 1, 2017

# import needed libraries
import petl as etl
import sys
import pymysql
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

imdbWarehouse = pymysql.connect(host='localhost',
                                user='root',
                                password='Disgaea___4',
                                database='imdb_warehouse')

imdbWarehouse.cursor().execute('SET SQL_MODE=ANSI_QUOTES')

#### Assigning Cursors ####

originalCursor = imdbOriginal.cursor()


#### Assign Original Tables to Variables ####

# movies table
originalCursor.execute('SELECT * FROM movies')
movies = originalCursor.fetchall()
movies = etl.pushheader(movies, ['movie_id', 'name', 'year', 'rank'])

# movies_genres table
originalCursor.execute('SELECT * FROM movies_genres')
movies_genres = originalCursor.fetchall()
movies_genres = etl.pushheader(movies_genres, ['movie_id', 'genre'])

# directors table
originalCursor.execute('SELECT * FROM directors')
directors = originalCursor.fetchall()
directors = etl.pushheader(directors, ['id', 'first_name', 'last_name'])

# directorfullname table
originalCursor.execute('SELECT * FROM directorfullname')
directorfullname = originalCursor.fetchall()
directorfullname = etl.pushheader(directorfullname, ['full_name', 'id'])

# directors_genres table w/0 prob
originalCursor.execute(
    'SELECT director_id, genre FROM directors_genres')
directors_genres = originalCursor.fetchall()
directors_genres = etl.pushheader(
    directors_genres, ['director_id', 'genre'])

# movies_directors table
originalCursor.execute('SELECT * FROM movies_directors')
movies_directors = originalCursor.fetchall()
movies_directors = etl.pushheader(
    movies_directors, ['director_id', 'movie_id'])

# actors table
originalCursor.execute('SELECT * FROM actors')
actors = originalCursor.fetchall()
actors = etl.pushheader(actors, ['id', 'first_name', 'last_name', 'gender'])

# actorfullname table
originalCursor.execute('SELECT * FROM actorfullname')
actorfullname = originalCursor.fetchall()
actorfullname = etl.pushheader(actorfullname, ['full_name', 'id'])

# roles table w/0 role
originalCursor.execute('SELECT movie_id, actor_id FROM roles')
actorIdOnly = originalCursor.fetchall()
actorIdOnly = etl.pushheader(actorIdOnly, ['movie_id', 'actor_id'])


#### Denormalizing Original Tables ####

# Denormalize movies_genres into movies
moviesAndGenres = etl.join(movies, movies_genres, key='movie_id')


# Denormalize movies_directors into movies
moviesAndGenresAndDirectors = etl.join(
    moviesAndGenres, movies_directors, key='movie_id')


# Denormalize roles into movies
moviesAndGenresAndDirectorsAndRoles = etl.join(
    moviesAndGenresAndDirectors, actorIdOnly, key='movie_id')


# Add fullname to actors

actors = etl.join(actors, actorfullname, key='id')
# Denormalize roles into actors
actorsAndRoles = etl.join(
    actors, actorIdOnly, lkey='id', rkey='actor_id')


# Add fullname to directors
directors = etl.join(directors, directorfullname, key='id')

# Denormalize directors_genres into directors
directorsAndGenres = etl.join(
    directors, directors_genres, lkey='id', rkey='director_id')

# Denormalize movies_directors into directors
directorsAndGenresAndMovies = etl.join(
    directorsAndGenres, movies_directors, lkey='id', rkey='director_id')


# print(directorsAndGenresAndMovies)
# print(actorsAndRoles)
# print(moviesAndGenresAndDirectorsAndRoles)

ranks = etl.cut(moviesAndGenresAndDirectorsAndRoles,
                'movie_id', 'rank', 'director_id', 'actor_id')
movies = etl.cut(moviesAndGenresAndDirectorsAndRoles,
                 'movie_id', 'name', 'year', 'genre')

movies = etl.rename(movies, 'movie_id', 'id')

moviesHead = etl.head(
    movies, 2120712)
moviesTail = etl.tail(
    movies, 2120712)

ranksHead = etl.head(
    ranks, 2120712)
ranksTail = etl.tail(
    ranks, 2120712)

actorsAndRolesHead = etl.head(actorsAndRoles, 1715983)
actorsAndRolesTail = etl.tail(actorsAndRoles, 1715983)

etl.todb(moviesTail, imdbWarehouse, 'movies')
etl.todb(ranksHead, imdbWarehouse, 'ranks')
etl.todb(ranksTail, imdbWarehouse, 'ranks')
etl.todb(directorsAndGenresAndMovies, imdbWarehouse, 'directors')
etl.todb(actorsAndRolesHead, imdbWarehouse, 'actors')
etl.todb(actorsAndRolesTail, imdbWarehouse, 'actors')
etl.todb(moviesHead, imdbWarehouse, 'movies')


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
