# Acceptance Test

To run the acceptance test, run the commands below.

```shell
node install
node run test
```
To clean the database (devices, templates and flows) and run the acceptance test, run the commands below.

```shell
node install
node run test:clearDb
```


There are 3 types of scenarios: Flow Basic, Basic and Advanced.
In order to run each scenario, run the following command:
Flow Basic is interesting because it does the minimum flow tests, template create, device create, and sending messages via mqtt in an unsafe way.

```shell
node run test:flowbasic
node run test:basic
node run test:adv
```
