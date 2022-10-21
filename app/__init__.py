import os

from flask import Flask
from flask_sqlalchemy import SQLAlchemy

# Create DB engine
db = SQLAlchemy()


def create_app(test_config=None):
    # Import ORM models
    import app.models

    # Create and configure app
    app = Flask(__name__, instance_relative_config=True)
    # Create preliminary config, will be used, if no config.py file is found.
    app.config.from_mapping(
        SECRET_KEY='dev',
        SQLALCHEMY_DATABASE_URI="sqlite:///" + os.path.join(app.instance_path, "app.db")
    )

    if test_config is None:
        # Load instance config, since no test config has been provided
        app.config.from_pyfile('config.py', silent=True)
    else:
        # Load provided test config
        app.config.from_mapping(test_config)

    # Make sure instance folder exists
    try:
        os.makedirs(app.instance_path)
    except OSError:
        pass

    # Attach DB to app
    db.init_app(app)

    @app.cli.command()
    def createdb():
        print("Creating DB")
        db.create_all()

    # hello world just for testing
    @app.route('/hello-world')
    def hello_world():
        return "Hello world!", 200

    return app
