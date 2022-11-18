from app import create_app, db
from app.models.User import User, UserType
from app.models.Course import Course
from app.models.Lecture import Lecture
from app.models.CourseRegistration import CourseRegistration
from app.models.Classroom import Classroom
from app.models.Term import Term
from app.models.TermMark import TermMark

app = create_app({"SECRET_KEY": "DEV",
                  "SQLALCHEMY_ECHO": False,
                  "SQLALCHEMY_DATABASE_URI": "sqlite:///test.db"})

try:
    with app.app_context():
        db.create_all()

        # create people
        garant = User("xja007", "ja", "takyja", "daco@nekde.com", UserType.ADMIN, "dev")
        lecturer = User("xlect00", "lect", "lect", "lect@lect.lect", UserType.USER, "dev")
        pupil1 = User("xpupil01", "pupil1", "pupil1", "pupil1@pupil1", UserType.USER, "dev")
        db.session.add(garant)
        db.session.add(lecturer)
        db.session.add(pupil1)
        db.session.commit()

        # Create a random course
        course1 = Course("CS1", "Course1", 999, User.query.filter_by(login="xja007").first())
        course1.registered_lecturers.append(User.query.filter_by(login="xlect00").first())
        course1.registered_lecturers.append(User.query.filter_by(login="xja007").first())
        db.session.add(course1)
        db.session.commit()

        # Register the student to the course
        registration = CourseRegistration(User.query.filter_by(login="xpupil01").first(),
                                          Course.query.filter_by(short_name="CS1").first())
        db.session.add(registration)
        db.session.commit()

        # Create a classroom
        classroom1 = Classroom("D105")
        db.session.add(classroom1)
        db.session.commit()

        # Add a lecture
        lecture1 = Lecture("Prednaska", 100, User.query.filter_by(login="xlect00").first(),
                           Course.query.filter_by(short_name="CS1").first())
        lecture1.classroom = Classroom.query.filter_by(name="D105").first()
        lecture1.registered_students.append(User.query.filter_by(login="xpupil01").first())
        db.session.add(lecture1)
        db.session.commit()

        # Add a term
        term1 = Term("Domaci ukol", 10, 100, Course.query.filter_by(short_name="CS1").first())
        term1.registered_students.append(User.query.filter_by(login="xpupil01").first())
        db.session.add(term1)
        db.session.commit()

        # Add a term mark
        mark1 = TermMark(User.query.filter_by(login="xpupil01").first(),
                         Term.query.first())
        db.session.add(mark1)
        db.session.commit()

        # Modify a mark
        TermMark.query.first().modify(10, by_user=User.query.filter_by(login="xlect00").first())

        # And so a db is populated
        # Now print all marks of all students
        for user in User.query.all():
            print(user)
            for mark in user.term_marks:
                print(f"    {mark}")

        print("=============DONE==============")

finally:
    with app.app_context():
        print("trying to drop ... ", end='')
        db.drop_all()
        print("dropped")


print("PASSED ============================================")
