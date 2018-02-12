#!//usr/bin/python3

import json
import mysql.connector
from datetime import datetime

# continentId = "_Europe" # Much larger data set, useful for testing large number of cases
continentId = "_Africa"

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


def fetchCompetitions():
    result = runSQLquery("""
        SELECT
            Comps.id,
            Comps.name,
            Countries.name,
            Countries.iso2,
            Comps.cityName,
            Comps.venue,
            Comps.venueAddress,
            Comps.year,
            Comps.month,
            Comps.day,
            Comps.endMonth,
            Comps.endDay
        FROM (
            SELECT *
            FROM Competitions
            WHERE countryId IN (
                SELECT id
                FROM Countries
                WHERE continentId='%%continent%%'
            )
        ) AS Comps
        LEFT JOIN Countries ON Comps.countryId=Countries.id
        ORDER BY Comps.year*10000+Comps.month*100+Comps.day DESC;
    """)
    comps = []
    for data in result:
        comp = {}
        comp['id'] = data[0]
        comp['name'] = data[1]
        comp['country'] = data[2]
        comp['countryCode'] = data[3]
        comp['cityName'] = data[4]
        comp['venue'] = data[5]
        comp['venueAddress'] = data[6]
        comp['date'] = datetime(data[7], data[8], data[9]).strftime('%Y-%m-%d')
        endYear = data[7] if data[10] >= data[8] else data[7] + 1
        comp['endDate'] = datetime(endYear, data[10], data[11]).strftime('%Y-%m-%d')

        comps.append(comp)

    return comps


def fetchWinners():
    result = runSQLquery("""
        SELECT
            Results.competitionId,
            Results.pos,
            Results.personName,
            Results.personId,
            Results.best,
            Results.average
        FROM Results
        LEFT JOIN (
        	SELECT
        	    Competitions.id AS competitionId,
        	    continentId
        	FROM Competitions
        	LEFT JOIN Countries ON Competitions.countryId = Countries.id
        ) AS Continents
        ON Results.competitionId = Continents.competitionId
        WHERE
        	Continents.continentId ='%%continent%%'
            AND eventID='333'
            AND roundTypeId='f'
            AND pos<=3
        ORDER BY Results.CompetitionId, pos;
    """)

    winners = []
    for data in result:
        winner= {}
        winner['competionId'] = data[0]
        winner['pos'] = data[1]
        winner['personName'] = data[2]
        winner['personId'] = data[3]
        winner['best'] = data[4]
        winner['average'] = data[5]

        winners.append(winner)

    return winners


def fetchRecordsInContinent():
    result = runSQLquery("""
        SELECT
            Results.competitionId,
            Results.personName,
            Results.personId,
            Results.personCountryId,
            Results.eventID,
            Results.best,
            Results.regionalSingleRecord,
            Results.average,
            Results.regionalAverageRecord
        FROM Results
        LEFT JOIN (
        	SELECT
        	    Competitions.id AS competitionId,
        	    continentId,
                Countries.name
        	FROM Competitions
        	LEFT JOIN Countries ON Competitions.countryId = Countries.id
        ) AS Continents
        ON Results.competitionId = Continents.competitionId
        WHERE
        	Continents.continentId ='%%continent%%'
            AND (Results.regionalSingleRecord <> '' OR Results.regionalAverageRecord <> '')
        ORDER BY Results.CompetitionId, Results.personCountryId, Results.personId;
    """)

    records = []
    for data in result:
        record = {}
        record['competionId'] = data[0]
        record['personName'] = data[1]
        record['personId'] = data[2]
        record['countryId'] = data[3]
        record['event'] = data[4]
        record['single'] = data[5]
        record['singleRecord'] = data[6]
        record['average'] = data[7]
        record['averageRecord'] = data[8]

        records.append(record)
    return records


def fetchContinentRecords():
    result = runSQLquery("""
        SELECT
            Results.competitionId,
            Results.personName,
            Results.personId,
            Countries.name,
            Results.eventID,
            Results.best,
            Results.regionalSingleRecord,
            Results.average,
            Results.regionalAverageRecord
        FROM Results
        LEFT JOIN Countries ON Results.personCountryId = Countries.id
        LEFT JOIN (
        	SELECT
        		(Competitions.year*10000+Competitions.month*100+Competitions.day) AS compDate,
        		id AS competitionId
        	FROM Competitions
        ) AS CompDates ON Results.competitionId = CompDates.competitionId
        WHERE
            continentId = '%%continent%%'
            AND (Results.regionalSingleRecord <> '' OR Results.regionalAverageRecord <> '')
        ORDER BY compDate DESC, Results.competitionId
    """)

    records = []
    for data in result:
        record = {}
        record['competionId'] = data[0]
        record['personName'] = data[1]
        record['personId'] = data[2]
        record['event'] = data[3]
        record['single'] = data[4]
        record['singleRecord'] = data[5]
        record['average'] = data[6]
        record['averageRecord'] = data[7]

        records.append(record)
    return records


def fetchCombinedCompetitionInfo():
    comps = fetchCompetitions()
    winners = fetchWinners()
    records = fetchRecordsInContinent()

    for comp in comps:
        comp['winners'] = []
        for winner in winners:
            if winner['competionId'] == comp['id']:
                comp['winners'].append(winner)
        comp['records'] = []
        for record in records:
            if record['competionId'] == comp['id']:
                comp['records'].append(record)

    return comps


comps = fetchCombinedCompetitionInfo()
with open('./static/competitions.json', 'w') as compJSONfile:
    json.dump(comps, compJSONfile)
