Horse_Racing_Visualization
===
Project of MSBD5005
---
Flask is used as framework
1.  Create and enter an virtual environment for python 
    
    For anaconda on MacOS, type in terminal:
    
        Conda create -n envName PYTHON=3.6

        Source activate envName
    
2.  Install corresponding package, type in terminal:

        conda install flask

        conda install pandas

3.  Change environment path, open the project folder in the terminal, then type:

        export FLASK_APP=horse_racing_visualization.py

4.  Run the server, type in terminal

        flask run

5.  In browser, (Chrome is preferred), type the following as url

        localhost:5000

6.  If you are using vscode:
    
    - Firstly please select the python interpreter to the virtual environment envName in the buttom of vscode.

    - Second press `cmd + shift + x` to open vscode extension, then install `Django Template` and reload.
