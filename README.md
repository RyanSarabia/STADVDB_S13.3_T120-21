# STADVDB_S13.3_T120-21 MCO2
* Cai, Mark Jayson
* Sanchez, Martin Christopher
* Santos, Carlo Luis
* Sarabia, Ryan Miguel
* So, Brian Jezreel

## Deployed Web Application
This web application is deployed to Infinity Free and can be accessed using this link: http://imdb-warehouse.infinityfreeapp.com/

## Local Web Application
### Setting up XAMPP and configurations
1. To run this application locally, **XAMPP** is needed to be installed.
2. The **STADVDB_S13.3_T120-21** folder must be placed under **xampp/htdocs/**
3. Replace **xampp\phpMyAdmin\libraries\config.default.php** with the **config.default.php** found in the project folder.
4. Replace **xampp\php\php.ini** with the **php.ini** found in the project folder.
### Setting up the database
1. Download **imdb_ijs.sql** from this [link](https://drive.google.com/file/d/1JFIYRWaud0eVTvEXnfbNW6ydoun5k74m/view?usp=sharing)
2. Go to https://localhost/phpmyadmin/index.php 
3. Open the **Import** tab and choose the **imdb_ijs.sql** file
4. Name the database as **imdb_ijs**
### Optimizing the database
1. After creating the **imdb_ijs** database, select it and open the **SQL tab**
2. Copy and paste the contents from **optimization.sql** and click **Go**
### Creating the data warehouse
1. Run the **Create Warehouse Tables.sql** file to create the **imdb_warehouse** schema
2. When this is done, run the **etl.py** file in the Python ETL folder.
### Accessing the application
1. After setting up your XAMPP configurations, start running **Apache** and **MySql** from the XAMPP Control Panel
2. The application will then be available by accessing http://localhost/STADVDB_S13.3_T120-21/ from your browser.
