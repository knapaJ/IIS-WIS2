from app import create_app, db
from app.models.User import User, UserType
from app.models.Course import Course
from app.models.Lecture import Lecture
from app.models.CourseRegistration import CourseRegistration
from app.models.Classroom import Classroom

app = create_app({"SECRET_KEY": "DEV",
                  "SQLALCHEMY_ECHO": True,
                  "SQLALCHEMY_DATABASE_URI": "sqlite:///test.db"})

with app.app_context():
    try:
        db.create_all()

        uzivatel1 = User("xja007", "ja", "takyja", "daco@nekde.com", UserType.ADMIN, "dev")
        kurz1 = Course("IEL", "Elektronika", 999, uzivatel1)
        kurz1.lecturers.append(uzivatel1)
        prednaska1 = Lecture("Proste prednaska", 100, uzivatel1, kurz1)

        db.session.add(prednaska1)

        zacek1 = User("xzacek01", "zacek", "maly", "picumam@sprosty.jsem", UserType.USER, "dev")
        randomkurzik = Course.query.filter_by(short_name='IEL').first()
        nova_registrace = CourseRegistration(zacek1, randomkurzik)
        nova_prednaska = Lecture("prednaska", 100, User.query.filter_by(login="xja007").first(), randomkurzik)
        nova_prednaska.attendees.append(zacek1)

        db.session.add(nova_registrace)
        db.session.add(nova_prednaska)
        db.session.commit()

        print("=============DONE==============")

    finally:
        db.drop_all()


print("PASSED ============================================")
