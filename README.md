
<p>
<img src="./images/desbordante-preview.png"/>
</p>

---
# FOR EDBT REVIEWERS

If you are coming from our EDBT Industrial submission, please check out the `edbt` branch to access the following features, which are not merged into main yet:
- Discovery of association rules using ECLAT and FP-Growth algorithms adapted from Christian Borgelt’s implementations
- Discovery of conditional functional dependencies using the CTANE algorithm and its variations

---

# About

Desbordante is a high-performance data profiler that is capable of discovering many different patterns in data using various algorithms. The currently supported data patterns are:
* Functional dependencies, both exact and approximate
* Conditional functional dependencies
* Association rules

It also allows to run data cleaning scenarios using these algorithms. At the moment, we have  implemented a typo detection scenario using an exact and approximate functional dependency discovery algorithm.

The algorithms of Desbordante are implemented in C++ to maximize the resulting performance. They can be run using either a console version or a web-application that features an easy-to-use web interface.

You can try the deployed version [here](https://desbordante.unidata-platform.ru/). You have to register in order to process your own datasets. Keep in mind that due to a large demand various time and memory limits are enforced (and a task is killed if it goes outside of acceptable ranges).

A brief introduction into the tool and its use-cases is presented [here](https://habr.com/ru/company/unidata/blog/667636/) (in Russian, the English version is in the works).

# Installation guide
This project supports installation with and without a web application.
In the second case, to build the project, you also need to have dependencies that are specified for installation without a web application.

## Installation (without web application)
* ### Ubuntu
  The following instructions were tested on Ubuntu 18.04.4 LTS.
  #### Dependencies
  Prior to cloning the repository and attempting to build the project, ensure that you have the following software:

  - GNU g++ compiler, version 10+
  - CMake, version 3.13+
  - Boost library, version 1.72.0+

  #### Building the project
  Firstly, navigate to a desired directory.
  Then, clone the repository, cd into the project directory and launch the build script:
  ```
  git clone https://github.com/Mstrutov/Desbordante/
  cd Desbordante
  ./build.sh
  ```
  #### Launching the binaries
  The script generates the following file structure in `/path/to/Desbordante/build/target`:
  ```bash
  ├───input_data
  │   └───some-sample-csvs.csv
  ├───Desbordante_test
  ├───Desbordante_run
  ```
  The `input_data` directory contains several .csv files that may be used by `Desbordante_test`. Run `Desbordante_test` to perform unit testing:
  ```
  cd build/target
  ./Desbordante_test
  ```
  The tool itself is launched via the following line:
  ```
  ./Desbordante_run --algo=tane --data=<dataset_name>.csv
  ```

  The `<dataset_name>.csv`, which is a user-provided dataset, should be placed in the `/path/to/Desbordante/build/target` directory.

* ### Windows
  The following instructions were tested on Windows 10 .
  #### Dependencies
  Prior to cloning the repository and attempting to build the project, ensure that you have the following software:

  - Microsoft Visual Studio 2019
  - CMake, version 3.13+
  - Boost library, version 1.65.1+ \
    The recommended way to install Boost is by using [chocolatey](https://chocolatey.org/)

  #### Building the project
  Firstly, launch the command prompt and navigate to a desired directory.
  Then, clone the repository, cd into the project directory and launch the build script:
  ```
  git clone https://github.com/Mstrutov/Desbordante/
  cd Desbordante
  git checkout windows-compatible
  build.bat
  ```
  *Note:* to compile the project, the script uses hard-coded path to MSVC developer command prompt, which is located
  by default at `C:\Program Files (x86)\Microsoft Visual Studio\2019\Community\Common7\Tools\VsDevCmd.bat`.
  You should change the path in the script if it differs from the default one.
  #### Launching the binaries
  The script generates the following file structure in `\path\to\Desbordante\build\target`:
  ```bash
  ├───input_data
  │   └───some-sample-csv's.csv
  ├───Desbordante_test.exe
  ├───Desbordante_run.exe
  ```
  The `input_data` directory contains several .csv files that may be used by `Desbordante_test`. Run `Desbordante_test` to perform unit testing:
  ```
  cd build\target
  Desbordante_test.exe
  ```
  The tool itself is launched via the following line:
  ```
  Desbordante_run.exe --algo=tane --data=<dataset_name>.csv
  ```

  The `<dataset_name>.csv`, which is a user-provided dataset, should be placed in the `\path\to\Desbordante\build\target` directory.

## Installation (with web application)
Requires docker, docker-compose
```
git clone https://github.com/vs9h/Desbordante.git
cd Desbordante/
git checkout origin/web-app
./install_web.sh
```
## Configuring
1) Modify .env file in Desbordante/
2) Set those variables:
  * POSTGRES_PASSWORD
  * POSTGRES_USER
  * POSTGRES_DB
  * KAFKA_ADMIN_CLIENT_ID
  * CONSUMER_TL_SEC
  * CONSUMER_ML_MB
  * HOST_SERVER_IP
3) Create your grafana user
```
sudo htpasswd -c grafana-users user1
```
## Running
```
docker-compose up --force-recreate
```
After the launch it will be available at http://localhost:3000/
# Developers

Kirill Stupakov     &mdash; Client side of the web application

Anton Chizhov       &mdash; Server side of the web application

Alexandr Smirnov    &mdash; DFD implementation

Ilya Shchuckin      &mdash; FD_Mine implementation

Michael Polyntsov   &mdash; FastFDs implementation

Ilya Vologin        &mdash; core classes

Maxim Strutovsky    &mdash; team lead, Pyro & TANE implementation

Nikita Bobrov       &mdash; product owner, consult, papers

Kirill Smirnov      &mdash; product owner, code quality, infrastructure, consult

George Chernishev   &mdash; product owner, consult, papers

# Cite

If you use this software for research, please cite the paper (https://fruct.org/publications/fruct29/files/Strut.pdf, https://ieeexplore.ieee.org/document/9435469) as follows:

M. Strutovskiy, N. Bobrov, K. Smirnov and G. Chernishev, "Desbordante: a Framework for Exploring Limits of Dependency Discovery Algorithms," 2021 29th Conference of Open Innovations Association (FRUCT), 2021, pp. 344-354, doi: 10.23919/FRUCT52173.2021.9435469.

# Contacts

[Email me at strutovsky.m.a@gmail.com](mailto:strutovsky.m.a@gmail.com)
