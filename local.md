# Local Setup


There are a few parts to this puzzle but not that bad for setting up locally.
It is honestly just a standard Laravel app that uses PostGres since it has a
vector extension.


::: tip
Sometimes the best way to learn how to setup a system is to look at the CI files since they are setting up a system every build. You can see that here ``.github/workflows/ci-cd.yml``
:::


There is a video `here <https://www.youtube.com/watch?v=aTuw6W_8CPE&t=3s>`_ for those who like to learn that way.

Laravel PHP Setup
----------------

I use Herd https://herd.laravel.com/ and that does most of the work.
If you follow their docs you will be setup in minutes.

PostGres
----------------
I use the one here https://postgresapp.com/ even though I have Herd Pro.
I could not get the extension to install but maybe now it would work.

I know DBEngin is great too https://dbngin.com/ but the extension did not install at the time.

Installation Steps
----------------

The database will not setup itself like MySQL so you have to do two steps here.
Using TablePlus I open the database and then make the schema ``larachain``

Then I open that database and run this:

.. code-block:: sql

   CREATE EXTENSION vector;

To clone the repository, run the following command in your terminal:

.. code-block:: bash

   git clone https://github.com/LlmLaraHub/laralamma.git

Then

.. code-block:: bash

   cp .env.example .env

And run the normal install steps:

.. code-block:: bash

   composer install
   npm install

Then seed the user:

.. code-block:: bash

   php artisan migrate:fresh --seed

.. note::

   You can see on the bottom of the .env the username and password.

Finally you have to run these long running processes one in each terminal:

.. code-block:: bash

    php artisan horizon:watch
    php artisan reverb:start --debug
    npm run dev

Ollama, OpenAi, Claude 🤔
----------------
You have a lot of choices here. If you look in the path ``config/llmdriver.php``

You will see you can set ``.env`` settings for different API_TOKENs and models.

Lets talk about Ollama first.

If you install Ollama https://ollama.com/ it is a big win because all your embeddings are free!

So just follow their instructions to get it running. You can then pull:

.. code-block:: bash

    ollama pull llama3

To get started with the defaults LLM and:

.. code-block:: bash

    ollama pull mxbai-embed-large

For embedding data.

Now run this at the command line:

.. code-block:: bash

    launchctl setenv OLLAMA_NUM_PARALLEL 3

To get the most out of ollama for now. Then restart it.

You can test it is working by running these commands:

.. code-block:: bash

    curl http://127.0.0.1:11434/api/tags
    curl http://localhost:11434/api/tags


PHP Settings
----------------

If you have issues with PHP try the following.

.. code-block:: bash

    max_execution_time=0
    upload_max_filesize=500M
    auto_prepend_file=/Applications/Herd.app/Contents/Resources/valet/dump-loader.php
    memory_limit=-1
    post_max_size = 100M



Pulling down the latest code!
----------------
Just to make sure it all works do these commands:

.. code-block:: bash

    git fetch
    git pull origin main
    composer install
    npm install
    php artisan pennant:purge
    php artisan optimize:clear
    php artisan migrate

