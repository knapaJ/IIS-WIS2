from app import db
from datetime import datetime


class CourseRegistration(db.Model):
    # Don't touch this, it's managed
    __tablename__ = "course_registrations"
    _user_ID = db.Column(db.Integer, db.ForeignKey("users.id", ondelete="CASCADE"),
                         primary_key=True, autoincrement=False)
    _course_ID = db.Column(db.Integer, db.ForeignKey("courses.id", ondelete="CASCADE"),
                           primary_key=True, autoincrement=False)
    # Attributes
    time = db.Column(db.DateTime, nullable=False, default=datetime.utcnow)
    isApproved = db.Column(db.Boolean, nullable=False, default=False)
    # Relationship abstractions
    student = db.relationship("User", backref=db.backref("course_registrations", cascade="all,delete"), lazy="joined")
    course = db.relationship("Course", backref=db.backref("user_registrations", cascade="all,delete"), lazy="joined")

    def __init__(self, user, course, **kwargs):
        self.user = user
        self.course = course
        super(CourseRegistration, self).__init__(**kwargs)

    def __repr__(self):
        return f"Registration from {self.time}. {self.isApproved=}"


