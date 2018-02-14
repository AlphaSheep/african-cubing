#!//usr/bin/python3

import json
import mysql.connector
from datetime import datetime

mysqlConnectionDetails = {
    'host': "Alpha-Titan",
    'user': "root",
    'passwd': "root",
    'db': "mysql"
}

def runSQLquery(query):
    connection = mysql.connector.connect(**mysqlConnectionDetails)
    cursor = connection.cursor()

    cursor.execute(query.replace('%%continent%%', continentId))
    data = cursor.fetchall()
    connection.close()

    return data


def fetchCountries():
    result = runSQLquery("""
        SELECT
            iso2,
        	name
        FROM Countries;
    """)

    countries = {}
    for data in result:
        countries[data[0]] = data[1]
    return countries


countries = fetchCountries()
with open('./static/countrynames.json', 'w') as countryJSONfile:
    json.dump(countries, countryJSONfile)
