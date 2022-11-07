from app import db


course_lecturer_rel = db.Table("course_lecturer_rel",
                               db.Column('_user_id', db.Integer, db.ForeignKey('users.id')),
                               db.Column('_course_id', db.Integer, db.ForeignKey('courses.id'))
                               )


class Course(db.Model):
    """Class for Courses
    Course has a Short Name (unique), Name, Description (optional), Student Limit and a User as a Garant
    """
    # Don't touch this, it's managed
    __tablename__ = "courses"
    _id = db.Column(db.Integer, primary_key=True, name='id')
    _garant_ID = db.Column(db.Integer, db.ForeignKey('users.id', ondelete="CASCADE"), nullable=False)
    # Attributes
    short_name = db.Column(db.String(10), nullable=False, unique=True)
    name = db.Column(db.String(100), nullable=False)
    description = db.Column(db.Text)
    student_limit = db.Column(db.Integer, nullable=False)
    isApproved = db.Column(db.Boolean, nullable=False, default=False)
    # Relationship abstractions
    garant = db.relationship("User", backref=db.backref("garanted_courses", cascade="all,delete"), lazy="joined")
    registered_lecturers = db.relationship("User", secondary=course_lecturer_rel, backref="taught_courses")

    def __init__(self, short_name, name, student_limit, garant, **kwargs):
        self.short_name = short_name
        self.name = name
        self.student_limit = student_limit
        self.garant = garant
        super(Course, self).__init__(**kwargs)

    def __repr__(self):
        return f"Course[{self.short_name}]: {self.name}"

