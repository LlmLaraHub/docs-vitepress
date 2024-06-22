---
outline: deep
---
# Docker/Sail Setup


For this docker setup we will be using Laravel Sail. This is a great way to get started with Laravel and Docker.

## Install Docker

First you need to install Docker. You can download it from here: https://www.docker.com/products/docker-desktop


## Clone the Repository

To clone the repository, run the following command in your terminal:

```bash
git clone git@github.com:LlmLaraHub/larallama.git
```

Then

```bash
cp .env.example .env
```

And run the normal install steps:

```bash
composer install
```

## Run Sail

Once you have Docker installed you can run the following command to start Laravel Sail:
(Make sure you are in the project directory)

```bash
./vendor/bin/sail build --no-cache
```

This will start the Docker containers and you will see the output in your terminal.

:::tip
If you are on Windows you may need to run this command in a terminal that has access to the Docker daemon. You can use the Windows Terminal or Git Bash.
:::

### Start the containers

Once the containers are built you can start them with the following command:

```bash
./vendor/bin/sail up
```
:::warning
By default, we download llama3 and mxbai-embed-large models in your Ollama container.
So if it takes a while to start up, it is because it is downloading the models.
:::



### Start Some Services

Before even starting the services you need to make sure you have the database setup.

```bash
   ./vendor/bin/sail artisan migrate --seed
```


Since we are on docker containers then we need to start Services in a separate terminal.

To start the Horizon worker run the following command:
```bash
   ./vendor/bin/sail artisan horizon
```

Next, we need to start the Reverb service. This is a long-running process that listens for new data to be indexed.

```bash
   ./vendor/bin/sail artisan reverb:start
```


Finally, we need to compile the assets. This will watch for changes and recompile the assets when they change.

```bash
   ./vendor/bin/sail npm run dev
```



## Accessing the Application

Once you have the containers running you can access the application by visiting http://localhost in your browser.

## Settings

You now have to setup your API keys on the settings page.
Only after you do this will options show up on the "Add Collections" area

:::tip
To setup Ollama that is running inside a docker container you need to use docker host address
Just add this as the Ollama URL:

```bash
http://host.docker.internal:11434/api
```
