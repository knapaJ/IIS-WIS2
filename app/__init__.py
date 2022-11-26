import os
import datetime

import flask
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from dateutil import relativedelta

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
    def seeddata():
        print("Seeding testing data values ...", end='')
        garant = models.User.User("tgaran00", "test", "garant", "garant@test.wis", models.User.UserType.USER,
                                  "dev")
        teacher = models.User.User("tteach00", "test", "teacher", "teacher@test.wis", models.User.UserType.USER,
                                   "dev")
        course = models.Course.Course("TEST", "test course", 99, garant, 5)
        course.registered_lecturers.append(teacher)
        course.description = "Lorem ipsum dolor shit amet, consectetuer adipiscing elit. Nullam faucibus mi quis velit. Nullam lectus justo, vulputate eget mollis sed, tempor sed magna. Duis pulvinar. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Ut tempus purus at lorem. Integer tempor. Curabitur sagittis hendrerit ante. Vivamus porttitor turpis ac leo. Curabitur ligula sapien, pulvinar a vestibulum quis, facilisis vel sapien. Fusce aliquam vestibulum ipsum. Fusce consectetuer risus a nunc. Fusce nibh. Nulla accumsan, elit sit amet varius semper, nulla mauris mollis quam, tempor suscipit diam nulla vel leo. Maecenas aliquet accumsan leo. Praesent vitae arcu tempor neque lacinia pretium. Mauris metus."
        student = models.User.User("tstude00", "test", "student", "student@test.wis", models.User.UserType.USER,
                                   "dev")
        student2 = models.User.User("tstude01", "test", "student2", "student@test.wis", models.User.UserType.USER,
                                    "dev")
        coursereg = models.CourseRegistration.CourseRegistration(student, course)
        coursereg2 = models.CourseRegistration.CourseRegistration(student2, course)
        term = models.Term.Term("Test term", "10", 99, course)
        term.start_date = datetime.datetime.utcnow() + datetime.timedelta(days=3)
        term.end_date = term.start_date + datetime.timedelta(hours=3)
        termmark = models.TermMark.TermMark(student, term)
        termmark2 = models.TermMark.TermMark(student2, term)
        termmark.modify(9, teacher)
        classroom = models.Classroom.Classroom("D105")
        classroom.building = "bOzEtEcHoVa 28"
        term.classroom = classroom
        db.session.add(termmark2)
        db.session.add(coursereg2)
        db.session.add(classroom)
        db.session.add(garant)
        db.session.add(teacher)
        db.session.add(student)
        db.session.add(course)
        db.session.add(coursereg)
        db.session.commit()
        print("DONE")

    @app.cli.command()
    def dropdb():
        print(f"Dropping db ...", end='')
        db.drop_all()
        print(f"DONE")

    # hello world just for testing
    @app.route('/hello-world')
    def hello_world():
        return f"Hello world!<br/> Application root is: {app.config['APPLICATION_ROOT']}<br/> URL for this page is: " \
               f"{flask.url_for('hello_world')}", 200

    app.register_blueprint(bp.user.user_endpoint, url_prefix='/user')
    app.register_blueprint(bp.course.course_endpoint, url_prefix='/course')
    app.register_blueprint(bp.classroom.classroom_endpoint, url_prefix='/classroom')
    app.register_blueprint(bp.term.term_endpoint, url_prefix='/term')
    app.register_blueprint(bp.courseregistration.courseregistration_endpoint, url_prefix='/courseregistration')

    return app
