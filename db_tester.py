from app import create_app, db
from app.models.User import User, UserType
from app.models.Course import Course

app = create_app({"SECRET_KEY": "DEV",
                  "SQLALCHEMY_ECHO": True,
                  "SQLALCHEMY_DATABASE_URI": "sqlite:///test.db"})

with app.app_context():
    try:
        db.create_all()

        user1 = User("xuser1", "user", "one", "one@user.mail", UserType.ADMIN, "passwd")
        course = Course("SHORT", "Some course name", 10, garant=user1)
        db.session.add(course)
        db.session.commit()
        # So far so good

        print(Course.query.filter_by(short_name="SHORT").first())
        user2 = User("xuser2", "user", "two", "two@user.mail", UserType.USER, "passwd")
        user2.taught_courses.append(course)
        db.session.add(user2)
        db.session.commit()  # This crashes with "Working outside of application context."

    finally:
        db.drop_all()


print("PASSED ============================================")