# african-cubing

> Website for African Cubing Association

## Generate Static Files

Data is read from static JSON files. In order to generate these JSON files, you will need access to a MySQL database with up-to-date results. This database can be created using the latest WCA SQL export, which can be downloaded from [here](https://www.worldcubeassociation.org/results/misc/export.html).

Once you have MySQL database running with the WCA database export, you can generate the JSON files using the provided Python scripts:

* `fetchCompetitionData.py` generates `/static/competitions.json`
* `fetchCountryData.py` generates `/static/countrynames.json`

You may need to edit the connection details by editing the mysqlConnectionDetails variable with your own connection settings
``` python
mysqlConnectionDetails = {
    'host': "localhost",
    'user': "root",
    'passwd': "root",
    'db': "mysql"
}
```

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
