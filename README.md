Horse_Racing_Visualization
===
Project of MSBD5005
---
Flask is used as framework

To set up flask environment:

1.  Create and enter an virtual environment for python 
    
    For anaconda on MacOS, type in terminal:
    
        Conda create -n envName PYTHON=3.6

        Source activate envName
    
2.  Install corresponding package, type in terminal:

        conda install flask

        conda install pandas


After setting up, there are two ways to run the server:


- Terminal `flask run` way 


1.  Change environment path, open the project folder in the terminal/cmd.
    - For MacOS, type:

                export FLASK_APP=horse_racing_visualization.py

    - For Windows, type:

                set FLASK_APP=horse_racing_visualization.py

2.  Flask debug mode allows refresh server automatically when script changes.
    
    - For MacOS:

        - Turn on debug mode, in terminal, type:

                export FLASK_ENV=development

        - Turn off debug mode, in terminal, type:

                export FLASK_ENV=
    
    - For Windows:

        - Turn on debug mode, in terminal, type:

                set FLASK_ENV=development

        - Turn off debug mode, in terminal, type:

                set FLASK_ENV=


3.  Run the server, type in terminal


        flask run


- Run python script way


1.  Just run `Horse_Racing_Visualization/app/run.py`, then the server will start.


2.  To turn on debug mode, just change the last line of `run.py` file

    from `app.run()` to `app.run(debug=True)`

After the server is running, to open the website:

1.  In brower (Chrome is preferred), type the following as url

        localhost:5000

Some remarks:

1.  If you are using vscode:
    
    - Firstly please select the python interpreter to the virtual environment `envName` in the buttom of vscode.

    - Secondly press `cmd + shift + x` to open vscode extension, then install `Django Template` and reload.
