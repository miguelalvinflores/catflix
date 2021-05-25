from flask_wtf import FlaskForm
from wtforms import StringField, RadioField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import User


def user_exists(form, field):
    print("Checking if user exits", field.data)
    email = field.data
    user = User.query.filter(User.email == email).first()
    print(user)
    if user:
        raise ValidationError("User is already registered.")


class SignUpForm(FlaskForm):
    membership = RadioField('membership', validators=[DataRequired()], choices=[(1, 'Standard'), (2, 'Deluxe'), (3, 'Premium')])
    email = StringField('email', validators=[DataRequired(), Email(), user_exists])
    password = StringField('password', validators=[DataRequired()])


class CheckEmailForm(FlaskForm):
    email = StringField('email', validators=[DataRequired(), Email()])
