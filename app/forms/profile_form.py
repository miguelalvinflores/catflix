from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired, ValidationError
from app.models import Icon, User


def icon_exists(form, field):
    print("Checking if icon exists", field.data)
    iconId = field.data
    icon = Icon.query.get(iconId)
    if not icon:
        raise ValidationError("Invalid Icon data.")

def user_exists(form, field):
    print("Checking if user exists", field.data)
    userId = field.data
    user = User.query.get(userId)
    if not user:
        raise ValidationError("Invalid User data.")


class ProfileForm(FlaskForm):
    name = StringField('name', validators=[DataRequired()])
    iconId = IntegerField('iconId', validators=[DataRequired(), icon_exists])
    userId = IntegerField('userId', validators=[DataRequired(), user_exists])