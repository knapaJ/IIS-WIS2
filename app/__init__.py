import os

from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate

# SQLite ForeignKey constraints enforcement enable, as per: https://stackoverflow.com/a/15542046
# from sqlalchemy import event
# from sqlalchemy.engine import Engine
# from sqlite3 import Connection as SQLite3Connection
# @event.listens_for(Engine, "connect")
# def _set_sqlite_pragma(dbapi_connection, connection_record):
#     if isinstance(dbapi_connection, SQLite3Connection):
#         cursor = dbapi_connection.cursor()
#         cursor.execute("PRAGMA foreign_keys=ON;")
#         cursor.close()


# Create DB engine
db = SQLAlchemy()
migrate = Migrate()


def create_app(test_config=None):
    # Import ORM models
    import app.models as models
    import app.blueprints as bp

    # Create and configure app
    app = Flask("app", instance_relative_config=True)
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

    # Attach migrations to app
    migrate.init_app(app)

    @app.cli.command()
    def createdb():
        print("Creating DB")
        db.create_all()
        root_user = models.User.User("xrootx00", "root", "root", "root@this.wis", models.User.UserType.ADMIN,
                                     "dev")
        db.session.add(root_user)
        db.session.commit()

    @app.cli.command()
    def dropdb():
        print(f"Dropping db ...", end='')
        db.drop_all()
        print(f"DONE")

    # hello world just for testing
    @app.route('/hello-world')
    def hello_world():
        return "Hello world!", 200

    app.register_blueprint(bp.user.user_endpoint, url_prefix='/user')

    return app
